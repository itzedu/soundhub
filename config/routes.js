var users = require('./../server/controllers/users.js');
var logins = require('./../server/controllers/logins.js');
var playlist = require('./../server/controllers/playlist.js');
module.exports = function Routes(app, io){
    //takes us to login/registration page
    app.get('/', function(req,res){
        req.session.page = 'index';
        logins.index(req,res)
    });

    //start of users controller
    //takes user to user home page
    app.get('/users', function(req,res){
        req.session.page = 'index';
        users.index(req,res)
    });

    //register a new user
    app.post('/users/create', function (req,res){
        users.create(req,res)
    });

    //user first login
    app.post('/users/index.json',function (req,res){
        users.index_json(req,res)
    });

    //get current users data
    app.get('/users/user.json', function (req,res){
        users.user_json(req,res)
    })

    //get all users
    app.get('/users/allUsers.json', function (req,res){
        users.allUsers_json(req,res)
    });

    app.get('/users/all_songs', function (req,res){
        users.all_songs(req,res)
    })

    // start of playlist controller
    // create playlist
    app.post('/playlist/create', function (req,res){
        playlist.create(req,res)
    });

    app.get('/playlist/save_playlist', function (req,res){
        playlist.save_playlist(req,res)
    });

    app.get('/playlist/get_playlist', function (req,res){
        playlist.get_playlist(req,res)
    })

    app.get('/playlist/allPlaylists', function (req,res){
        playlist.allPlaylists_json(req,res)
    });

    app.post('/playlist/delete', function (req,res){
        playlist.destroy(req,res);
    })

    app.post('/playlist/delete_song', function (req,res){
        playlist.destroy_song(req,res);
    })

    app.post('/playlist/add_song',function (req,res){
        playlist.add_song(req,res);
    })

    app.get('/test', function (req,res){
        users.test(req,res)
    });
    // app.get('/users/:id', function (req,res){
    //     users.show(req,res)
    // });
    // app.get('/users/:id/edit', function (req,res){
    //     users.edit(req,res)
    // });
    // app.post('/users/newUser_json', function (req,res){
    //     users.newUser_json(req,res)
    // });
    io.sockets.on('connection', function (socket){
        console.log('A new user connected!');
        socket.emit('info', {msg: 'The world is round, there is no up or down.'}); //sending a message to just that person
        io.emit('global_event', {msg: 'hello'}); //broadcasting to everyone
        socket.broadcast.emit('event', {msg: 'hi'}); //broadcasting an event to everyone except the person you established the socket connection to
        socket.on('my other event', function (data){
            console.log(data);
        }); //listening for an event
        socket.on('disconnect', function (){
            io.sockets.emit('user disconnected');
        });
    });
};