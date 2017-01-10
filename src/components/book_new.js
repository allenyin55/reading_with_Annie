import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createBook, getBookInfo } from '../actions/index';
import { Link } from 'react-router';
import AuthService from '../utils/AuthService'

class BooksNew extends Component{

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
        props.reviewer = profile.name;
        props.dateAdded = new Date().toUTCString();
        props.dateEdited = new Date().toUTCString();
        this.props.getBookInfo(props.title)
            .then(()=>{
                props.bookInfo = this.props.bookInfo;
                this.props.createBook(props)
                    .then(()=>{
                        //blog Book has been created, navigate the user to the index
                        this.context.router.push('/');
                    })
            });
    }

    render(){
        const { fields:{title, review}, handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create a New Book</h3>
                <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
                    <label>Title</label>
                    <input type="text" className="form-control" { ...title }/>
                    <div className="text-help">
                        {title.touched ? title.error : ''}
                    </div>
                </div>
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

    if(!values.title){
        errors.title = 'Enter a Title';
    }

    if(!values.review){
        errors.review = 'Enter some review';
    }

    return errors;
}

//recuxForm has the same behavior as "connect"
//connect: first argument is mapStateToProps, second argument is mapDispatchToProps
//reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

function mapStateToProps(state) {
    return {bookInfo: state.books.bookInfo}
}

export default reduxForm({
    form: 'BooksNewForm',
    fields: ['title', 'review'],
    validate
}, mapStateToProps, { createBook, getBookInfo})(BooksNew);