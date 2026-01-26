# OFSC Plugin Development & Testing Guide

## 🚀 Quick Plugin Development Workflow

This guide shows you how to develop, test, and deploy OFSC plugins efficiently from VS Code.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Development Workflow](#development-workflow)
- [VS Code Integration](#vs-code-integration)
- [Automation Scripts](#automation-scripts)
- [Testing Strategy](#testing-strategy)
- [Best Practices](#best-practices)

## 🔧 Prerequisites

1. **Node.js** (v14 or higher) - for running deployment scripts
2. **Newman** (Postman CLI) - for automating API calls
3. **VS Code** - with REST Client extension (optional)
4. **OFSC Instance Access** - with plugin deployment permissions
5. **Git** - for version control

### Install Required Tools

```bash
# Install Newman (Postman CLI)
npm install -g newman

# Install Newman HTML Reporter (optional, for reports)
npm install -g newman-reporter-htmlextra

# Install VS Code REST Client extension (optional)
code --install-extension humao.rest-client
```

## ⚙️ Setup

### 1. Project Structure

```
ofsc-plugin-project/
├── plugins/
│   ├── my-custom-plugin/
│   │   ├── manifest.json
│   │   ├── plugin.js
│   │   └── config.json
│   └── another-plugin/
├── scripts/
│   ├── deploy-plugin.js
│   ├── install-plugin.sh
│   └── test-plugin.js
├── .env.local (ignored by git)
├── .vscode/
│   └── tasks.json
└── README.md
```

### 2. Environment Configuration

Create a `.env.local` file (this is ignored by .gitignore):

```bash
OFSC_BASE_URL=https://your-instance.ofsc.oracle.com/rest
OFSC_USERNAME=your_username@instance_id
OFSC_PASSWORD=your_api_key
OFSC_CLIENT_ID=your_client_id
OFSC_CLIENT_SECRET=your_client_secret
PLUGIN_LABEL=my_custom_plugin
```

## 🔄 Development Workflow

### Method 1: Using Newman (Recommended for Automation)

#### Step 1: Create Deployment Script

Create `scripts/deploy-plugin.js`:

```javascript
#!/usr/bin/env node

const newman = require('newman');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const COLLECTION_PATH = '../Oracle Field Service Cloud (OFSC) REST API - Full Collection.postman_collection.json';
const PLUGIN_PATH = process.argv[2] || './plugins/my-custom-plugin';

async function deployPlugin() {
    console.log('🚀 Starting plugin deployment...');
    
    // Read plugin files
    const pluginFiles = {
        manifest: fs.readFileSync(path.join(PLUGIN_PATH, 'manifest.json'), 'utf8'),
        code: fs.readFileSync(path.join(PLUGIN_PATH, 'plugin.js'), 'utf8'),
        config: fs.readFileSync(path.join(PLUGIN_PATH, 'config.json'), 'utf8')
    };
    
    // Prepare plugin package (base64 encoded zip)
    const pluginPackage = createPluginPackage(pluginFiles);
    
    // Run Newman to import plugin
    newman.run({
        collection: require(COLLECTION_PATH),
        environment: {
            values: [
                { key: 'base_url', value: process.env.OFSC_BASE_URL },
                { key: 'username', value: process.env.OFSC_USERNAME },
                { key: 'password', value: process.env.OFSC_PASSWORD }
            ]
        },
        folder: 'Plugins',
        iterationData: [{
            pluginPackage: pluginPackage
        }],
        reporters: ['cli', 'json'],
        reporter: {
            json: {
                export: './reports/plugin-deployment-result.json'
            }
        }
    }, (err, summary) => {
        if (err) {
            console.error('❌ Deployment failed:', err);
            process.exit(1);
        }
        
        if (summary.run.failures.length) {
            console.error('❌ Deployment failed with errors');
            summary.run.failures.forEach(failure => {
                console.error(`  - ${failure.error.message}`);
            });
            process.exit(1);
        }
        
        console.log('✅ Plugin deployed successfully!');
        console.log(`📊 Requests: ${summary.run.stats.requests.total}`);
        console.log(`⏱️  Duration: ${summary.run.timings.completed - summary.run.timings.started}ms`);
    });
}

function createPluginPackage(files) {
    // Create a base64 encoded package
    // This is a simplified version - you'd need to create a proper zip
    const packageData = JSON.stringify(files);
    return Buffer.from(packageData).toString('base64');
}

deployPlugin();
```

#### Step 2: Create Simple Bash Script

Create `scripts/deploy-plugin.sh`:

```bash
#!/bin/bash

# Load environment variables
source .env.local

PLUGIN_PATH=${1:-"./plugins/my-custom-plugin"}
PLUGIN_FILE="${PLUGIN_PATH}/plugin.zip"

echo "🔧 Preparing plugin package..."

# Create plugin zip (adjust based on your plugin structure)
cd "$PLUGIN_PATH"
zip -r plugin.zip * -x "*.DS_Store" "node_modules/*"
cd - > /dev/null

echo "📦 Plugin packaged: $PLUGIN_FILE"

# Deploy using curl and Postman collection endpoint
echo "🚀 Deploying plugin to OFSC..."

PLUGIN_BASE64=$(base64 -i "$PLUGIN_FILE")

curl -X POST "${OFSC_BASE_URL}/rest/ofscMetadata/v1/plugins/custom-actions/import" \
  -H "Content-Type: application/json" \
  -u "${OFSC_USERNAME}:${OFSC_PASSWORD}" \
  -d '{
    "plugin": "'"$PLUGIN_BASE64"'"
  }'

if [ $? -eq 0 ]; then
    echo "✅ Plugin deployed successfully!"
else
    echo "❌ Plugin deployment failed!"
    exit 1
fi
```

### Method 2: Using VS Code REST Client

Create `.vscode/requests.http`:

```http
### Variables
@baseUrl = https://your-instance.ofsc.oracle.com/rest
@username = your_username@instance_id
@password = your_api_key
@pluginLabel = my_custom_plugin

### Import Custom Plugin
POST {{baseUrl}}/rest/ofscMetadata/v1/plugins/custom-actions/import
Authorization: Basic {{username}}:{{password}}
Content-Type: application/json

{
  "plugin": "{{$dotenv PLUGIN_BASE64}}"
}

### Install Standard Plugin
POST {{baseUrl}}/rest/ofscMetadata/v1/plugins/{{pluginLabel}}/custom-actions/install
Authorization: Basic {{username}}:{{password}}
Content-Type: application/json

### Test Plugin - Create Activity (with plugin execution)
POST {{baseUrl}}/rest/ofscCore/v1/activities
Authorization: Basic {{username}}:{{password}}
Content-Type: application/json

{
  "activityType": "INSTALL",
  "date": "2026-02-01",
  "duration": 60
}
```

### Method 3: Node.js Deployment Script

Create `scripts/deploy-plugin-simple.js`:

```javascript
#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
require('dotenv').config({ path: '.env.local' });

async function deployPlugin(pluginPath) {
    console.log('🚀 Deploying plugin from:', pluginPath);
    
    // Read plugin package
    const pluginZip = await readFile(path.join(pluginPath, 'plugin.zip'));
    const pluginBase64 = pluginZip.toString('base64');
    
    // Prepare request
    const auth = Buffer.from(`${process.env.OFSC_USERNAME}:${process.env.OFSC_PASSWORD}`).toString('base64');
    const url = new URL('/rest/ofscMetadata/v1/plugins/custom-actions/import', process.env.OFSC_BASE_URL);
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`
        }
    };
    
    const body = JSON.stringify({ plugin: pluginBase64 });
    
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let data = '';
            
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200 || res.statusCode === 201) {
                    console.log('✅ Plugin deployed successfully!');
                    console.log('Response:', JSON.parse(data));
                    resolve(data);
                } else {
                    console.error('❌ Deployment failed:', res.statusCode);
                    console.error('Response:', data);
                    reject(new Error(`Failed with status ${res.statusCode}`));
                }
            });
        });
        
        req.on('error', reject);
        req.write(body);
        req.end();
    });
}

