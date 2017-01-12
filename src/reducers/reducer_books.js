import { FETCH_BOOKS, FETCH_A_BOOK, GET_BOOK_INFO } from '../actions/index';
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
        default:
            return state;
    }
}