const mongoose = require('mongoose');


const ConferenceSchema = mongoose.Schema({
    nom: String,
    dateDebut: [String],
    heureDebut: String,
    heureFin: String,
    particiapnts:[{
        id: String,
        temps: Number
    }],
    questions: [String]
});
const  Conference = module.exports = mongoose.model(' Conference',  ConferenceSchema );

module.exports.getAllConferences = (callback) => {
    Conference.find(callback);
}