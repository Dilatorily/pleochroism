import { app, BrowserWindow } from 'electron';

let renderer = null;
const isDevelopment = () => process.env.NODE_ENV === 'development';

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

  renderer = new BrowserWindow({ width: 800, height: 600 });
  renderer.loadURL(isDevelopment() ? 'http://localhost:8080' : `file://${__dirname}/index.html`);
  renderer.on('closed', () => {
    renderer = null;
  });
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
