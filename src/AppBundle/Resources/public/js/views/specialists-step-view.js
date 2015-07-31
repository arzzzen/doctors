define([
    'jquery',
    'underscore',
    'backbone',
    'scope',
    'views/step-view',
    'views/specialist-view'
], function ($, _, Backbone, scope, StepView, SpecialistView) {
    'use strict';

    var SpecialistsStepView = StepView.extend({
        className: 'list-group',
        title: 'Приемный врач',
        navPath: function () {
            return 'specialist/st'+scope.appointment.get('specialistType');
        },

        initialize: function () {
            this.listenTo(scope.specialists, 'add', this.addOne);
            this.listenTo(scope.specialists, 'reset', this.addAll);
            scope.appointment.on('change:specialistType', function() {
                var self = this;
                this.loading();
                scope.specialists.fetch({ reset: true, data: {type_id: scope.appointment.get('specialistType')} })
                    .success(function() {
                        self.collectionFetched = true;
                    });
            }, this);
        },

        render: function () {
            this.addAll();
            return this;
        },

        addOne: function (specialist) {
            var view = new SpecialistView({ model: specialist });
            this.$el.append(view.render().el);
        },

        addAll: function () {
            this.loadingPromise.done(_.bind(function() {
                if (scope.specialists.length) {
                    this.$el.html('');
                    scope.specialists.each(this.addOne, this);
                }  else if (this.collectionFetched) {
                    this.$el.text('Не найден ни один специалист');
                }
            }, this));
        }
    });
    return SpecialistsStepView;
});