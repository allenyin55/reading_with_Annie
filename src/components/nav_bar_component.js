import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';

const NavBar = ({profile, logOut}) =>{

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

  if (window.location.pathname === "/login") return <div></div>;

  return(
    <header style={navStyle} className="container">
      <div className="row">
        <h2 style={{marginTop:10+"px"}} className="col">Reading with Annie</h2>
        <div className="col" style={{textAlign: "right"}}>
          <div style={{display: "inline-block"}}>Welcome, {profile.given_name}</div>
          <Link to="/profile">
            <img className="align-self-start headShot" src={profile.picture}/>
          </Link>
          <div style={{display: "inline-block"}}>
            <Button bsStyle="danger" onClick={logOut}>Logout</Button>
          </div>
        </div>
      </div>
    </header>
  )
};

export default NavBar;