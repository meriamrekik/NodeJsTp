import React, { Component } from 'react';
import {signup} from './utils/api';
import {Redirect} from 'react-router-dom';

export default class SignUp extends Component {

    constructor(props) {
    super(props);

    this.state = {
      nom: '',
      prenom: '',
      email: '',
      password: ''
    }

    this.handleNomChange = this.handleNomChange.bind(this);
    this.handlePrenomChange = this.handlePrenomChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  componentWillMount() {
    let loggedin = localStorage.getItem('logged_in');

    if (loggedin == true) window.location.replace('/dashboard');
  }

  handleNomChange(e) {
    this.setState({
      nom: e.target.value
    })
  }
  handlePrenomChange(e) {
    this.setState({
      prenom: e.target.value
    })
  }
  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSignup() {
    const nom = this.state.nom;
    const prenom = this.state.prenom;
    const email = this.state.email;
    const password = this.state.password;

    signup(nom, prenom, email, password).then(result => {
      if (result.success) {
        localStorage.setItem('logged_in', true);
        localStorage.setItem('userid', result.user._id);
        localStorage.setItem('username', result.user.nom);

        window.location.replace('/dashboard');
      }
      else {
        alert('Something is wrong!');
      }
    })
  }

  render() {
    return (
      <div>  
                  <div class="form-group">
                     <input type="text" name="nom"  class="form-control my-input" id="nom" onChange={this.handleNomChange} placeholder="Nom" required/>
                  </div>
                  <div class="form-group">
                     <input type="text" name="prenom"  class="form-control my-input" id="prenom" onChange={this.handlePrenomChange} placeholder="Prénom" required/>
                  </div>
                  <div class="form-group">
                     <input type="email" name="email"  class="form-control my-input" id="email" onChange={this.handleEmailChange} placeholder="Email" required/>
                  </div>
                  <div class="form-group">
                     <input type="password" min="8" name="password" id="password"  class="form-control my-input" onChange={this.handlePasswordChange} placeholder="Password" required/>
                  </div>
                  <div class="text-center ">
                     <button type="submit" class=" btn btn-primary" onClick={this.handleSignup}>Create Your Free Account</button>
                  </div>

                  Or <a href="/login">Login</a>
      </div>
    );
  }
}