// Run deployment
const pluginPath = process.argv[2] || './plugins/my-custom-plugin';
deployPlugin(pluginPath)
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Error:', err.message);
        process.exit(1);
    });
```

## 🎯 VS Code Integration

### Create VS Code Tasks

Create `.vscode/tasks.json`:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "OFSC: Deploy Plugin",
            "type": "shell",
            "command": "node",
            "args": [
                "${workspaceFolder}/scripts/deploy-plugin-simple.js",
                "${workspaceFolder}/plugins/${input:pluginName}"
            ],
            "problemMatcher": [],
            "presentation": {
                "reveal": "always",
                "panel": "new"
            },
            "group": {
                "kind": "build",
                "isDefault": true
            }
        },
        {
            "label": "OFSC: Package Plugin",
            "type": "shell",
            "command": "cd plugins/${input:pluginName} && zip -r plugin.zip * -x '*.DS_Store' 'node_modules/*'",
            "problemMatcher": [],
            "presentation": {
                "reveal": "always"
            }
        },
        {
            "label": "OFSC: Package & Deploy Plugin",
            "dependsOn": [
                "OFSC: Package Plugin",
                "OFSC: Deploy Plugin"
            ],
            "dependsOrder": "sequence",
            "problemMatcher": []
        },
        {
            "label": "OFSC: Test Plugin (Newman)",
            "type": "shell",
            "command": "newman run '${workspaceFolder}/Oracle Field Service Cloud (OFSC) REST API - Full Collection.postman_collection.json' --environment '${workspaceFolder}/OFSC Basic Environment -TEST.postman_environment.json' --folder 'Activities' --reporter-cli-no-assertions",
            "problemMatcher": []
        }
    ],
    "inputs": [
        {
            "id": "pluginName",
            "type": "promptString",
            "description": "Enter plugin name/folder",
            "default": "my-custom-plugin"
        }
    ]
}
```

