import React, { Component } from 'react';
import img from './conf.jpeg';
export class Conference extends Component {
  render() {
    let conf = this.state.conf;
    return (
      <div className='container'>
        <h3>{conf.nom}</h3>
        <img src={img} />
        
      </div>
    );
  }
}
