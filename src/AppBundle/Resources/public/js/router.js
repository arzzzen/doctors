'use strict';
define([
    'backbone',
    'underscore',
    'scope'
], function (Backbone, _, scope) {
    var Router = Backbone.Router.extend({
        routes: {
            "specialist/st:specialist_type": "specialist",
            "datetime/st:specialist_type/s:specialist": "datetime",
            "*specialist_type": "specialist_type"
        },
        specialist_type: function() {
            scope.appointment.set('currentStep', 0);
        },
        specialist: function (specialist_type) {
            if (!isNaN(specialist_type)) {
                scope.appointment.set({
                    'currentStep': 1,
                    'specialistType': specialist_type
                });
            }
        },
        datetime: function(specialist_type, specialist) {
            if (!isNaN(specialist_type) ||
                !isNaN(specialist)) {
                scope.appointment.set({
                    currentStep: 2,
                    specialistType: specialist_type,
                    specialist_id: specialist
                });
            }
        }
    });
    return new Router;
});