define([
	'jquery',
	'underscore',
	'backbone',
	'models/specialist'
], function ($, _, Backbone, Specialist) {
	'use strict';

	var Specialists = Backbone.Collection.extend({
		model: Specialist,

		url: function() {
			return Routing.generate('specialist');
		},

		// Filter down the list of all todo items that are finished.
		completed: function () {
			return this.where({completed: true});
		},

		// Filter down the list to only todo items that are still not finished.
		remaining: function () {
			return this.where({completed: false});
		},

		// We keep the Todos in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function () {
			return this.length ? this.last().get('order') + 1 : 1;
		},
	});

	return new Specialists();
});