import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import App from './components/app';
import BookList from './components/book_list';
import BookNew from './components/book_new';
import BookShow from './components/book_show';
import BookEdit from './components/book_edit';
import AddReview from './components/review_new';
import AuthService from './utils/AuthService'
import Login from './components/log_in';

const auth = new AuthService('K2UDmb55IjNcvJMDyaVzTBWh9w6uCdb9', 'hyin775.auth0.com');


const requireAuth = (nextState, replace) => {
    console.log('logged in', auth.loggedIn());
//because the page can't set the id token fast enough, check the nextState to see if the hash exists
//if it does exist then grab the id token from the hash and then set it to local storage
    if (nextState.location.hash) {
//you can use regex here, it would be a lot more efficent
        const hashString = nextState.location.hash;
        const idString = '&id_token';
        const firstIndex = hashString.indexOf(idString) + idString.length + 1;
        const lastIndex = hashString.indexOf('&token_type=');
        console.log(hashString.substring(firstIndex, lastIndex));
        localStorage.setItem('id_token', hashString.substring(firstIndex, lastIndex));
    }
    if (!auth.loggedIn()) {
        console.log(nextState, 'nextState', replace, 'replace');
        replace({ pathname: '/login' });
        return false;
    }
    return true;
};

/*// validate authentication for private routes
const requireAuth = (nextState, replace) => {
    if (!auth.loggedIn()) {
        replace({ pathname: '/login' })
    }
};*/

// OnEnter for callback url to parse access_token
const parseAuthHash = (nextState, replace) => {
    if (nextState.location.hash) {
        auth.parseHash(nextState.location.hash)
        replace({ pathname: '/' })
    }
}

const routes = (
    <Route path="/" component={App} auth={auth}>
        <IndexRedirect to="/books" />
        <Route path="books" component={BookList} onEnter={requireAuth}/>
        <Route path='books/new' component={BookNew}/>
        <Route path="books/:id" component={BookShow}/>
        <Route path="books/:id/edit/:review_id" component={BookEdit}/>
        <Route path="books/:id/addReview" component={AddReview}/>
        <Route path="login" component={Login} />
        <Route path="login" onEnter={parseAuthHash} />
    </Route>
);

export default routes;