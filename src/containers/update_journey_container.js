import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { updateJourney } from '../actions/index.js';
import BookShelfItem from '../components/bookshelf_item_component.js';
import Select from 'react-select';
import CSSModules from 'react-css-modules';
import styles from './container.scss';
import 'react-select/dist/react-select.css';

class UpdateJourney extends React.Component{

	  //like props, don't abuse it. Only use it with router
    static contextTypes = {
        router: PropTypes.object
    };

	constructor(props) {
    super(props);
    
    this.state={
    	reading_status: 0 
    }

  }

	onChange(val){
		this.setState({
			reading_status: val.value
		})
	}

	onSubmit(props){
		props.reading_status = this.state.reading_status;
		console.log(this.props.book)
		props.book_id = this.props.params.id;
		props.profile_id = this.props.book.user_stats.profile_id;
		this.props.updateJourney(props)
		.then(() => {
			this.context.router.push("/profile");
		})
	}

	render(){

		const { handleSubmit } = this.props;
		//options for reading status
		const  options = [
    { value: 0, label: 'reading' },
    { value: 1, label: 'save for later' },
    { value: 2, label: 'give up' },
    { value: 3, label: 'finish' }
    ];

		return(
			<div styleName="app_container">
				<BookShelfItem styleName="same_line" book={this.props.book} />	
				<form styleName="same_line" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Select
								    name="reading_status"
								    value={this.state.reading_status}
								    options={options}
								    clearable={false}
								    onChange={this.onChange.bind(this)}
								/>
          <button type="submit" className="btn btn-primary" styleName="btn">Save</button>
          <Link to="/profile" className="btn btn-danger" styleName="btn">Cancel</Link>
        </form>
			</div>

			)
	}
}

function mapStateToProps(state) {

	if (state.books.bookSelected === null){
		return{
			book: null
		}
	}
  return {
    book: state.books.bookSelected
  };
}


const UpdateJourneyWithCSS = CSSModules(UpdateJourney, styles)
export default connect(mapStateToProps, { updateJourney }) (reduxForm({
    form: 'UpdateJourneyForm'
})(UpdateJourneyWithCSS));