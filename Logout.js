import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export default class Logout extends Component {
  componentDidMount(){
    localStorage.setItem("logged_in", false);
    localStorage.removeItem('userid');
    localStorage.removeItem('username');

    window.location.replace('/login');
  }
  render() {
    return (
        <Redirect to="/"/>
      );
  }
}
