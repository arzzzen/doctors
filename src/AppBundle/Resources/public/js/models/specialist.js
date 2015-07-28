define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	var Specialist = Backbone.Model.extend({
		defaults: {
			first_name: '',
			last_name: '',
			type: ''
		}
	});

	return Specialist;
});