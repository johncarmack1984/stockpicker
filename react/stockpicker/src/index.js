import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//import { combineReducers } from 'redux-immutable';
import ReduxPromise from 'redux-promise';
import Immutable from 'immutable';

import App from './App';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(
  reducers,
  Immutable.Map({}),
  applyMiddleware(ReduxPromise)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'
));

registerServiceWorker();

/*
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
createStoreWithMiddleware(reducers)

 */