### Usage in VS Code

1. **Quick Deploy**: Press `Cmd+Shift+B` (Mac) or `Ctrl+Shift+B` (Windows)
2. **Command Palette**: `Cmd+Shift+P` → "Tasks: Run Task" → Select "OFSC: Deploy Plugin"
3. **Keyboard Shortcut**: Add to `keybindings.json`:

```json
[
    {
        "key": "cmd+shift+d",
        "command": "workbench.action.tasks.runTask",
        "args": "OFSC: Package & Deploy Plugin"
    }
]
```

## 🧪 Testing Strategy

### 1. Unit Testing (Local)

```javascript
// test/plugin.test.js
const { describe, it, expect } = require('@jest/globals');
const plugin = require('../plugins/my-custom-plugin/plugin.js');

describe('Plugin Logic', () => {
    it('should validate activity data correctly', () => {
        const activity = { activityType: 'INSTALL', duration: 60 };
        const result = plugin.validateActivity(activity);
        expect(result).toBe(true);
    });
});
```

### 2. Integration Testing (with OFSC)

```javascript
// test/integration.test.js
const newman = require('newman');

async function testPlugin() {
    return new Promise((resolve, reject) => {
        newman.run({
            collection: require('../Oracle Field Service Cloud (OFSC) REST API - Full Collection.postman_collection.json'),
            environment: require('../OFSC Basic Environment -TEST.postman_environment.json'),
            folder: ['Activities', 'Plugins'],
            reporters: ['cli', 'json']
        }, (err, summary) => {
            if (err || summary.run.failures.length) {
                reject(err || summary.run.failures);
            } else {
                resolve(summary);
            }
        });
    });
}
```

### 3. Watch Mode (Auto-deploy on changes)

Create `scripts/watch-plugin.js`:

