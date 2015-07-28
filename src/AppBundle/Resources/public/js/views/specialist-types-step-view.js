define([
    'jquery',
    'underscore',
    'backbone',
    'appointment',
    'views/step-view',
    'collections/specialist-types',
    'views/specialist-type-view'
], function ($, _, Backbone, Appointment, StepView, SpecialistTypes, SpecialistTypeView) {
    'use strict';

    var SpecialistTypesStepView = StepView.extend({
        className: 'list-group',

        initialize: function () {
            this.loading();
            this.listenTo(SpecialistTypes, 'add', this.addOne);
            this.listenTo(SpecialistTypes, 'reset', this.addAll);

            // Suppresses 'add' events with {reset: true} and prevents the app view
            // from being re-rendered for every model. Only renders when the 'reset'
            // event is triggered at the end of the fetch.
            SpecialistTypes.fetch({reset: true});
        },

        render: function () {
            this.addAll();
            return this;
        },

        addOne: function (type) {
            var view = new SpecialistTypeView({ model: type });
            this.$el.append(view.render().el);
        },

        addAll: function () {
            this.$el.html('');
            SpecialistTypes.each(this.addOne, this);
        }
    });

    return SpecialistTypesStepView;
});