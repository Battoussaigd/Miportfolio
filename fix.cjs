const fs = require('fs');

function fixTranslate(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/tranneutral/g, 'translate');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed ${filePath}`);
}

fixTranslate('src/App.tsx');
fixTranslate('src/index.css');
