define([
    'jquery',
    'underscore',
    'backbone',
    'appointment'
], function ($, _, Backbone, Appointment) {
    'use strict';

    var SpecialistTypeView = Backbone.View.extend({
        tagName: 'a',
        className: 'list-group-item spec-type',
        attributes: {
            href: '#'
        },

        events: {
            'click': 'chooseType'
        },

        template: _.template($('#specialist-type-template').html()),

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        chooseType: function (e) {
            e.preventDefault();
            Appointment.set('specialistType', this.model.id);
            Appointment.nextStep();
        }
    });

    return SpecialistTypeView;
});