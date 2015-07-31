define([
    'jquery',
    'underscore',
    'backbone',
    'scope',
    'views/step-view',
    'views/specialist-type-view'
], function ($, _, Backbone, scope, StepView, SpecialistTypeView) {
    'use strict';

    var SpecialistTypesStepView = StepView.extend({
        className: 'list-group',
        title: 'Специалист',
        navPath: 'specialist_type',

        initialize: function () {
            this.loading();
            this.listenTo(scope.specialistTypes, 'add', this.addOne);
            this.listenTo(scope.specialistTypes, 'reset', this.addAll);

            // Suppresses 'add' events with {reset: true} and prevents the app view
            // from being re-rendered for every model. Only renders when the 'reset'
            // event is triggered at the end of the fetch.
            scope.specialistTypes.fetch({reset: true});
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
            scope.specialistTypes.each(this.addOne, this);
        }
    });

    return SpecialistTypesStepView;
});