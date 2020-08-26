import { createBrowserHistory } from 'history';
import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from './rootReducer';


let middlewares = [];

const env = process.env.NODE_ENV;
if (env === 'local' || env === 'development') {
  middlewares.push(logger);
}

export const history = createBrowserHistory();

middlewares.push(thunkMiddleware);
middlewares.push(routerMiddleware(history));

const configureStore = (initialState) => {
  const store = createStore(
    rootReducer(history),
    initialState,
    compose(
      applyMiddleware(...middlewares)
    )
  );

  return store;
};


export default configureStore;
