import axios from 'axios';

export const FETCH_BOOKS = 'FETCH_BOOKS';
export const CREATE_BOOK = 'CREATE_BOOK';
export const FETCH_A_BOOK = 'FETCH_A_BOOK';
export const CREATE_REVIEW = 'CREATE_REVIEW';
export const EDIT_BOOK = 'EDIT_BOOK';
export const DELETE_REVIEW = 'DELETE_REVIEW';
export const DELETE_BOOK = 'DELETE_BOOK';
export const GET_GUESSED_BOOK_INFO = 'GET_GUESSED_BOOK_INFO';
export const GET_BOOK_INFO = 'GET_BOOK_INFO';
export const CREATE_JOURNEY = 'CREATE_JOURNEY';
export const GET_USER_BOOKS = 'GET_USER_BOOKS';
export const SELECT_BOOK = "SELECT_BOOK";
export const UPDATE_JOURNEY = "UPDATE_JOUNEY";
// for production const POSTGRES_SERVER_URL = 'https://readingwithannieapi.herokuapp.com/api/books';
const POSTGRES_SERVER_URL = 'https://readingwithannieapi.herokuapp.com/api/books';
const POSTGRES_SERVER_URL_JOURNEY = 'https://readingwithannieapi.herokuapp.com/api/journey';
const POSTGRES_SERVER_URL_PROFILE = 'https://readingwithannieapi.herokuapp.com/api/profile';
const GOOGLE_BOOK_URL = 'https://www.googleapis.com/books/v1/volumes/';
const GOOGLE_SEARCH_BOOKS_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
const GOOGLE_BOOK_API_KEY = 'AIzaSyCJN2MfmPezrjAR1Ji02fO-Lwtmp0Umt_c';


export function fetchBooks() {
  const request = axios.get(POSTGRES_SERVER_URL);

  return {
    type: FETCH_BOOKS,
    payload: request,
  };
}

export function createBook(props) {
  const request = axios.post(POSTGRES_SERVER_URL, props);

  return {
    type: CREATE_BOOK,
    payload: request,
  };
}

export function createReview(props) {
  const request = axios.post(`${POSTGRES_SERVER_URL}/${props.id}/addReview`, props);

  return {
    type: CREATE_REVIEW,
    payload: request,
  };
}

export function fetchABook(id) {
  const request = axios.get(`${POSTGRES_SERVER_URL}/${id}`);

  return {
    type: FETCH_A_BOOK,
    payload: request,
  };
}

export function editBook(props) {
  const request = axios.put(`${POSTGRES_SERVER_URL}/${props.id}`, props);

  return {
    type: EDIT_BOOK,
    payload: request,
  };
}

export function deleteReview(book) {
  const request = axios.post(`${POSTGRES_SERVER_URL}/${book.book_id}/deleteReview`, book);

  return {
    type: DELETE_REVIEW,
    payload: request,
  };
}

export function deleteBook(id) {
  const request = axios.delete(`${POSTGRES_SERVER_URL}/${id}`);

  return {
    type: DELETE_BOOK,
    payload: request,
  };
}

export function getBookInfo(selectedId) {
  const request = axios.get(`${GOOGLE_BOOK_URL}${selectedId}`);

  return {
    type: GET_BOOK_INFO,
    payload: request,
  };
}

export function getGuessedBookInfo(title) {
  const request = axios.get(`${GOOGLE_SEARCH_BOOKS_URL}${title}&key=${GOOGLE_BOOK_API_KEY}`);

  return {
    type: GET_GUESSED_BOOK_INFO,
    payload: request,
  };
}

export function createJourney(props) {
  const request = axios.post(POSTGRES_SERVER_URL_JOURNEY, props);

  return {
    type: CREATE_JOURNEY,
    payload: request,
  };
}

export function getUserBooks(props) {
  const request = axios.post(POSTGRES_SERVER_URL_PROFILE, props);

  return {
    type: GET_USER_BOOKS,
    payload: request,
  };
}

export function selectBook(book){
  return{
    type: SELECT_BOOK,
    payload: book
  };
}

export function updateJourney(props){
  const request = axios.post(`${POSTGRES_SERVER_URL_JOURNEY}/${props.book_id}&${props.profile_id}`, props);

  return{
    type: UPDATE_JOURNEY,
    payload: request
  }
}
