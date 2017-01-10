import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../actions/index';
import {Button} from 'react-bootstrap'
import AuthService from '../utils/AuthService'
import { Link } from 'react-router';
import moment from 'moment-timezone';

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
        return this.props.books.map((book) => {
            return(
                <tr key={book.id}>
                    <td><image src={book.bookinfo.items[0].volumeInfo.imageLinks.thumbnail}></image></td>
                     <td>
                         <Link to={"books/" + book.id}>
                             {book.title}
                         </Link>
                     </td>
                    <td>{book.bookinfo.items[0].volumeInfo.authors[0]}</td>
                    <td>{moment.tz(book.dateadded, "Zulu").tz("America/Los_Angeles").format().substring(0, 10)}</td>
                </tr>
            );
        })
    }

    render(){
        const { profile } = this.state;
        const{ books } = this.props;

        //this part here is essential, wait until the data is here
        if(!books){
            return <div>Loading...</div>
        }
        return (
            <div>
                <div className="text-xl-center">
                    <h2>Reading with Annie</h2>
                    <p>Welcome {profile.given_name}!</p>
                    <Button bsStyle="danger" onClick={this.logout.bind(this)}>Logout</Button>
                </div>
                <div className="text-xl-right">
                    <Link to="/books/new" className="btn btn-primary">
                        Add a Book
                    </Link>
                </div>
                <h3>Books</h3>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date Added</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderBook()}
                    </tbody>
                </table>
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