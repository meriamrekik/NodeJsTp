import React, { Component } from 'react';
import Navbar from './Navbar';
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';
import './App.css';
import Logout from './Logout';
import {BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Dashboard from './Dashboard';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      loggedin: false
    }
  }

  componentDidMount() {
   
  let loggedin = localStorage.getItem('logged_in') === "true" ?
    true : false;

  console.log(loggedin);
   this.setState({
      loggedin: loggedin
   });
  }
  render() {
    return (
      <Router>
      <div className="App">
         
          <Navbar loggedin={this.state.loggedin} />
          
          <div className="main-content">
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/logout" component={Logout} />
              <Route path="/dashboard" component={Dashboard} />
              
              { this.state.loggedin &&
                <Redirect to="/dashboard"/>
              }
          </div>
      </div>

          </Router>
    );
  }
}

export default App;
