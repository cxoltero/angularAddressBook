'use strict';

angular.module('myContacts.contacts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/contacts',{
		templateUrl: 'contacts/contacts.html',
		controller: 'ContactsCtrl'
	});
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
	var ref = new Firebase('https://rxcontacts.firebaseio.com/contacts');
	$scope.contacts =  $firebaseArray(ref);
	console.log($scope.contacts);

	$scope.showAddForm = function(){
		$scope.addFormShow = true;
	}
	$scope.hide = function(){
		$scope.addFormShow = false;
	}
}]);