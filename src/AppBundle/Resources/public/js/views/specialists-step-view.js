define([
    'jquery',
    'underscore',
    'backbone',
    'appointment',
    'views/step-view',
    'collections/specialists',
    'views/specialist-view'
], function ($, _, Backbone, Appointment, StepView, Specialists, SpecialistView) {
    'use strict';

    var SpecialistsStepView = StepView.extend({
        className: 'list-group',

        initialize: function () {
            this.listenTo(Specialists, 'add', this.addOne);
            this.listenTo(Specialists, 'reset', this.addAll);
            Appointment.on('change:specialistType', function() {
                var self = this;
                this.loading();
                Specialists.fetch({ reset: true, data: {type_id: Appointment.get('specialistType')} })
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
            if (Specialists.length) {
                this.$el.html('');
                Specialists.each(this.addOne, this);
            }  else if (this.collectionFetched) {
                this.$el.text('Не найден ни один специалист');
            }
        }
    });
    return SpecialistsStepView;
});