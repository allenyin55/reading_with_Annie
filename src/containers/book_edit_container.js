import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { editBook } from '../actions/index';
import { Link } from 'react-router';

class BookEdit extends Component{

    //like props, don't abuse it. Only use it with router
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props){
        props.reviewer = this.props.profile;
        props.review_id = location.pathname.split('/').pop();
        props.dateEdited = new Date().toUTCString();
        this.props.editBook(props)
            .then(()=>{
                //blog Book has been created, navigate the user to the index
                this.context.router.push("/books/"+this.props.bookObject.book.id);
            });
    }

    render(){

        const { fields:{review}, handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Edit your review</h3>
                <div className={`form-group ${review.touched && review.invalid ? 'has-danger' : ''}`}>
                    <label>review</label>
                    <textarea className="form-control" { ...review }/>
                    <div className="text-help">
                        {review.touched ? review.error : ''}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to={`/books/${this.props.bookObject.book.id}`} className="btn btn-danger">Cancel</Link>
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
}, mapStateToProps, { editBook})(BookEdit);