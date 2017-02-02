import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import { getUserBooks, fetchABook } from '../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Profile extends React.Component{

  constructor(props){
    super(props);
    this.props.getUserBooks({profile_id: this.props.profile.identities[0].user_id})
  }

  renderBooks(books){
    if(books.length === 0) return (
      <div>
        You haven't started any reading journey yet!
      </div>
    );

    return books.map((book) =>{
      console.log(book)
      return(
        <li key={book.id}>
          {book.title}
        </li>
      )
    })
  }

  render(){
    const { profile } = this.props;
    const { user_reading_info } = this.props;

    if ( user_reading_info === undefined){
      return(
        <div>
          Loading...
        </div>
      )
    }

    const user_stats = user_reading_info[0];
    const books = user_reading_info[1];

    return(
      <div>
        <Row>
          <Link to="/" className="btn btn-danger">Back</Link>
        </Row>
        <Row>
          <Col md={2} mdOffset={4}>
            <Image src={profile.picture} circle/>
          </Col>
          <Col md={6}>
            <h3>Profile</h3>
            <p><strong>Name: </strong> {profile.name}</p>
            <p><strong>Email: </strong> {profile.email}</p>
            <p><strong>Nickname: </strong> {profile.nickname}</p>
            <p><strong>Created At: </strong> {profile.created_at}</p>
            <p><strong>Updated At: </strong> {profile.updated_at}</p>
          </Col>
          <Col>
            <ul>
              {this.renderBooks(books)}
            </ul>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user_reading_info: state.profile.userBooks.user_reading_info
  };
}

export default connect(mapStateToProps,{ getUserBooks, fetchABook })(Profile)