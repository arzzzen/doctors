var app = app || {};

(function () {
	'use strict';

	app.Specialist = Backbone.Model.extend({
		defaults: {
			first_name: '',
			last_name: '',
			type: ''
		}
	});
})();