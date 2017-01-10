import axios from 'axios';

export const FETCH_BOOKS = "FETCH_BOOKS";
export const CREATE_BOOK = "CREATE_BOOK";
export const FETCH_A_BOOK = "FETCH_A_BOOK";
export const CREATE_REVIEW = "CREATE_REVIEW";
export const EDIT_BOOK = "EDIT_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";
export const GET_BOOK_INFO = "GET_BOOK_INFO";
const POSTGRES_SERVER_URL = 'https://readingwithannieapi.herokuapp.com/api/books';
const GOOGLE_BOOK_URL = "https://www.googleapis.com/books/v1/volumes?q=";
const GOOGLE_BOOK_API_KEY = "AIzaSyCJN2MfmPezrjAR1Ji02fO-Lwtmp0Umt_c";

export function fetchBooks() {
    const request = axios.get(POSTGRES_SERVER_URL);

    return {
        type: FETCH_BOOKS,
        payload: request
    }
}

export function createBook(props) {
    const request = axios.post(POSTGRES_SERVER_URL, props);

    return{
        type: CREATE_BOOK,
        payload: request
    }
}

export function createReview(props) {
    const request = axios.post(`${POSTGRES_SERVER_URL}/${props.id}/addReview`, props);

    return{
        type: CREATE_REVIEW,
        payload: request
    }
}

export function fetchABook(id) {
    const request = axios.get(`${POSTGRES_SERVER_URL}/${id}`);

    return {
        type: FETCH_A_BOOK,
        payload: request
    }
}

export function editBook(props) {
    const request = axios.put(`${POSTGRES_SERVER_URL}/${props.id}`, props);

    return{
        type: EDIT_BOOK,
        payload: request
    }
}

export function deleteBook(id) {
    const request = axios.delete(`${POSTGRES_SERVER_URL}/${id}`);

    return{
        type: DELETE_BOOK,
        payload: request
    }
}

export function getBookInfo(title) {
    const request = axios.get(`${GOOGLE_BOOK_URL}${title}&key=${GOOGLE_BOOK_API_KEY}`)

    return{
        type: GET_BOOK_INFO,
        payload: request
    }
}

