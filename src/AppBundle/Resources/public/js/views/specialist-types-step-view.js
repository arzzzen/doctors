var app = app || {};

(function ($) {
    'use strict';

    app.SpecialistTypesStepView = Backbone.View.extend({
        className: 'list-group',

        initialize: function () {
            this.listenTo(app.specialistTypes, 'add', this.addOne);
            this.listenTo(app.specialistTypes, 'reset', this.addAll);

            // Suppresses 'add' events with {reset: true} and prevents the app view
            // from being re-rendered for every model. Only renders when the 'reset'
            // event is triggered at the end of the fetch.
            app.specialistTypes.fetch({reset: true});
        },

        render: function () {
            this.addAll();
            return this;
        },

        addOne: function (type) {
            var view = new app.SpecialistTypeView({ model: type });
            this.$el.append(view.render().el);
        },

        addAll: function () {
            this.$el.html('');
            app.specialistTypes.each(this.addOne, this);
        }
    });
})(jQuery);