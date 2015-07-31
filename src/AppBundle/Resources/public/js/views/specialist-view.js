define([
	'jquery',
	'underscore',
	'backbone',
	'scope',
	'text!templates/specialist.html'
], function ($, _, Backbone, scope, SpecialistTemplate) {
	'use strict';

	var SpecialistView = Backbone.View.extend({
		tagName: 'a',
		className: 'list-group-item spec clearfix',
		attributes: {
			href: '#'
		},

		template: _.template(SpecialistTemplate),

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
			scope.appointment.set('specialist_id', this.model.id);
			scope.appointment.nextStep();
		}
	});

	return SpecialistView;
});