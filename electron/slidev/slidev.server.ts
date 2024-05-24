import path from 'path';
import { exec } from 'child_process';

export const createSlidevServer = async () => {
  const scriptPath = path.join(process.resourcesPath, 'slidev');
    
  exec('npm run start', { cwd: scriptPath }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return;
    }
    if (stdout) {
      console.log(`Script output: ${stdout}`);
    }
    if (stderr) {
      console.error(`Script error output: ${stderr}`);
    }
  });
}