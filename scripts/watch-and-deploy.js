#!/usr/bin/env node

/**
 * OFSC Plugin Watch & Auto-Deploy
 * 
 * Watches plugin folder for changes and automatically deploys to OFSC
 * Usage: node watch-and-deploy.js <plugin-path>
 * 
 * Example: node watch-and-deploy.js ./plugins/my-custom-plugin
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const pluginPath = process.argv[2] || './plugins/my-custom-plugin';
const debounceMs = 2000; // Wait 2 seconds before deploying

console.log('\n👀 OFSC Plugin Watch Mode\n');
console.log('━'.repeat(50));
console.log(`   Watching: ${pluginPath}`);
console.log(`   Debounce: ${debounceMs}ms`);
console.log('━'.repeat(50));
console.log('\n💡 Press Ctrl+C to stop\n');

// Check if plugin path exists
if (!fs.existsSync(pluginPath)) {
    console.error(`❌ Plugin path not found: ${pluginPath}`);
    process.exit(1);
}

// Try to use chokidar if available, otherwise use fs.watch
let watcher;
try {
    const chokidar = require('chokidar');
    
    watcher = chokidar.watch(pluginPath, {
        ignored: /(^|[\/\\])\.|node_modules|\.zip$/, // ignore dotfiles, node_modules, zip files
        persistent: true,
        ignoreInitial: true
    });
    
    console.log('✅ Using chokidar for file watching\n');
} catch (e) {
    // Fallback to fs.watch
    console.log('⚠️  chokidar not found, using fs.watch (basic watching)');
    console.log('   Install chokidar for better experience: npm install chokidar\n');
    
    watcher = {
        on: (event, callback) => {
            if (event === 'change') {
                fs.watch(pluginPath, { recursive: true }, (eventType, filename) => {
                    if (filename && !filename.includes('node_modules') && !filename.endsWith('.zip')) {
                        callback(path.join(pluginPath, filename));
                    }
                });
            }
        }
    };
}

let timeout;
let isDeploying = false;

watcher.on('change', (filePath) => {
    const fileName = path.basename(filePath);
    console.log(`\n📝 File changed: ${fileName}`);
    
    // Clear existing timeout
    clearTimeout(timeout);
    
    // Set new timeout for deployment
    timeout = setTimeout(() => {
        if (isDeploying) {
            console.log('⏳ Deployment already in progress, skipping...');
            return;
        }
        
        console.log('\n🔄 Changes detected, repackaging and deploying...\n');
        packageAndDeploy();
    }, debounceMs);
});

function packageAndDeploy() {
    isDeploying = true;
    
    // Step 1: Package plugin
    console.log('📦 Step 1: Packaging plugin...');
    const packageCmd = spawn('sh', ['-c', `cd ${pluginPath} && zip -r plugin.zip * -x "*.DS_Store" "node_modules/*" ".git/*"`], {
        stdio: 'inherit'
    });
    
    packageCmd.on('close', (code) => {
        if (code !== 0) {
            console.error('❌ Packaging failed!');
            isDeploying = false;
            return;
        }
        
        // Step 2: Deploy plugin
        console.log('\n🚀 Step 2: Deploying to OFSC...');
        const deployCmd = spawn('node', [path.join(__dirname, 'deploy-plugin.js'), pluginPath], {
            stdio: 'inherit'
        });
        
        deployCmd.on('close', (code) => {
            isDeploying = false;
            
            if (code === 0) {
                console.log('\n✅ Deployment successful! Watching for more changes...\n');
            } else {
                console.error('\n❌ Deployment failed! Watching for more changes...\n');
            }
        });
    });
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
    console.log('\n\n👋 Stopping watch mode...');
    if (watcher.close) {
        watcher.close();
    }
    process.exit(0);
});
