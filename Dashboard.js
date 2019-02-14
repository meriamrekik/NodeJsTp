import React, { Component } from 'react';
import { getConferences } from './utils/api';
import { addConf } from './utils/api';
import { confParticipate } from './utils/api';
import img from './conf.jpeg';

export default class Dashboard extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      username: '',
      nom: '',
      dateDeb: null,
      heureDeb: null,
      heureFin: null,
      conferences: null,
      isAdmin: false,
      userid: null
    }
    this.handleNomChange = this.handleNomChange.bind(this);
    this.handleHeureDebChange = this.handleHeureDebChange.bind(this);
    this.handleDateDebChange = this.handleDateDebChange.bind(this);
    this.handleFinChange = this.handleFinChange.bind(this);
    this.handleAddConf = this.handleAddConf.bind(this);
  }
  componentDidMount(){
    let isAdmin = localStorage.getItem('isAdmin');
    let user = localStorage.getItem('userid');
    let username = localStorage.getItem('username');
    if (username) this.setState({ username: username})
    this.setState({ userid: user});
    if (isAdmin) this.setState({isAdmin: isAdmin});
    getConferences().then(data => {
      this.setState({
        conferences: data.conferences
      });
    });
  }

  handleNomChange(e){
    this.setState({
      nom: e.target.value,
    })
  }


  handleHeureDebChange(e){
    this.setState({
      heureDeb: e.target.value,
    })
  }


  handleDateDebChange(e){
    this.setState({
      dateDeb: e.target.value,
    })
  }


  handleFinChange(e){
    this.setState({
      heureFin: e.target.value,
    })
  }


  participate(confId){
       confParticipate(this.state.userid, confId)
       .then(result =>{
         console.log(result);
       })
    }


  handleAddConf(){
    addConf(this.state.nom, this.state.dateDeb, this.state.heureDeb, this.state.heureFin)
    .then(result => {
      if (result.success == true) {
         window.location.reload();
      }
      else {
        alert('Error!!');
      }
    })
  }

   render() {
    const conferences = this.state.conferences;
    return (
      <div className='container'>
      Bienvenue, {this.state.username}
      {this.state.isAdmin && 
        <div> 
      <div class="form-group">
                     <input type="text" name="nom"  class="form-control my-input" id="nom" onChange={this.handleNomChange} placeholder="Nom de la conference" required/>
                     <input type="date" name="nom"  class="form-control my-input" id="nom" onChange={this.handleDateDebChange} placeholder="Date Début" required/>
                     <input type="time" name="nom"  class="form-control my-input" id="nom" onChange={this.handleHeureDebChange} placeholder="Heure Début" required/>
                     <input type="time" name="nom"  class="form-control my-input" id="nom" onChange={this.handleFinChange} placeholder="Heure fin" required/>
                      <div class="text-center ">
                     <button type="submit" class=" btn btn-primary" onClick={this.handleAddConf}>Ajouter une conférence</button>
                      </div>
      </div>
      </div>
    }


      Conferences
        <div className="row">
          { conferences && conferences.map(conference => {
            return(<div className="col-md-6">
                    <div class="card">
                    <img class="card-img-top" src={img} alt="Card image cap" />
                    <div class="card-body">
                      <h5 class="card-title">{ conference.nom }</h5>
                      <p class="card-text"><b>Date:</b> { conference.dateDebut}</p>
                      <p class="card-text"><b>Heure Début:</b> { conference.heureDebut}</p>
                      <p class="card-text"><b>Heure Fin:</b> { conference.heureFin}</p>
                      <a href="#" class="btn btn-primary" onClick={this.participate(conference._id)}>Participer</a>
                    </div>
                    </div>
            </div>);
          })}
          
        </div>
      </div>
    );
  }
}
