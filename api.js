import axios from 'axios';

export function login(email, password) {
  return axios.post('http://localhost:4000/user/login', {
    email: email,
    password: password,
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  }).then(result => {
    return result.data;
  });
}

export function signup(nom, prenom, email, password) {
  return axios.post('http://localhost:4000/user/signup', {
    nom: nom,
    prenom: prenom,
    email: email,
    password: password,
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  }).then(result => {
    return result.data;
  });
}

export function getConferences() {
  return axios.get('http://localhost:4000/conference/getConferences')
  .then(result => {
    return result.data;
  })
}

export function addConf(nom, dateDeb, heureDeb, heureFin){
  return axios.post('http://localhost:4000/conference/conference', {
    nom: nom,
    dateDebut: dateDeb,
    heureDebut: heureDeb,
    heureFin: heureFin
  }).then(results => {
    return results.data;
  })
}

export function confParticipate(userId,id) {
  return axios.post('http://localhost:4000/conference/updateConference', {
    id: id,
    userId: userId
  }).then(result => {
    return result.data;
  })
}