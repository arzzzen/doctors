var app = app || {};

(function () {
	'use strict';

	app.Appointment = Backbone.Model.extend({
		defaults: {
			datetime: '',
            currentStep: 0,
            specialist_id: null,
            specialistType: null
		},

        nextStep: function() {
            this.set('currentStep', this.get('currentStep')+1);
        },

        prevStep: function() {
            if (this.get('currentStep') > 0) {
                this.set('currentStep', this.get('currentStep')-1);
            }
        }
	});
})();