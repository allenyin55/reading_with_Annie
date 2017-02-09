const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a Title';
  }

  if (!values.review) {
    errors.review = 'Enter some review';
  }

  return errors;
};

export default validate;
