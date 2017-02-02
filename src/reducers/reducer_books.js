import { FETCH_BOOKS, FETCH_A_BOOK, GET_BOOK_INFO } from '../actions/index';
import {REHYDRATE} from 'redux-persist/constants';
const INITIAL_STATE = { all: [], book: null, bookInfo:null};

export default function (state = INITIAL_STATE, action) {
    switch(action.type){
      case FETCH_BOOKS:
          return { ...state, all: action.payload.data.data };//the extra "data" at the end is because of the format of
                                                              //returning data of postgres
      case FETCH_A_BOOK:
          return { ...state, book: action.payload.data };
      case GET_BOOK_INFO:
          return {...state, bookInfo: action.payload.data};
      case REHYDRATE:
        const incoming = action.payload.books;
        const books = incoming.all;
        const bookInfo = incoming.bookInfo;
        if (incoming) return {...state, books:books, bookInfo: bookInfo};
        return state;
      default:
        return state;
    }
}