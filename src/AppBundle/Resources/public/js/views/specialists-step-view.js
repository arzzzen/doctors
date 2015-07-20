var app = app || {};

(function ($) {
    'use strict';

    app.SpecialistsStepView = Backbone.View.extend({

        initialize: function () {
            this.listenTo(app.specialists, 'add', this.addOne);
            this.listenTo(app.specialists, 'reset', this.addAll);
            app.appointment.on('change:specialistType', function() {
                // Suppresses 'add' events with {reset: true} and prevents the app view
                // from being re-rendered for every model. Only renders when the 'reset'
                // event is triggered at the end of the fetch.
                app.specialists.fetch({reset: true});
            });
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
            this.$el.html('');
            app.specialists.each(this.addOne, this);
        }
    });
})(jQuery);