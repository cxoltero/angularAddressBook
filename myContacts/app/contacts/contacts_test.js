'use strict';

describe('myApp.contacts module', function(){
	beforeEach(module('myContacts.contacts'));

	describe('contacts controller', function(){
		it('should ....', inject(function($controller){
			// spec body
			var contactsCtrl = $controller('ContactsCtrl');
			expect(contactsCtrl).toBeDefined();
		}));

	});
});