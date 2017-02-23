import React from 'react';
import { loadFile } from '../ipc/load';

const styles = {
  app: {
    overflow: 'hidden',
  },
};

const onChange = (event) => {
  loadFile(event.target.files[0].path);
};

const App = () => (
  <div style={styles.app}>
    <h1>Hello, World with hot reloading?!</h1>
    <input type="file" onChange={onChange} />
  </div>
);

export default App;
