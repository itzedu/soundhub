var mongoose = require('mongoose')
var User = mongoose.model('User');
module.exports = {
    index: function(req, res){
        res.render('./../public/views/login', {title:'SoundHub'});
    }
}