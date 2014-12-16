var mongoose = require('mongoose')
var User = mongoose.model('User');
var Song = mongoose.model('Song');

module.exports = {
    index: function(req, res){
        if(req.sessionID == req.session.session_id){
            res.render('./../public/views/index', {title:'SoundHub'});
        } else{
            res.render('./../public/views/login', {title:'SoundHub'});
        }
    },

    //register user
    create: function(req, res){
        var a = new User(req.body);
        a.save(function(err){
            if(err){
                res.send(JSON.stringify(err));
            }
            else
            {
                res.send('You have successfully registered!');
            }
        });
    },

    //to have user login
    index_json: function(req, res){      
        User.find({email: req.body.email, password: req.body.password}, function(err, results){
            if(results.length>0)
            {
                req.session.session_id = req.sessionID;
                req.session.name = results[0].first_name;
                req.session.user_id = results[0]._id;
                console.log('INDEX - REQ.SESSION', req.session);
                res.send(JSON.stringify(results));
            }
            else
            {
                console.log('ERROR');
                res.send(JSON.stringify(err));
            }
        })
       
    },

    //grab user data once logged in
    user_json: function(req, res){
        console.log("SESSION - req.session", req.session);
        User.find({_id: req.session.user_id}, function(err, results){
            res.send(JSON.stringify(results));
        });
    },

    allUsers_json: function(req, res){
        User.find({}, function(err, results){
            res.send(JSON.stringify(results));
        });
    },

    all_songs: function(req,res){
        Song.find({}, function(err, results){
            res.send(JSON.stringify(results));
        })
    },

    // this is to look at the db in browser
    test: function(req, res){
        User.find({}, function(err, results){
            res.send(results);
        });
    },
}