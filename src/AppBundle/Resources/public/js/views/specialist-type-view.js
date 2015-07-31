define([
    'jquery',
    'underscore',
    'backbone',
    'scope',
    'text!templates/specialist-type.html'
], function ($, _, Backbone, scope, SpecialistTypeTemplate) {
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

        template: _.template(SpecialistTypeTemplate),

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        chooseType: function (e) {
            e.preventDefault();
            scope.appointment.set('specialistType', this.model.id);
            scope.appointment.nextStep();
        }
    });

    return SpecialistTypeView;
});