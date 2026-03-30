const { execSync } = require('child_process');
try {
  const status = execSync('git status').toString();
  console.log("GIT STATUS:\n", status);
  
  execSync('git checkout src/App.tsx src/index.css');
  console.log("Restored files from git.");
} catch (e) {
  console.error("Error:", e.message);
}
