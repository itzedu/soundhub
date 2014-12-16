var mongoose = require('mongoose')
var User = mongoose.model('User');

module.exports = {
    create: function(req, res){
    	console.log(req.body);
    	User.update({'_id': req.body._id},{$push: {playlists: {playlist_name: req.body.playlist_name}}}, function(err,numbersAffected){
            if(err){
                res.send(JSON.stringify(err));
            }
            else
            {
                res.send(JSON.stringify(numbersAffected));
            }
    	})
    },

    allPlaylists_json: function(req, res){
    	console.log("SESSION - req.session", req.session);
        User.find({_id: req.session.user_id}, function(err, results){
        	 if(err){
                res.send(JSON.stringify(err));
            }
            else
            {
                 res.send(JSON.stringify(results[0].playlists));
            }
        });
    },

    save_playlist: function(req, res){
    	console.log('req-body', req.body);
    	console.log(req.body.current_playlist_index);
    	req.session.current_playlist_index = req.body.current_playlist_index;
    	console.log(req.session.current_playlist_index);
    	// res.send(JSON.stringify(req.body.index));
    },

    get_playlist: function(req, res){
    	res.send(JSON.stringify(req.session.current_playlist_index));
    },

    destroy: function(req,res){
    	User.update({_id: req.body._id}, {$pull: {playlists: {playlist_name: req.body.playlist_name}}}, function(err, numbersAffected){
    		if(err){
    			res.send(JSON.stringify(err));
    		} else {
    			res.send(JSON.stringify(numbersAffected));
    		}
    	})
    },

    add_song: function(req,res){
        console.log("FROM ADD SONG:", req.body);
        User.update({_id: req.session.user_id, 'playlists.playlist_name':req.body.playlist_name}, {$push: {'playlists.$.songs': {track: req.body.track, artist: req.body.artist, file_source: req.body.file_source, date: req.body.date}}}, function(err, numbersAffected){
            if(err){
                res.send(JSON.stringify(err));
            } else {
                res.send(JSON.stringify(numbersAffected));
            }
        })
    },

    destroy_song: function(req,res){
    	console.log("FROM DELETE SONG", req.body);
    	User.update({_id: req.body._id, 'playlists.playlist_name': req.body.playlist_name}, {$pull: {'playlists.$.songs': {track: req.body.track, artist: req.body.artist}}}, function(err, numbersAffected){
    		if(err){
    			res.send(JSON.stringify(err));
    		} else {
    			res.send(JSON.stringify(numbersAffected));
    		}
    	})
    },
}

