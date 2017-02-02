import React from 'react';
import { Link } from 'react-router';
import moment from 'moment-timezone';

const BookDisplay = ({book, isInList}) => {

  if(isInList){
    // for teh sake of the book that doesn't have bookinfo or volumeinfo
    if(book.bookinfo === null || book.bookinfo.volumeInfo === undefined) return  <Link to={"books/" + book.id}>
      {book.title}
    </Link>;
    
    return(
      <div>
        <div>
          <div>
            <img src={
              book.bookinfo.volumeInfo.imageLinks.thumbnail}
                   style={{width: 128+"px"}}/>
          </div>
          <Link to={"books/" + book.id}>
            {book.title}
          </Link>
        </div>
        {(book.bookinfo.volumeInfo.authors !== undefined)
          ? (<div>{book.bookinfo.volumeInfo.authors[0]}</div>)
          : (<div>No author</div>)}
        <div>{moment.tz(book.dateadded, "Zulu").tz("America/Los_Angeles").format().substring(0, 10)} added</div>
      </div>
    )
  }


  // for teh sake of the book that doesn't have bookinfo or volumeinfo
  if(book.bookinfo === null || book.bookinfo.volumeInfo === undefined) return  <div>The book doesn't have book info</div>

  if (book.bookinfo.volumeInfo.description === undefined ){
    book.bookinfo.volumeInfo.description = "No Description";
  }
  return(
    <div>
      {(book.bookinfo.volumeInfo.authors !== undefined)
        ? (<div>by {book.bookinfo.volumeInfo.authors[0]}</div>)
        : (<div>No author</div>)}
      <div>
        <div>
          <img src={
            book.bookinfo.volumeInfo.imageLinks.thumbnail}
                 style={{width: 128+"px"}}/>
        </div>
      </div>
      {(book.bookinfo.volumeInfo.description.length<400) ? (<p>{book.bookinfo.volumeInfo.description}</p>)
        :(<p>{book.bookinfo.volumeInfo.description.slice(0,399)} ......</p>)}
    </div>
  )
};

export default BookDisplay;