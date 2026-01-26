#!/usr/bin/env node

/**
 * OFSC Plugin Deployment Script
 * 
 * Deploys a plugin to Oracle Field Service Cloud instance
 * Usage: node deploy-plugin.js <plugin-path>
 * 
 * Example: node deploy-plugin.js ./plugins/my-custom-plugin
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

// Load environment variables from .env.local if available
try {
    require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
} catch (e) {
    console.warn('⚠️  dotenv not installed. Make sure OFSC_* environment variables are set.');
}

// Configuration
const config = {
    baseUrl: process.env.OFSC_BASE_URL || 'https://your-instance.ofsc.oracle.com/rest',
    username: process.env.OFSC_USERNAME,
    password: process.env.OFSC_PASSWORD,
    pluginPath: process.argv[2] || './plugins/my-custom-plugin'
};

// Validate configuration
function validateConfig() {
    const errors = [];
    
    if (!config.username) errors.push('OFSC_USERNAME not set');
    if (!config.password) errors.push('OFSC_PASSWORD not set');
    if (!config.baseUrl) errors.push('OFSC_BASE_URL not set');
    
    if (errors.length > 0) {
        console.error('❌ Configuration errors:');
        errors.forEach(err => console.error(`   - ${err}`));
        console.error('\n💡 Tip: Create a .env.local file with:');
        console.error('   OFSC_BASE_URL=https://your-instance.ofsc.oracle.com/rest');
        console.error('   OFSC_USERNAME=your_username@instance_id');
        console.error('   OFSC_PASSWORD=your_api_key');
        process.exit(1);
    }
}

// Check if plugin package exists
async function checkPluginPackage(pluginPath) {
    const zipPath = path.join(pluginPath, 'plugin.zip');
    
    if (!fs.existsSync(zipPath)) {
        console.error(`❌ Plugin package not found: ${zipPath}`);
        console.error('\n💡 Create plugin.zip first:');
        console.error(`   cd ${pluginPath}`);
        console.error(`   zip -r plugin.zip * -x "*.DS_Store" "node_modules/*"`);
        process.exit(1);
    }
    
    return zipPath;
}

// Deploy plugin to OFSC
async function deployPlugin(zipPath) {
    console.log('🚀 Deploying plugin...');
    console.log(`   From: ${zipPath}`);
    console.log(`   To: ${config.baseUrl}`);
    
    try {
        // Read plugin package
        const pluginZip = await readFile(zipPath);
        const pluginBase64 = pluginZip.toString('base64');
        
        // Prepare request
        const auth = Buffer.from(`${config.username}:${config.password}`).toString('base64');
        const url = new URL('/rest/ofscMetadata/v1/plugins/custom-actions/import', config.baseUrl);
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`,
                'Content-Length': Buffer.byteLength(JSON.stringify({ plugin: pluginBase64 }))
            }
        };
        
        const body = JSON.stringify({ 
            plugin: pluginBase64,
            description: `Deployed from VS Code at ${new Date().toISOString()}`
        });
        
        return new Promise((resolve, reject) => {
            const req = https.request(url, options, (res) => {
                let data = '';
                
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    if (res.statusCode === 200 || res.statusCode === 201) {
                        console.log('\n✅ Plugin deployed successfully!');
                        try {
                            const response = JSON.parse(data);
                            console.log('📊 Response:', JSON.stringify(response, null, 2));
                        } catch (e) {
                            console.log('📊 Response:', data);
                        }
                        resolve(data);
                    } else {
                        console.error('\n❌ Deployment failed!');
                        console.error(`   Status: ${res.statusCode}`);
                        console.error(`   Response: ${data}`);
                        reject(new Error(`Failed with status ${res.statusCode}`));
                    }
                });
            });
            
            req.on('error', (err) => {
                console.error('\n❌ Network error:', err.message);
                reject(err);
            });
            
            req.write(body);
            req.end();
        });
        
    } catch (err) {
        console.error('❌ Error reading plugin file:', err.message);
        throw err;
    }
}

// Main execution
async function main() {
    console.log('\n🔌 OFSC Plugin Deployment Tool\n');
    console.log('━'.repeat(50));
    
    validateConfig();
    
    const zipPath = await checkPluginPackage(config.pluginPath);
    await deployPlugin(zipPath);
    
    console.log('━'.repeat(50));
    console.log('\n✨ Deployment complete!\n');
}

// Run
main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error('\n❌ Deployment failed:', err.message);
        process.exit(1);
    });
