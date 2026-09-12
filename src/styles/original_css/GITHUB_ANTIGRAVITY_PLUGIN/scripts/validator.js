import fs from 'fs';
import path from 'path';

export function validateMarkdownAndMermaid(filePath) {
  if (!fs.existsSync(filePath)) return { valid: false, errors: ['File does not exist: ' + filePath] };

  const content = fs.readFileSync(filePath, 'utf-8');
  const errors = [];

  // 1. Check for broken badge patterns
  if (content.includes('404 badge not found') || content.includes('/badge/undefined')) {
    errors.push('Found broken shields.io badge link');
  }

  // 2. Check for robotic keywords
  if (content.includes('Automated Profile Engine') || content.includes('Bot Status')) {
    errors.push('Detected robotic/bot keywords in README. Keep design human & professional.');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function autoFixMermaidInContent(content) {
  // Fix unquoted Mermaid nodes with parentheses: UI[Client Application (React 18.3.1)] -> UI["Client Application (React 18.3.1)"]
  return content.replace(/([a-zA-Z0-9_]+)\[([^\]\n]*?\([^)]+?\)[^\]\n]*?)\]/g, (match, id, text) => {
    if (text.startsWith('"') && text.endsWith('"')) return match;
    return id + '["' + text.replace(/"/g, '') + '"]';
  });
}
