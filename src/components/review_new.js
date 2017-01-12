import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createReview } from '../actions/index';
import { Link } from 'react-router';
import AuthService from '../utils/AuthService'

class AddReview extends Component{

    //like props, don't abuse it. Only use it with router
    static contextTypes = {
        router: PropTypes.object
    };

    static propTypes = {
        auth: PropTypes.instanceOf(AuthService)
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            profile: props.auth.getProfile()
        };
        // listen to profile_updated events to update internal state
        props.auth.on('profile_updated', (newProfile) => {
            this.setState({profile: newProfile})
        })
    }

    onSubmit(props){
        const { profile } = this.state;
        props.reviewer = profile;
        props.dateEdited = new Date().toUTCString();
        props.id = this.props.params.id;
        this.props.createReview(props)
            .then(()=>{
                //blog Book has been created, navigate the user to the index
                this.context.router.push("/books/"+props.id);
            });
    }

    render(){

        const { fields:{review}, handleSubmit } = this.props;

        if(!this.props.bookObject){ // try to figure out why do I need this and how does data flow!!
            return <div>Loading...</div>
        }

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Add a review on {this.props.bookObject.book.title}</h3>
                <div className={`form-group ${review.touched && review.invalid ? 'has-danger' : ''}`}>
                    <label>review</label>
                    <textarea className="form-control" { ...review }/>
                    <div className="text-help">
                        {review.touched ? review.error : ''}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if(!values.review){
        errors.review = 'Enter some review';
    }

    return errors;
}

//recuxForm has the same behavior as "connect"
//connect: first argument is mapStateToProps, second argument is mapDispatchToProps
//reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

function mapStateToProps(state) {
    return {
        bookObject: state.books.book
    }
}

export default reduxForm({
    form: 'BooksNewForm',
    fields: ['review'],
    validate
}, mapStateToProps, { createReview })(AddReview);