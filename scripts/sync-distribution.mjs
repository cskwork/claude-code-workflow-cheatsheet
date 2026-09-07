#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'skills', 'claude-code-workflow-cheatsheet');
const cursor = path.join(root, '.cursor', 'skills', 'claude-code-workflow-cheatsheet');
const check = process.argv.includes('--check');
const templates = fs.readdirSync(path.join(source, 'templates')).filter(name => name.endsWith('.json')).sort();
if (!templates.length) throw new Error('Canonical templates are missing');
const copies = [[path.join(source, 'SKILL.md'), path.join(cursor, 'SKILL.md')]];
for (const name of templates) {
  const from = path.join(source, 'templates', name);
  const value = JSON.parse(fs.readFileSync(from, 'utf8')).companyAnnouncements;
  if (!Array.isArray(value) || value.length !== 1 || typeof value[0] !== 'string' || !value[0]) {
    throw new Error(`Invalid combined announcement template: ${name}`);
  }
  copies.push([from, path.join(root, 'templates', name)], [from, path.join(cursor, 'templates', name)]);
}
for (const [from, to] of copies) {
  const content = fs.readFileSync(from);
  if (check) {
    if (!fs.existsSync(to) || !content.equals(fs.readFileSync(to))) throw new Error(`Distribution drift: ${path.relative(root, to)}`);
  } else {
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.writeFileSync(to, content);
  }
}
console.log(`${check ? 'Verified' : 'Synchronized'} ${copies.length} distribution files`);
