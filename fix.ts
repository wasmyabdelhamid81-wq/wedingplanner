import fs from 'fs';
import path from 'path';

function fixFile(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;
  content = content.replace(/\\\\'|\\'|\\`/g, (match) => {
    if (match === "\\\\'") return "\\'";
    if (match === "\\'") return "'";
    if (match === "\\`") return "\`";
    return match;
  });
  content = content.replace(/\\\$/g, '$');
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Fixed', filePath);
  }
}

fixFile('./src/data.ts');
