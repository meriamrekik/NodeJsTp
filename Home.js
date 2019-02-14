import React, { Component } from 'react';

export default class Home extends Component {

  componentWillMount() {
    let loggedin = localStorage.getItem('logged_in');

    if (loggedin === true) window.location.replace('/dashboard');
  }

  render() {
    return (
      <div className='container'>
        <h1>Bienvenue à EnigmaConf</h1>
        Veuillez se connecter

      </div>
    );
  }
}
