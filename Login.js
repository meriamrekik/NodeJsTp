import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { login } from './utils/api';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillMount() {
    let loggedin = localStorage.getItem('logged_in');
    console.log(loggedin);
    if (loggedin == true) window.location.replace('/dashboard');
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


  handleLogin() {

    const email = this.state.email;
    const password = this.state.password;

    login(email, password).then(result => {
      if (result.success == true) {
        localStorage.setItem('logged_in', true);
        localStorage.setItem('userid', result.user._id);
        localStorage.setItem('username', result.user.nom);

        localStorage.setItem('isAdmin', result.isAdmin);
        window.location.replace('/dashboard');
      }
      else {
        alert('Error! Please try again');
      }
    })
  }
  render() {
    return (
      <div>  
                  <div class="form-group">
                     <input type="email" onChange={this.handleEmailChange} name="email"  class="form-control my-input" id="email" placeholder="Email" required/>
                  </div>
                  <div class="form-group">
                     <input type="password" min="8" name="password" id="password" onChange={this.handlePasswordChange} class="form-control my-input" placeholder="Password" required/>
                  </div>
                  <div class="text-center ">
                     <button type="submit" class=" btn btn-primary" onClick={this.handleLogin}>Login</button>
                  </div>

                  Or <a href="/signup">Sign up!</a>

      </div>
    );
  }
}
