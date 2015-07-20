var app = app || {};

(function ($) {
	'use strict';

	app.SpecialistView = Backbone.View.extend({

		template: _.template($('#specialist-template').html()),

		events: {
			'click .spec': 'chooseSpec'
		},

		initialize: function () {
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		chooseSpec: function (e) {
			e.preventDefault();
			app.appointment.set('specialist_id', this.model.id);
			app.appointment.nextStep();
		}
	});
})(jQuery);