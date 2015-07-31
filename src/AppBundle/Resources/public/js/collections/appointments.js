define([
    'jquery',
    'underscore',
    'backbone',
    'models/appointment'
], function ($, _, Backbone, Appointment) {
    'use strict';

    var Appointments = Backbone.Collection.extend({
        model: Appointment,

        url: Routing.generate('appointments')
    });

    return Appointments;
});