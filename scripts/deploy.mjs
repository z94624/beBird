import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import { chdir } from 'process';

// 從 utils.ts 讀取 versionList 第一筆的 version
const utilsContent = readFileSync('src/layout/utils.ts', 'utf8');
const match = utilsContent.match(/version:\s*'([^']+)'/);
const version = match ? match[1] : 'unknown';

console.log(`🚀 Deploying version: ${version}`);

execSync('npm run build', { stdio: 'inherit' });

chdir('dist');

execSync('git add .', { stdio: 'inherit' });
execSync(`git commit -m "deploy ${version}"`, { stdio: 'inherit' });
execSync('git push -u https://github.com/z94624/beBird.git gh-pages5', { stdio: 'inherit' });

console.log(`✅ Deployed version ${version} successfully!`);

