import { applyMiddleware, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import { createMiddleware as ReduxIPCMiddleware } from '../shared/ipc';
import { isDevelopment } from '../shared/utils';

const getEnhancer = async () => {
  let middlewares = [ReduxThunk, ReduxIPCMiddleware()];
  if (isDevelopment()) {
    const ReduxLogger = await import('redux-logger');
    const developmentMiddlewares = [ReduxLogger()];
    middlewares = [...middlewares, ...developmentMiddlewares];
  } else {
    const productionMiddlewares = [];
    middlewares = [...middlewares, ...productionMiddlewares];
  }

  let enhancers = [applyMiddleware(...middlewares)];
  if (isDevelopment()) {
    const developmentEnhancers = [
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line no-underscore-dangle, max-len
    ];
    enhancers = [...enhancers, ...developmentEnhancers];
  } else {
    const productionEnhancers = [];
    enhancers = [...enhancers, ...productionEnhancers];
  }

  return compose(...enhancers);
};

export default async (preloadedState = {}) => {
  const enhancer = await getEnhancer();
  const store = createStore(reducers, preloadedState, enhancer);

  if (isDevelopment() && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(reducers));
  }

  return store;
};
