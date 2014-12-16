MusicApp.controller('Login', function( $document, $scope, $window, SoundFactory){
	$scope.registerUser = function(){
		SoundFactory.addNewUser($scope.register, function(data){
			if(typeof(data) == 'object'){
				$scope.success = null;
				$scope.messages = data;
			} else {
				$scope.messages = null;
				$scope.success = data;
			}
		});
	}

	$scope.loginUser = function(){
		SoundFactory.getUser($scope.login);
	}
})

MusicApp.controller('User', function($scope, $window, SoundFactory){
	SoundFactory.getUserData(function(data){
		$scope.user = data;
		console.log('$scope.user', $scope.user);
	});

	SoundFactory.getAllUsers(function(data){
		$scope.users = data;
		console.log('$scope.allusers', $scope.users);
	});

	SoundFactory.getAllPlaylists(function(data){
		$scope.playlists = data;
		console.log('$scope.playlists,', $scope.playlists);
	});

	SoundFactory.getAllSongs(function(data){
		$scope.songs = data;
		console.log('$scope.songs', $scope.songs)
	})

	$scope.createPlaylist = function(){
		if($scope.playlist_name){
			SoundFactory.addPlaylist($scope.playlist_name);
		}
	}
	$scope.showPlaylist = function(index){
		SoundFactory.getPlaylist(index, function(data){
			$scope.user_playlist = data;
			console.log('user_playlist', $scope.user_playlist)
		});
	}

	$scope.showCurrentPlaylist = function(){
		SoundFactory.getCurrentPlaylist(function(data){
			$scope.user_playlist = data;
		})
	}

	$scope.deletePlaylist = function(info){
		SoundFactory.removePlaylist(info);
	}

	$scope.deleteSong = function(index,song,playlist){
		SoundFactory.removeSong(index,song,playlist);
	}

	$scope.addSong = function(song, play_index){
		var song_info = {
			song_info: song,
			playlist_index: play_index
		};
		SoundFactory.addSongToPlaylist(song_info);
	}

	$scope.playSong = function(source){
		console.log('source', source);
		$scope.song_source = source;
		SoundFactory.play(source);
	}
	$scope.follow = function(user){
		console.log("FOLLOW USER:", user);
	}
})	
