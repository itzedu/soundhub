var MusicApp = angular.module('MusicApp', ['ngRoute']);

MusicApp.config(function($routeProvider){
	$routeProvider
	.when('/',
	{
		templateUrl: './../views/partials/user.html'
	})
	.when('/browse',
	{
		templateUrl: './../views/partials/browse.html'
	})
	.when('/follow',
	{
		templateUrl: './../views/partials/follow.html'
	})
	.when('/playlist',
	{
		templateUrl: './../views/partials/playlist.html'
	})
	.when('/followed_playlist',
	{
		templateUrl: './../views/partials/followed_playlist.html'
	})
});