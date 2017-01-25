import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchABook, deleteBook, deleteReview} from '../actions/index';
import { Link } from 'react-router';
import AuthService from '../utils/AuthService';
//import ReviewItem from './review_item'; deprecated
import moment from 'moment-timezone';

class BookShow extends Component{

    static contextTypes = {
        router: PropTypes.object
    };

    static propTypes = {
        auth: PropTypes.instanceOf(AuthService)
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            profile: props.auth.getProfile(),
        };
        // listen to profile_updated events to update internal state
        props.auth.on('profile_updated', (newProfile) => {
            this.setState({profile: newProfile})
        })
    }

    componentWillMount(){
        this.props.fetchABook(this.props.params.id);
    }

    onDeleteBookClick(){
        if(confirm('Are you sure you want delete the whole book?')) {
            this.props.deleteBook(this.props.params.id)
            .then(() => {this.context.router.push('/');});
        }
    }

    onDeleteReviewClick(review_id){
       const book = {
           book_id: this.props.params.id,
           review_id: review_id
       };
        if(confirm('Are you sure you want to delete this review?')) {
            this.props.deleteReview(book)
                .then(() => {window.location.reload()});
        }
    }

    renderReview() {
        const {reviews} = this.props.bookObject;
        const {profile} = this.state;
        return reviews.map((review) => {
            const uniqueKey = review.review_id; // a unique key for the li elements
            const PSTTime =moment.tz(review.dateedited, "Zulu").tz("America/Los_Angeles").format();
            const reviewer = JSON.parse(review.reviewer);
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
                            <div className="p-2" id="delete_review" onClick={this.onDeleteReviewClick.bind(this, uniqueKey)}>
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
        })
    }

    render(){

        if(!this.props.bookObject){
            return <div>Loading...</div>
        }

        const { book } = this.props.bookObject;

        if(this.props.bookObject.reviews.length==0){
            return(
                <div className="d-flex justify-content-between">
                    <Link to="/">
                        <button className="btn btn-primary">
                            Back to Index
                        </button>
                    </Link>
                    <h2 className="">There is no reivews for {book.title}</h2>
                    <Link to={location.pathname+"/addReview"}>
                        <button className="btn btn-primary">
                            Add a new Review
                        </button>
                    </Link>
                </div>
                )
        }


        return (
            <div>
                <div className="d-flex justify-content-between">
                    <div>
                        <Link to="/">
                            <button className="btn btn-primary">
                                Back to Index
                            </button>
                        </Link>
                        <h3>{book.title}</h3>
                    </div>
                    <div className="d-flex flex-column">
                        <button
                            className="btn btn-danger"
                            onClick={this.onDeleteBookClick.bind(this)}>
                            Delete Book
                        </button>
                        <Link to={location.pathname+"/addReview"}>
                            <button className="btn btn-primary">
                                Add a new Review
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="list-group">
                    { this.renderReview()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {bookObject: state.books.book};
}

export default connect(mapStateToProps, { fetchABook, deleteBook, deleteReview})(BookShow);