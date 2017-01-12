//This component is not working correctly when connect
//to the parent component, therefore deprecated


import React from 'react';
import moment from 'moment-timezone';
import { Link } from 'react-router';

export default class ReviewItem extends React.Component{
    render() {
        const {profile} = this.props;
        const {review} = this.props;
        const uniqueKey = review.review_id; // a unique key for the li elements
        const PSTTime =moment.tz(review.dateedited, "Zulu").tz("America/Los_Angeles").format();
        //if the reviewer mat;ches the user name,
        //authorize them to edit their review
        console.log("reviewer: ", review.reviewer);
        console.log("profile: ", profile)
        if (review.reviewer === profile.name) {
            return (
               <div className="list-group-item list-group-item-action flex-column align-items-start">
                   <div className="d-flex w-100 justify-content-start">
                       <img className="rounded p-2 align-self-start" src={profile.picture}/>
                       <div className="p-2">
                           <h5 className="mb-1">{review.reviewer}'s review</h5>
                           <p className="mb-1">{review.review}</p>
                           <small>edited on {PSTTime.substring(0, 10)}</small>
                       </div>
                       <Link className="ml-auto p-2" to={location.pathname + "/edit/"+uniqueKey}>Edit Review</Link>
                   </div>
               </div>
            );
        }
        else {
            return (
                <div>
                    <p>{review.review}</p>
                    <h5>reviewed by {review.reviewer}</h5>
                    <h6>{PSTTime.substring(0, 10)}</h6>
                </div>
            );
        }
    }
}