import React from 'react';
import { Link } from 'react-router';
import moment from 'moment-timezone';
import ZulutoPST from '../utils/ZulutoPST.js';

const BookDisplay = ({ book, isInList }) => {

 // for the sake that the book that doesn't have bookinfo or volumeinfo
  let NoInfo = false;
  if (book === null || book.bookinfo === null || book.bookinfo.volumeInfo === undefined) {
    NoInfo = true;
  }

  // for the sake that the book doesn't have a cover image
  if (!NoInfo && book.bookinfo.volumeInfo.imageLinks === undefined){
    book.bookinfo.volumeInfo.imageLinks = ""; 
  }


  if (isInList) {
    if (NoInfo) {
      return (
        <Link to={`books/${book.id}`}>
          {book.title}
        </Link>);
    }

    return (
      <div>
        <div>
          <div>
            <img
              src={
              book.bookinfo.volumeInfo.imageLinks.thumbnail}
              alt="No Cover Image Available"
              style={{ width: `${128}px` }}
            />
          </div>
          <div>
            {book.title}
          </div>
        </div>
        {(book.bookinfo.volumeInfo.authors !== undefined)
          ? (<div>{book.bookinfo.volumeInfo.authors[0]}</div>)
          : (<div>No author</div>)}
        <div>{ ZulutoPST(book.dateadded) } added</div>
      </div>
    );
  }

  if (NoInfo) return <div>The book doesn't have book info</div>;

  if (book.bookinfo.volumeInfo.description === undefined) {
    book.bookinfo.volumeInfo.description = 'No Description';
  }

  return (
    <div>
      <h3>{book.title}</h3>
      {(book.bookinfo.volumeInfo.authors !== undefined)
        ? (<div>by {book.bookinfo.volumeInfo.authors[0]}</div>)
        : (<div>No author</div>)}
      <div>
        <div>
          <img
            src={
            book.bookinfo.volumeInfo.imageLinks.thumbnail}
            alt="No Cover Image available"
            style={{ width: `${128}px` }}
          />
        </div>
      </div>
      {(book.bookinfo.volumeInfo.description.length < 400) ? (<p>{book.bookinfo.volumeInfo.description}</p>)
        : (<p>{book.bookinfo.volumeInfo.description.slice(0, 399)}......</p>)}
    </div>
  );
};

export default BookDisplay;