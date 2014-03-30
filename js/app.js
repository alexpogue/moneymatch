"use strict";

var moneyMatchApp = angular.module('moneyMatchApp', [
	'ngRoute',
	'moneyMatchControllers'
]);

moneyMatchApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/game', {
				templateUrl: 'partials/game.html',
				controller: 'GameCtrl'
			}).
			when('/fav', {
				templateUrl: 'partials/fav.html',
				controller: 'FavCtrl'
			})
	}
]);
