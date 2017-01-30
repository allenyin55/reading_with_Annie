import React from 'react';
import Autosuggest from 'react-autosuggest';
import fetchJsonp from 'fetch-jsonp';
const GOOGLE_BOOK_API_KEY = "AIzaSyCJN2MfmPezrjAR1Ji02fO-Lwtmp0Umt_c";
import Radium from'radium';

class AutoSuggest extends React.Component {

  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      isLoading: false
    };
  };

  getStyles(){
    return{
      input:{
        width: "35%",
        height: "35px ",
        fontSize:"20px",
        borderRadius: "6px",
        borderWidth: "2px"
      },
      suggestionsContainer:{
        width:"34%",
        backgroundColor:"white",
        borderColor: "black",
        borderRadius: "6px",
        borderWidth: "2px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        textAlign: "left",
        position:"absolute",
        zIndex: "100",
      },
      suggestionsList:{
        listStyle:"none",
      },
      suggestionFocused:{
        backgroundColor: "#e2e2e2"
      },
      dropDown:{
        padding: "5px",
        margin: "10px",
      }
    }
  }

  loadSuggestions(value) {
    this.setState({
      isLoading: true
    });

    if (value === '') {
      this.setState({
        isLoading: false,
        suggestions: []
      });
    }

    fetchJsonp(`https://www.googleapis.com/books/v1/volumes?q=${value}}&key=${GOOGLE_BOOK_API_KEY}`)
      .then((response) => response.json())
      .then((json) => {
        let books = [];
        console.log(json);
        json.items.map((aBook) => {
          books.push(
            { title: aBook.volumeInfo.title,
              author: (aBook.volumeInfo.authors !== undefined) ? aBook.volumeInfo.authors[0] : "No author",
              imgUrl: (aBook.volumeInfo.imageLinks !== undefined) ? aBook.volumeInfo.imageLinks.thumbnail : null
            }
          );
        });
        this.setState({
          isLoading: false,
          suggestions: books.slice(0, 3)
        });
      })
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.loadSuggestions(value);
  };


  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  //onChange along with onBlur and onFocus has to be called
  //again here to trigger the corresponding event for redux-form
  //Also, when onChange(autoComplete's onChange, that is) is called,
  // it need to change the value in redux form.
  onChange = (event, { newValue }) => {
    this.props.input.onChange(newValue);
    this.setState({
      value: newValue
    });
  };

  render() {
    const { value, suggestions,isLoading } = this.state;
    const { meta, input, ...props} = this.props;
    const styles = this.getStyles();
    const status = (isLoading ? 'Loading...' : 'Type to load suggestions');
    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      value,
      onChange: this.onChange,
      onFocus: input.onFocus,
      onBlur: input.onBlur,
      ...props
    };

    // When suggestion is clicked, Autosuggest needs to populate the input element
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
    const getSuggestionValue = suggestion => suggestion.title;

// Use your imagination to render suggestions.
    const renderSuggestion = suggestion => (
      <div className="d-flex align-items-center" style={styles.dropDown}>
        <div>
          <img src={suggestion.imgUrl} style={{width:75+"px"}}/>
        </div>
        <div style={{marginLeft: 25+"px"}}>
          <div>
            {(suggestion.title.length < 30) ? (<div> {suggestion.title}</div>) : (<div> {suggestion.title.slice(0, 29)} ...</div>)}
          </div>
          <div>
            by {suggestion.author}
          </div>
        </div>
      </div>
    );

    return(
      <div>
      {/*
      this is used to show loading status,
      might be useful in the future
       <div className="status">
          <strong>Status:</strong> {status}
        </div>*/}
        <Autosuggest
          theme={styles}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        {meta.touched && meta.error &&
        <span className="error err-text">{meta.error}</span>}
      </div>
    );
  }
}

const Component = Radium(AutoSuggest);
export default Component;