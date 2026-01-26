# Quick Start: OFSC Plugin Development from VS Code

## 🚀 One-Time Setup (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Your OFSC Instance

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your credentials
code .env.local
```

Update with your actual values:
```bash
OFSC_BASE_URL=https://your-instance.ofsc.oracle.com/rest
OFSC_USERNAME=your_username@instance_id
OFSC_PASSWORD=your_api_key
```

## 🎯 Daily Workflow

### Method 1: VS Code Tasks (Recommended)

1. **Package & Deploy**: Press `Cmd+Shift+B` (Mac) or `Ctrl+Shift+B` (Windows)
2. Enter your plugin folder path when prompted
3. Done! ✅

### Method 2: Command Line

```bash
# Deploy once
npm run deploy plugins/my-custom-plugin

# Watch mode (auto-deploy on changes)
npm run deploy:watch plugins/my-custom-plugin
```

### Method 3: VS Code Keyboard Shortcuts

Add to your `keybindings.json` (File → Preferences → Keyboard Shortcuts):

```json
[
    {
        "key": "cmd+shift+d",
        "command": "workbench.action.tasks.runTask",
        "args": "OFSC: Package & Deploy Plugin"
    }
]
```

Then just press `Cmd+Shift+D` to deploy!

## 📁 Create Your First Plugin

### Quick Template

```bash
# Create plugin directory
mkdir -p plugins/my-first-plugin

# Create plugin files
cat > plugins/my-first-plugin/plugin.js << 'EOF'
(function(api) {
    'use strict';
    
    api.log('🎉 My First Plugin Loaded!');
    
    api.onActivityCreate = function(activity) {
        api.log('New activity created:', activity.activityId);
        return activity;
    };
    
})(PluginAPI);
EOF

cat > plugins/my-first-plugin/manifest.json << 'EOF'
{
    "name": "My First Plugin",
    "version": "1.0.0",
    "description": "My first OFSC plugin",
    "author": "Your Name"
}
EOF

# Package it
cd plugins/my-first-plugin && zip -r plugin.zip * && cd ../..

# Deploy it
npm run deploy plugins/my-first-plugin
```

## 🧪 Test Your Plugin

```bash
# Test plugin endpoints
npm run test:plugins

# Test all endpoints
npm test

# Generate HTML report
npm run test:report
```

## 📖 Available Commands

| Command | Description |
|---------|-------------|
| `npm run deploy <path>` | Deploy plugin once |
| `npm run deploy:watch <path>` | Auto-deploy on changes |
| `npm test` | Run all API tests |
| `npm run test:plugins` | Test plugin endpoints |
| `npm run test:report` | Generate HTML test report |

## 🔄 Auto-Deploy Workflow

For active development, use watch mode:

```bash
npm run deploy:watch plugins/my-first-plugin
```

Now edit your plugin files in VS Code - changes will auto-deploy to OFSC after 2 seconds!

## 💡 VS Code Tips

### 1. Use Multi-Root Workspace

```json
// workspace.code-workspace
{
    "folders": [
        { "path": "." },
        { "path": "plugins/my-first-plugin" }
    ]
}
```

### 2. Recommended Extensions

- **REST Client** - Test APIs directly in VS Code
- **Postman** - Import and run collections
- **Thunder Client** - Alternative REST client

### 3. Snippets for Plugin Development

Add to `.vscode/ofsc-plugin.code-snippets`:

```json
{
    "OFSC Plugin Template": {
        "prefix": "ofsc-plugin",
        "body": [
            "(function(api) {",
            "    'use strict';",
            "    ",
            "    api.onActivityCreate = function(activity) {",
            "        $0",
            "        return activity;",
            "    };",
            "    ",
            "})(PluginAPI);"
        ]
    }
}
```

## 🐛 Troubleshooting

### Authentication Failed

```bash
# Verify credentials
curl -u "$OFSC_USERNAME:$OFSC_PASSWORD" \
  "$OFSC_BASE_URL/rest/ofscCore/v1/activities?limit=1"
```

### Plugin Not Deploying

1. Check plugin.zip exists in plugin folder
2. Verify .env.local has correct values
3. Check OFSC instance is accessible
4. Review permissions for plugin deployment

### Watch Mode Not Working

```bash
# Install chokidar for better file watching
npm install chokidar
```

## 📚 Next Steps

1. Read [PLUGIN_DEVELOPMENT_GUIDE.md](PLUGIN_DEVELOPMENT_GUIDE.md) for complete documentation
2. Review VS Code tasks in `.vscode/tasks.json`
3. Check example plugins in `plugins/` folder
4. Explore API collection in Postman

## 🆘 Need Help?

- Check logs in VS Code terminal
- Review [README.md](README.md) for API documentation
- See [PLUGIN_DEVELOPMENT_GUIDE.md](PLUGIN_DEVELOPMENT_GUIDE.md) for advanced topics

---

Happy coding! 🚀
