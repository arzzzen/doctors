var app = app || {};

$(function () {
	'use strict';

	// kick things off by creating the `App`
	app.appointment = new app.Appointment();

	new app.AppView();
});