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

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
    if (!auth.loggedIn()) {
        replace({ pathname: '/login' })
    }
};

const routes = (
    <Route path="/" component={App} auth={auth}>
        <IndexRedirect to="/books" />
        <Route path="books" component={BookList} onEnter={requireAuth}/>
        <Route path='books/new' component={BookNew}/>
        <Route path="books/:id" component={BookShow}/>
        <Route path="books/:id/edit/:review_id" component={BookEdit}/>
        <Route path="books/:id/addReview" component={AddReview}/>
        <Route path="login" component={Login} />
    </Route>
);

export default routes;