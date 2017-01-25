import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../actions/index';
import {Button} from 'react-bootstrap'
import AuthService from '../utils/AuthService'
import { Link } from 'react-router';
import moment from 'moment-timezone';
import { StickyContainer, Sticky } from 'react-sticky';

class BooksList extends Component {

  static contextTypes = {
    router: T.object
  };

  static propTypes = {
    auth: T.instanceOf(AuthService)
  };

  constructor(props, context) {
    super(props, context);
    this.props.fetchBooks(); //fetch the data from the postgres server
    this.state = {
      profile: props.auth.getProfile(),
    };
    // listen to profile_updated events to update internal state
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })
  }

  logout(){
    this.props.auth.logout();
    this.context.router.push('/login');
  }

  renderBook(){
    const style = {
      padding: 15+"px",
      margin: 15+"px"
    };
    return this.props.books.map((book) => {
      return(
        <div key={book.id} style={style}>
          <div>
            <div>
              <image src={
              book.bookinfo.items[0].volumeInfo.imageLinks.thumbnail}
                        style={{width: 128+"px",
                          height: 193+"px"}}/>
            </div>
            <Link to={"books/" + book.id}>
              {book.title}
            </Link>
          </div>
          <div>{book.bookinfo.items[0].volumeInfo.authors[0]}</div>
          <div>{moment.tz(book.dateadded, "Zulu").tz("America/Los_Angeles").format().substring(0, 10)} added</div>
        </div>
      );
    })
  }

  render(){
    const { profile } = this.state;
    const{ books } = this.props;
    const navStyle = {
      width: 85+"%",
      height: 4+"rem",
      background: "#fff",
      borderTop: 1 + "px solid #cfcfcf",
      borderBottom: 1 +"px solid #cfcfcf",
      position: "fixed",
      verticalAlign: "middle",
      zIndex: 100
    };


    //this part here is essential, wait until the data is here
    if(!books){
      return <div>Loading...</div>
    }
    return (
      <div>
        <header style={navStyle} className="container">
          <div className="row">
            <h2 style={{marginTop:10+"px"}} className="col">Reading with Annie</h2>
            <div className="col" style={{textAlign: "right"}}>
              <div style={{display: "inline-block"}}>Welcome, {profile.given_name}</div>
              <img className="align-self-start headShot" src={profile.picture}/>
              <div style={{display: "inline-block"}}>
                <Button bsStyle="danger" onClick={this.logout.bind(this)}>Logout</Button>
              </div>
            </div>
          </div>
        </header>
        <div style={{paddingTop: 70+"px"}} >
          <div className="col" style={{textAlign: "center", marginTop: 8+"px"}}>
            <Link to="/books/new" className="btn btn-primary">
              Add a Book
            </Link>
          </div>
          <div className="d-flex align-content-start flex-wrap">
            {this.renderBook()}
          </div>
        </div>
        <footer style={{marginTop:10+"rem"}}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { books: state.books.all };
}

/*function mapDispatchToProps(dispatch) {
 return bindActionCreators({fetchBooks}, dispatch);
 }*/

export default connect(mapStateToProps, { fetchBooks })(BooksList); //es6 which replaced the mapDispatchToProps function, and
//is the shorthand for {fetchBooks: fetchBooks}