import { app, BrowserWindow } from 'electron';

let renderer = null;
const isDevelopment = process.env.NODE_ENV === 'development';

const createRenderer = async () => {
  renderer = new BrowserWindow({ width: 800, height: 600 });
  renderer.loadURL(isDevelopment ? 'http://localhost:8080' : `file://${__dirname}/index.html`);
  renderer.on('closed', () => {
    renderer = null;
  });

  if (isDevelopment) {
    const [ElectronDebug, ElectronDevtoolsInstaller] = await Promise.all([
      import('electron-debug'),
      import('electron-devtools-installer'),
    ]);
    const installExtension = ElectronDevtoolsInstaller.default;

    ElectronDebug();
    await Promise.all([
      installExtension(ElectronDevtoolsInstaller.REACT_DEVELOPER_TOOLS),
      installExtension(ElectronDevtoolsInstaller.REDUX_DEVTOOLS),
    ]);
  }
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
