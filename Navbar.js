import React, { Component } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    const loggedin = this.props.loggedin;
    return (
      <nav class="navbar">
            <a class="navbar-brand" href="/">EnigmaConf</a>
            
            {
              loggedin ? (<a href="/logout"><button className="btn btn-info">Logout</button></a>) :
              (<a href="/login"><button className="btn btn-info">Login</button></a>)
            }
      </nav>  
    );
  }
}
