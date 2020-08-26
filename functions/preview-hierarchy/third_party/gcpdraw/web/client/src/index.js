import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';

/** @suppress {externsValidation} */
import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {Route, Switch, Redirect} from 'react-router';
import {ConnectedRouter} from 'connected-react-router';
// jslint:ignore end

import configureStore, {history} from './configureStore';
import * as serviceWorker from './serviceWorker';

// import Browse from './routes/diagrams/browse';
import Mine from './routes/diagrams/mine';
import Popular from './routes/diagrams/popular';
import Workspace from './routes/workspace';

export const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/diagrams/new' component={Workspace} />
        <Redirect from='/diagrams/:id/edit' to='/diagrams/:id' />
        <Route path='/diagrams/:id' component={Workspace} />
        <Route path='/mydiagrams' component={Mine} />
        <Route path='/popular' component={Popular} />
        <Route path='/' component={Mine} />
      </Switch>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
