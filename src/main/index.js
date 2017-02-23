import fs from 'fs';
import { app, BrowserWindow } from 'electron';

import { isDevelopment } from '../utils';

let renderer = null;

const createRenderer = async () => {
  if (isDevelopment()) {
    const [ElectronDebug, ElectronDevtoolsInstaller] = await Promise.all([
      import('electron-debug'),
      import('electron-devtools-installer'),
    ]);
    const installExtension = ElectronDevtoolsInstaller.default;
    const { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = ElectronDevtoolsInstaller;

    ElectronDebug();
    await Promise.all([installExtension(REACT_DEVELOPER_TOOLS), installExtension(REDUX_DEVTOOLS)]);
  }

  renderer = new BrowserWindow({
    width: 400,
    height: 400,
    useContentSize: true,
    minWidth: 400,
    minHeight: 400,
    show: false,
  });
  renderer.loadURL(isDevelopment() ? 'http://localhost:8080' : `file://${__dirname}/index.html`);
  renderer.on('closed', () => {
    renderer = null;
  });
  renderer.once('ready-to-show', () => renderer.show());
};

app.on('ready', createRenderer);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (renderer === null) {
    createRenderer();
  }
});

fs.readdir(`${__dirname}/ipc`, (error, files) => {
  files.forEach(file => import(`./ipc/${file}`));
});
