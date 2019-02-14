//Require the express package and use express.Router()

const express = require('express');
const router = express.Router();

const Conference = require('../models/conference');
const User = require('../models/user');
router.post('/conference', (req, res) => {
    Conference.create((req.body), (err, conference) => {
        if (err) {
            res.json({ success: false, message: `Failed to add the conference. Error: ${err}` });
        }
        else {
            res.json({ success: true, conference:conference });

        }
    });

    
});

router.post('/updateConference', (req, res) => {
    let id = req.body.id;
    Conference.findById((id), (err, conference) => {
        if (err) {
            return ({ success: false, message: `Failed to find the conference. Error: ${err}` });
        }
        else {
            conference.participants.push({id:id});
            conference.save();
       User.findById(req.body.userId,(user)=>{
           if(user){
           user.conferences.push(conference.id);
           user.save();
           }
       });

            return({ success: true, conference:conference });

        }
    });    
});

router.get('/getConferenceById/:id', (req, res) => {
    var id = req.params.id;
    Conference.findById(id, (err, conference) => {
        if (err) {
            res.json({ success: false, message: `Failed to load order. Error: ${err}` });
        }
        else {
            res.write(JSON.stringify({ success: true, conference: conference }, null, 2));
            res.end();
        }
    });
});

router.get('/getConferences', (req, res) => {
    Conference.getAllConferences((err, conferences) => {
        if (err) {
            res.json({ success: false, message: `Failed to load all conferences. Error: ${err}` });
        }
        else {
            res.write(JSON.stringify({ success: true, conferences: conferences }, null, 2));
            res.end();
        }
    });
});

router.get("/deleteConference/:id",(req,res)=>{

    let id=req.params.id;
    Conference.findById(id,(err,res)=>{
        if (err) {
            return ({ success: false, message: `Failed to remove the conference. Error: ${err}` });

        }
        else {
            res.remove();
            return ({ success: true });

        }
    })
});

router.post('/addQuestion', (req,res)=>{
    let id = req.body.id;
Conference.findById((id), (err, conference) => {
    if (err) {
        return ({ success: false, message: `Failed to find the conference. Error: ${err}` });
    }
    else {
        conference.questions.push(req.body.question);
        return({ success: true, conference:conference });

    }
});

});

module.exports = router;