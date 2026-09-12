#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const { analyzeProject } = require('./src/analyzer');
const { generateLinkedInPost } = require('./src/contentGenerator');
const { prepareMediaAssets, openMediaFolder } = require('./src/mediaProcessor');
const { copyToClipboard, getLinkedInShareUrl, openInBrowser } = require('./src/publisher');

// Parse simple CLI arguments
const args = process.argv.slice(2);
let targetPath = process.cwd();
let shouldPublish = false;
let shouldCopy = true;
let shouldOpenUI = false;
let tone = 'showcase';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--path' && args[i + 1]) {
    targetPath = args[i + 1];
    i++;
  } else if (args[i] === '--publish') {
    shouldPublish = true;
  } else if (args[i] === '--no-copy') {
    shouldCopy = false;
  } else if (args[i] === '--ui') {
    shouldOpenUI = true;
  } else if (args[i] === '--tone' && args[i + 1]) {
    tone = args[i + 1];
    i++;
  } else if (args[i] === '--help' || args[i] === '-h') {
    printHelp();
    process.exit(0);
  }
}

if (shouldOpenUI) {
  require('./src/server');
  return;
}

function printHelp() {
  console.log(`
╔══════════════════════════════════════════════════════════════════╗
║             🚀 GLOBAL LINKEDIN PROJECT AGENT & PUBLISHER         ║
╚══════════════════════════════════════════════════════════════════╝

Usage:
  linkedin-post [options]
  node cli.js [options]

Options:
  --path <dir>       Path to project repository (Default: Current working directory)
  --publish          Copy to clipboard & open LinkedIn Post composer + Media folder
  --tone <type>      Post tone: 'showcase' (default), 'deep_dive', or 'portfolio'
  --ui               Launch the interactive Web Dashboard & live preview
  --no-copy          Do not automatically copy to clipboard
  --help, -h         Show this help message

Examples:
  node cli.js --path "C:\\path\\to\\project" --publish
  node cli.js --ui
  `);
}

async function run() {
  console.log('\n🔍 Analyzing project at:', targetPath);
  
  try {
    const analysis = analyzeProject(targetPath);
    console.log(`✅ Project Detected: "${analysis.cleanTitle || analysis.projectName}"`);
    console.log(`📦 Tech Stack: ${analysis.techStack.join(', ')}`);
    console.log(`📸 Found ${analysis.mediaCount} Screenshots/Media`);
    if (analysis.githubUrl) {
      console.log(`🔗 GitHub Repo: ${analysis.githubUrl}`);
    }

    const postData = generateLinkedInPost(analysis, { tone });
    const media = prepareMediaAssets(analysis);

    console.log('\n' + '═'.repeat(70));
    console.log('📝 GENERATED HIGH-REACH LINKEDIN POST (SEO OPTIMIZED):');
    console.log('═'.repeat(70));
    console.log(postData.postText);
    console.log('═'.repeat(70));
    console.log(`📊 Character count: ${postData.characterCount} | Tone: ${tone}`);

    if (shouldCopy) {
      try {
        await copyToClipboard(postData.postText);
        console.log('\n📋 [COPIED TO CLIPBOARD!] Post text has been automatically copied to your clipboard.');
      } catch (e) {
        console.warn('⚠️ Clipboard warning:', e.message);
      }
    }

    if (media.count > 0) {
      console.log(`\n📸 Discovered Screenshots to Attach:`);
      media.items.forEach((item, idx) => {
        console.log(`  ${idx + 1}. [${item.name}] (${item.sizeFormatted}) -> ${item.absolutePath}`);
      });
    }

    if (shouldPublish) {
      console.log('\n🚀 Opening LinkedIn in browser...');
      const shareUrl = getLinkedInShareUrl(postData.postText, postData.repoUrl);
      await openInBrowser(shareUrl);

      if (media.count > 0) {
        console.log('📂 Opening media folder so you can drag-and-drop screenshots into LinkedIn...');
        await openMediaFolder(media.items[0].absolutePath);
      }
      console.log('\n✨ DONE! Your LinkedIn post composer is open, text is copied in clipboard (Ctrl+V), and media folder is ready.');
    } else {
      console.log('\n💡 Tip: Run with `--publish` or open the Web UI with `--ui` to post with 1 click!');
    }

  } catch (err) {
    console.error('❌ Error executing LinkedIn agent:', err.message);
    process.exit(1);
  }
}

run();
