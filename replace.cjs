const fs = require('fs');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace slate with neutral globally
  content = content.replace(/slate-/g, 'neutral-');
  
  // Replace bg-neutral-950 with bg-black for a deeper black
  content = content.replace(/bg-neutral-950/g, 'bg-black');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

replaceInFile('src/App.tsx');
replaceInFile('src/index.css');
