import { createStore } from 'redux';
import { ipcMain, ipcRenderer } from 'electron';

let mainStore;

const DEFAULT_IDENTIFIER = 'defaultRenderer';
const UPDATE_MAIN_STORE = '@@redux-ipc/UPDATE_MAIN_STORE';
const SYNC_MAIN_STORE = '@@redux-ipc/SYNC_MAIN_STORE';
const REQUEST_STATE = '@@redux-ipc/REQUEST_STATE';
const RESPONSE_STATE = '@@redux-ipc/RESPONSE_STATE';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_MAIN_STORE:
      return { ...state, [action.identifier]: { ...action.state } };
    default:
      return state;
  }
};

export const initializeStore = (preloadedState = {}) => {
  mainStore = createStore(reducer, preloadedState);
};

export const createMainListeners = (onSync = () => {}, predicate = state => state) => {
  ipcMain.on(REQUEST_STATE, (event, identifier = DEFAULT_IDENTIFIER) =>
    event.sender.send(RESPONSE_STATE, predicate(mainStore.getState()[identifier] || {})));
  ipcMain.on(SYNC_MAIN_STORE, (event, identifier = DEFAULT_IDENTIFIER, state) => {
    mainStore.dispatch({ type: UPDATE_MAIN_STORE, identifier, state });
    onSync(mainStore);
  });
};

export const getMainState = (identifier = DEFAULT_IDENTIFIER) => new Promise((resolve) => {
  ipcRenderer.on(RESPONSE_STATE, (event, state) => resolve(state));
  ipcRenderer.send(REQUEST_STATE, identifier);
});

export const createMiddleware = (identifier = DEFAULT_IDENTIFIER, predicate = state => state) =>
  ({ getState }) => next => (action) => {
    const value = next(action);
    ipcRenderer.send(SYNC_MAIN_STORE, identifier, predicate(getState()));
    return value;
  };

initializeStore();