```javascript
#!/usr/bin/env node

const chokidar = require('chokidar');
const { execSync } = require('child_process');

const pluginPath = process.argv[2] || './plugins/my-custom-plugin';

console.log(`👀 Watching ${pluginPath} for changes...`);

const watcher = chokidar.watch(pluginPath, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
});

let timeout;
watcher.on('change', (path) => {
    console.log(`\n📝 File changed: ${path}`);
    
    // Debounce: wait 2 seconds before deploying
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        console.log('🚀 Deploying updated plugin...\n');
        try {
            execSync(`node scripts/deploy-plugin-simple.js ${pluginPath}`, { 
                stdio: 'inherit' 
            });
        } catch (err) {
            console.error('❌ Deployment failed');
        }
    }, 2000);
});
```

Run with: `node scripts/watch-plugin.js plugins/my-custom-plugin`

## 📝 Best Practices

### 1. Version Control

```bash
# .gitignore additions for plugins
plugins/**/node_modules/
plugins/**/*.zip
plugins/**/.env
.env.local
reports/
```

### 2. Plugin Structure

```javascript
// plugins/my-custom-plugin/plugin.js
(function(api) {
    'use strict';
    
    // Plugin metadata
    const PLUGIN_INFO = {
        name: 'My Custom Plugin',
        version: '1.0.0',
        author: 'Your Name'
    };
    
    // Plugin logic
    api.onActivityCreate = function(activity) {
        // Your logic here
        api.log('Activity created:', activity.activityId);
        return activity;
    };
    
})(PluginAPI);
```

### 3. Configuration Management

```json
// plugins/my-custom-plugin/config.json
{
    "environments": {
        "dev": {
            "baseUrl": "https://dev-instance.ofsc.oracle.com",
            "debug": true
        },
        "test": {
            "baseUrl": "https://test-instance.ofsc.oracle.com",
            "debug": true
        },
        "prod": {
            "baseUrl": "https://prod-instance.ofsc.oracle.com",
            "debug": false
        }
    }
}
```

### 4. CI/CD Integration

Create `.github/workflows/deploy-plugin.yml`:

```yaml
name: Deploy OFSC Plugin

on:
  push:
    branches: [ main ]
    paths:
      - 'plugins/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    
    - name: Install dependencies
      run: npm install
    
    - name: Package Plugin
      run: |
        cd plugins/my-custom-plugin
        zip -r plugin.zip *
    
    - name: Deploy to OFSC
      env:
        OFSC_BASE_URL: ${{ secrets.OFSC_BASE_URL }}
        OFSC_USERNAME: ${{ secrets.OFSC_USERNAME }}
        OFSC_PASSWORD: ${{ secrets.OFSC_PASSWORD }}
      run: node scripts/deploy-plugin-simple.js plugins/my-custom-plugin
    
    - name: Test Plugin
      run: npm test
```

## 🔗 Quick Reference Commands

```bash
# Deploy plugin
npm run deploy:plugin my-custom-plugin

# Watch and auto-deploy
npm run watch:plugin my-custom-plugin

# Test plugin
npm run test:plugin

# Package plugin only
npm run package:plugin my-custom-plugin
```

Add to `package.json`:

```json
{
  "scripts": {
    "deploy:plugin": "node scripts/deploy-plugin-simple.js plugins/$npm_config_name",
    "watch:plugin": "node scripts/watch-plugin.js plugins/$npm_config_name",
    "test:plugin": "newman run './Oracle Field Service Cloud (OFSC) REST API - Full Collection.postman_collection.json' --folder Plugins",
    "package:plugin": "cd plugins/$npm_config_name && zip -r plugin.zip * && cd -"
  },
  "devDependencies": {
    "newman": "^5.3.2",
    "chokidar": "^3.5.3",
    "dotenv": "^16.0.3"
  }
}
```

## 🎓 Learning Resources

- [OFSC Plugin Development Guide](https://docs.oracle.com/en/cloud/saas/field-service/plugin-guide/)
- [Newman Documentation](https://learning.postman.com/docs/running-collections/using-newman-cli/command-line-integration-with-newman/)
- [VS Code Tasks](https://code.visualstudio.com/docs/editor/tasks)

---

**Happy Plugin Development! 🚀**
