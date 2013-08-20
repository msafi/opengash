var App = {
	Models: {},
	Collections: {},
	Views: {},
	Contacts: null,
	Directory: null
};


$(function() { // Run this code when the DOM is ready
	window.tom = new App.Models.Contact({
		firstName: 'Thomas',
		lastName: 'Hunter',
		phoneNumber: '9895135499',
		email: 'me@thomashunter.name'
	});

	App.Contacts = new App.Collections.Contact();

	App.Contacts.add(window.tom);

	App.Contacts.add({
		firstName: 'Rupert',
		lastName: 'Styx',
		phoneNumber: '9895551212',
		email: 'rupertstyx@example.com'
	});

	App.Directory = new App.Views.Directory({
		el: $('#display')
	});

	App.Directory.render();

	App.Contacts.on('add remove', function() {
		App.Directory.render();
	});


});