import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, browserHistory } from 'react-router';
import reducers from './reducers';
import routes from './routes';
import promise from 'redux-promise';
import thunkMiddleware from 'redux-thunk'
import {persistStore, autoRehydrate} from 'redux-persist';

const store = createStore(reducers, {},compose(autoRehydrate(), applyMiddleware(promise, thunkMiddleware)));
persistStore(store);
//qpersistStore(store, config, callback).purge() //this is to purge all the saved states in the local storage

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>
    , document.querySelector('.container'));
