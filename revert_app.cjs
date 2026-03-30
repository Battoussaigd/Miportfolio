const fs = require('fs');

function revertAppTsx(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Revert gradients
  content = content.replace(/bg-cyan-400 text-neutral-950 px-3/g, 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-neutral-950 px-3');
  content = content.replace(/bg-cyan-400\/5 opacity-0/g, 'bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0');
  content = content.replace(/bg-cyan-500 text-white rounded-tr-sm/g, 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-tr-sm');
  content = content.replace(/bg-cyan-500 flex items-center justify-center text-white disabled:opacity-50/g, 'bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white disabled:opacity-50');
  content = content.replace(/bg-cyan-500\/10 border border-cyan-500\/20 p-8/g, 'bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 p-8');
  content = content.replace(/bg-cyan-400 text-neutral-950 px-8 py-4/g, 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-neutral-950 px-8 py-4');

  // Also revert the Hero title
  content = content.replace(
    /className={`font-heading font-medium text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-6 \${isDark \? 'text-white' : 'text-black'}`}/g,
    'className="font-heading font-medium text-neutral-900 dark:text-white text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-6"'
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

revertAppTsx('src/App.tsx');
