import React from 'react';

import Slider from './Slider';

const styles = {
  app: {
    overflow: 'hidden',
  },
};

const App = () => (
  <div style={styles.app}>
    <h1>Hello, World with hot reloading?!</h1>
    <Slider progress={50} />
  </div>
);

export default App;
