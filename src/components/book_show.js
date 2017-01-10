import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchABook, deleteBook} from '../actions/index';
import { Link } from 'react-router';
import AuthService from '../utils/AuthService';
import ReviewItem from './review_item';

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

    onDeleteClick(){
        this.props.deleteBook(this.props.params.id)
            .then(() => {this.context.router.push('/');});
    }

    renderReview() {
        const {reviews} = this.props.bookObject;
        return reviews.map((review) => {
            const uniqueKey = review.review_id; // a unique key for the li elements
            return (
                <div key={uniqueKey}>
                    <ReviewItem review={review} profile={this.state.profile}/>
                </div>
            );
        })
    }

    render(){

        if(!this.props.bookObject){
            return <div>Loading...</div>
        }

        const { book } = this.props.bookObject;

        return (
            <div>
                <div className="d-flex justify-content-between">
                    <div>
                        <Link to="/">
                            <button className="btn btn-primary">
                                Back to Index
                            </button>
                        </Link>
                        <h3>{book[0].title}</h3>
                    </div>
                    <div className="d-flex flex-column">
                        <button
                            className="btn btn-danger"
                            onClick={this.onDeleteClick.bind(this)}>
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

export default connect(mapStateToProps, { fetchABook, deleteBook})(BookShow);