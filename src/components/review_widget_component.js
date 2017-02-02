import React from 'react';
import moment from 'moment-timezone';
import { Link } from 'react-router';

const ReviewWidget = ({ review, reviewer, profile,uniqueKey, onDeleteReview}) =>{

  const PSTTime =moment.tz(review.dateedited, "Zulu").tz("America/Los_Angeles").format();

  if (reviewer.name === profile.name) {
    return (
      <div className="list-group-item list-group-item-action flex-column align-items-start"
           key={uniqueKey}>
        <div className="d-flex w-100 justify-content-start">
          <img className="p-2 align-self-start headShot" src={reviewer.picture}/>
          <div className="p-2">
            <h5 className="mb-1">{reviewer.name}'s review</h5>
            <p className="mb-1">{review.review}</p>
            <small>edited on {PSTTime.substring(0, 10)}</small>
          </div>
          <Link className="ml-auto p-2" to={location.pathname + "/edit/" + uniqueKey}>
            Edit Review
          </Link>
          <div className="p-2" id="delete_review" onClick={onDeleteReview}>
            Delete
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="list-group-item list-group-item-action flex-column align-items-start"
           key={uniqueKey}>
        <div className="d-flex w-100 justify-content-start">
          <img className="align-self-start headShot" src={reviewer.picture}/>
          <div className="p-2">
            <h5 className="mb-1">{reviewer.name}'s review</h5>
            <p className="mb-1">{review.review}</p>
            <small>edited on {PSTTime.substring(0, 10)}</small>
          </div>
        </div>
      </div>
    );
  }
};

export default ReviewWidget;