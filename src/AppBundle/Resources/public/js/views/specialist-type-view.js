var app = app || {};

(function ($) {
    'use strict';

    app.SpecialistTypeView = Backbone.View.extend({
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
            app.appointment.set('specialistType', this.model.id);
            app.appointment.nextStep();
        }
    });
})(jQuery);