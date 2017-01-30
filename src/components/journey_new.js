import React from "react";
import { reduxForm, Field } from 'redux-form';
import { createJourney, getBookInfo } from '../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AutoSuggest from './auto_suggest';

class JourneyNew extends React.Component{

  //like props, don't abuse it. Only use it with router
  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedStatus: "1",
      selectedFeeling: "1"
    };
  }

  handleStatusChange(changeEvent) {
    this.setState({
      selectedStatus: changeEvent.target.value
    });
  }

  handleFeelingChange(changeEvent){
    this.setState({
      selectedFeeling: changeEvent.target.value
    })
  }

  onSubmit(props){
    props.dateAdded = new Date().toUTCString();
    props.startingDate = new Date().toUTCString();
    props.initial_feeling = this.state.selectedFeeling;
    props.final_feeling = '0';  //this means it's unset. It's string because we have parseInt() in the backend
    props.reading_status = this.state.selectedStatus;
    props.profile_id = this.props.profile.identities[0].user_id;
    this.props.getBookInfo(props.title)
      .then(()=>{
        props.bookInfo = this.props.bookInfo;
        this.props.createJourney(props)
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
       <h3>Start a new Journey</h3>
       <div>
         <label>Title</label>
         <Field name="title" component={AutoSuggest}
                placeholder="Search for a book"/>
       </div>
       <div className="form-group">
         <label>Excitement level</label>
         <div className="radio">
           <label>
             <input type="radio" value={1}
                    checked={this.state.selectedFeeling === "1" }
                    onChange={this.handleFeelingChange.bind(this)} />
             Starting
           </label>
         </div>
         <div className="radio">
           <label>
             <input type="radio" value={2}
                    checked={this.state.selectedFeeling === "2" }
                    onChange={this.handleFeelingChange.bind(this)} />
             Having fun
           </label>
         </div>
         <div className="radio">
           <label>
             <input type="radio" value={3}
                    checked={this.state.selectedFeeling === "3"}
                    onChange={this.handleFeelingChange.bind(this)} />
             Giving up
           </label>
         </div>
         <div className="radio">
           <label>
             <input type="radio" value={4}
                    checked={this.state.selectedFeeling === "4"}
                    onChange={this.handleFeelingChange.bind(this)} />
             Finishing
           </label>
         </div>
       </div>
       <div className="from-group">
         Reading Status
         <div className="radio">
           <label>
             <input type="radio" value={1}
                    checked={this.state.selectedStatus === "1" }
                    onChange={this.handleStatusChange.bind(this)} />
             Starting
           </label>
         </div>
         <div className="radio">
           <label>
             <input type="radio" value={2}
                    checked={this.state.selectedStatus === "2" }
                    onChange={this.handleStatusChange.bind(this)} />
             Having fun
           </label>
         </div>
         <div className="radio">
           <label>
             <input type="radio" value={3}
                    checked={this.state.selectedStatus === "3"}
                    onChange={this.handleStatusChange.bind(this)} />
             Giving up
           </label>
         </div>
         <div className="radio">
           <label>
             <input type="radio" value={4}
                    checked={this.state.selectedStatus === "4"}
                    onChange={this.handleStatusChange.bind(this)} />
             Finishing
           </label>
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

  return errors;
}

function mapStateToProps(state) {
  return {bookInfo: state.books.bookInfo}
}


export default connect(mapStateToProps, { createJourney, getBookInfo}) (reduxForm({
  form: 'JourneyNewForm',
  validate
})(JourneyNew))