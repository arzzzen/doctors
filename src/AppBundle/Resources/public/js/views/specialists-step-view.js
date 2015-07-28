var app = app || {};

(function ($) {
    'use strict';

    app.SpecialistsStepView = app.StepView.extend({
        className: 'list-group',

        initialize: function () {
            this.listenTo(app.specialists, 'add', this.addOne);
            this.listenTo(app.specialists, 'reset', this.addAll);
            app.appointment.on('change:specialistType', function() {
                var self = this;
                this.loading();
                app.specialists.fetch({ reset: true, data: {type_id: app.appointment.get('specialistType')} })
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
            var view = new app.SpecialistView({ model: specialist });
            this.$el.append(view.render().el);
        },

        addAll: function () {
            if (app.specialists.length) {
                this.$el.html('');
                app.specialists.each(this.addOne, this);
            }  else if (this.collectionFetched) {
                this.$el.text('Не найден ни один специалист');
            }
        }
    });
})(jQuery);