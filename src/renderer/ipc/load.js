import { ipcRenderer } from 'electron';

import { LOAD_FILE } from '../../ipc';

export const loadFile = path => ipcRenderer.send(LOAD_FILE, path); // eslint-disable-line
