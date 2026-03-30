const fs = require('fs');

function fixGradients(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace bg-gradient-to-r from-cyan-400 to-cyan-500 with bg-cyan-400
  content = content.replace(/bg-gradient-to-r from-cyan-400 to-cyan-500/g, 'bg-cyan-400');
  
  // Replace bg-gradient-to-r from-cyan-500 to-blue-500 with bg-cyan-500
  content = content.replace(/bg-gradient-to-r from-cyan-500 to-blue-500/g, 'bg-cyan-500');
  
  // Replace bg-gradient-to-br from-cyan-500/10 to-transparent with bg-cyan-500/10
  content = content.replace(/bg-gradient-to-br from-cyan-500\/10 to-transparent/g, 'bg-cyan-500/10');
  
  // Replace bg-gradient-to-br from-cyan-400/5 to-transparent with bg-cyan-400/5
  content = content.replace(/bg-gradient-to-br from-cyan-400\/5 to-transparent/g, 'bg-cyan-400/5');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed ${filePath}`);
}

fixGradients('src/App.tsx');
