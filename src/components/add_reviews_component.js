import React from 'react';
import { Field } from 'redux-form';
import Textarea from 'react-textarea-autosize';

const renderInput = field => {
	const { input, meta } = field;
	 
	return(
		<div>
			<Textarea 
				minRows={6}
				maxRows={9}
				placeholder="Enter some reivews"
				onFocus={input.onFocus}
				onBlur={input.onBlur}
			/>
			{meta.touched && meta.error &&
    	<span className="error err-text" style={{display:"block"}}>{meta.error}</span>}
		</div>
	)
}

const AddReviews =() => {

  return(
    <div>
      <div className="form-group">
        <Field name="review" component={renderInput} type="text"/>
      </div>
    </div>
  )
}

export default AddReviews;