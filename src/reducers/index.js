import { combineReducers } from 'redux';
import BooksReducer from './reducer_books';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    books: BooksReducer,
    form: formReducer
});

export default rootReducer;
