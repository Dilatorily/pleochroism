import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { getMainState } from 'redux-ipc-electron';
import 'normalize.css';

import App from './components/App';
import configureStore from './store';
import { isDevelopment } from '../shared/utils';

const root = document.getElementById('root');

(async () => {
  const preloadedState = await getMainState();
  const store = await configureStore(preloadedState);
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
  if (isDevelopment() && module.hot) {
    module.hot.accept('./components/App', () => render(App));
  }
})();
