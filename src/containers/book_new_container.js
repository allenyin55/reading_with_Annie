import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { createBook, getBookInfo } from '../actions/index';
import { Link } from 'react-router';
import AutoSuggest from './auto_suggest';
import Textarea from 'react-textarea-autosize';

const renderInput = field =>
  <div>
    <Textarea  minRows={6}
               maxRows={9}
               placeholder="Type your review here"
               {...field.input}
               type={field.type}/>
    {field.meta.touched &&
    field.meta.error &&
    <div className="error err-text">{field.meta.error}</div>}
  </div>;

class BooksNew extends Component{

    //like props, don't abuse it. Only use it with router
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props){
        const { profile } = this.props;
        props.reviewer = profile;
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
      const { handleSubmit } = this.props;

      return(
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h3>Create a New Book</h3>
          <div className="form-group">
            <label>Title</label>
            <Field name="title" component={AutoSuggest}
                   placeholder="Search for a book"/>
          </div>
          <div className="form-group">
            <label>review</label>
            <Field name="review" component={renderInput} type="text"/>
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

export default connect(mapStateToProps, { createBook, getBookInfo}) (reduxForm({
    form: 'BooksNewForm',
    validate
})(BooksNew))