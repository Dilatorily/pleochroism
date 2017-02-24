import React from 'react';

const styles = {
  app: {
    overflow: 'hidden',
  },
};

const App = () => (
  <div style={styles.app}>
    <h1>Hello, World with hot reloading?!</h1>
    <input type="file" onChange={() => {}} />
  </div>
);

export default App;
