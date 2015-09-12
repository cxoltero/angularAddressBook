'use strict';

angular.module('myContacts.contacts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/contacts',{
		templateUrl: 'contacts/contacts.html',
		controller: 'ContactsCtrl'
	});
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
	// this will initiate firebase
	var ref = new Firebase('https://rxcontacts.firebaseio.com/contacts');
	// get contacts
	$scope.contacts =  $firebaseArray(ref);
	console.log($scope.contacts);

	// show the add form
	$scope.showAddForm = function(){
		$scope.addFormShow = true;
	}

	// show the edit form
	$scope.showEditForm = function(contact){
		$scope.editFormShow = true;

		// this passes all the current values in the form;
		$scope.id 				  = contact.$id;
		$scope.name				  = contact.name;
		$scope.email			  = contact.email;
		$scope.company			  = contact.company;
		$scope.work_phone         = contact.phones[0].work;
		$scope.home_phone         = contact.phones[0].home;
		$scope.mobile_phone       = contact.phones[0].mobile;
		$scope.street_address     = contact.address[0].street_address;
		$scope.city               = contact.address[0].city;
		$scope.state              = contact.address[0].state;
		$scope.zipcode            = contact.address[0].zipcode; 
	}

	// hide current form
	$scope.hide = function(){
		$scope.addFormShow = false;
		$scope.contactShow = false;
	}

	// submit contat to firebase
	$scope.addFormSubmit = function(){
		// assign contact values
		if($scope.name){ var name = $scope.name} else{var name = null};
		if($scope.email){ var email = $scope.email} else{var email = null};
		if($scope.company){ var company = $scope.company} else{var company = null};
		if($scope.mobile_phone){ var mobile_phone = $scope.mobile_phone} else{var mobile_phone = null};
		if($scope.home_phone){ var home_phone = $scope.home_phone} else{var home_phone = null};
		if($scope.work_phone){ var work_phone = $scope.work_phone} else{var work_phone = null};
		if($scope.street_address){ var street_address = $scope.street_address} else{var street_address = null};
		if($scope.city){ var city = $scope.city} else{var city = null};
		if($scope.state){ var state = $scope.state} else{var state = null};	
		if($scope.zipcode){ var zipcode = $scope.zipcode} else{var zipcode = null};

		// buind the actual object
		$scope.contacts.$add({
			name: name,
			email: email,
			company: company,
			phones:[{
				mobile: mobile_phone,
				home: home_phone,
				work: work_phone
			}],
			address: [{
				street_address: street_address,
				city: city,
				state: state,
				zipcode: zipcode
			}]
		})

		.then(function(ref){
			var id = ref.key();
			console.log("added contact with ID of: "+id);

			// Clear form
			clearFields();
			$scope.addFormShow = false;

			// send message to user
			$scope.msg = "Contact Added";
		});
	}

	// Edit form 
	$scope.editFormSubmit = function(){

		console.log("editing contact info");
		// to get contact id
		var id = $scope.id;

		// get specific record for id
		var record = $scope.contacts.$getRecord(id);
		console.log("id ="+id);
		console.log("record = "+record);

		record.name				           =  $scope.name;
		record.email				       =  $scope.email;
		record.company				       =  $scope.company;
		record.phones[0].work			   =  $scope.work_phone;
		record.phones[0].home			   =  $scope.home_phone;
		record.phones[0].mobile		 	   =  $scope.mobile_phone; 
		record.address[0].street_address   =  $scope.street_address;
		record.address[0].city			   =  $scope.city;  
		record.address[0].state			   =  $scope.state;  
		record.address[0].zipcode		   =  $scope.zipcode; 

		// to save changes to contacts
		$scope.contacts.$save(record).then(function(ref){
			console.log(ref.key);
		});

		// clear fields
		clearFields();

		// hide edit form
		$scope.editFormShow = false;
		$scope.msn ="Contact Updated";

	}

	// this will show the contact info
	$scope.showContact = function(contact){
		$scope.name = contact.name;
		$scope.company = contact.company;
		$scope.work_phone         = contact.phones[0].work;
		$scope.home_phone         = contact.phones[0].home;
		$scope.mobile_phone       = contact.phones[0].mobile;
		$scope.street_address     = contact.address[0].street_address;
		$scope.city               = contact.address[0].city;
		$scope.state              = contact.address[0].state;
		$scope.zipcode            = contact.address[0].zipcode; 


		// this will show contact info on top
		$scope.contactShow = true;       ;
	}
	$scope.removeContact = function(contact){
		$scope.contacts.$remove(contact);
		$scope.msg = "Contact Removed";
		
	}
	// This will clear form fields after submitting data
	var clearFields = function(){
		// assign contact values
		$scope.name= "";
		$scope.email= "";
		$scope.company= "";
		$scope.mobile_phone= "";
		$scope.home_phone= "";
		$scope.work_phone= "";
		$scope.street_address= "";
		$scope.city= "";
		$scope.state= "";	
		$scope.zipcode= "";
	}

}]);