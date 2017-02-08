import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import 'normalize.css';

import App from './components/App';
import configureStore from './store';
import { isDevelopment } from './utils';

const root = document.getElementById('root');

(async () => {
  const store = await configureStore();
  const render = (Component) => {
    ReactDOM.render(
      <Provider store={store}>
        <AppContainer>
          <Component />
        </AppContainer>
      </Provider>,
      root,
    );
  };

  render(App);
  if (isDevelopment && module.hot) {
    module.hot.accept('./components/App', () => render(App));
  }
})();
