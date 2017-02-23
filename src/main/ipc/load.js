import { spawn } from 'child_process';
import { ipcMain } from 'electron';
import ffplay from 'ffplay-static';

import { LOAD_FILE } from '../../ipc';

ipcMain.on(LOAD_FILE, (event, path) => {
  spawn(ffplay.default, [path, '-nodisp', '-autoexit'], { stdio: 'ignore' });
});
