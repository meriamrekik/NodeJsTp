//Require mongoose package
const mongoose = require('mongoose');

//Define BucketlistSchema with title, description and category
const UserSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: String,
    email: String,
    conferences: [String],
    password: String,
    isAdmin: Boolean
});
const  User = module.exports = mongoose.model(' User',  UserSchema );


