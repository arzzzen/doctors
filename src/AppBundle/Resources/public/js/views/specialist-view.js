define([
	'jquery',
	'underscore',
	'backbone',
	'appointment'
], function ($, _, Backbone, Appointment) {
	'use strict';

	var SpecialistView = Backbone.View.extend({
		tagName: 'a',
		className: 'list-group-item spec clearfix',
		attributes: {
			href: '#'
		},

		template: _.template($('#specialist-template').html()),

		events: {
			'click': 'chooseSpec'
		},

		initialize: function () {
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		chooseSpec: function (e) {
			e.preventDefault();
			Appointment.set('specialist_id', this.model.id);
			Appointment.nextStep();
		}
	});

	return SpecialistView;
});