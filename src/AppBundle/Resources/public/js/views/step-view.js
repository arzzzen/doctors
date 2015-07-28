var app = app || {};

(function ($) {
    'use strict';
    app.StepView = Backbone.View.extend({
        loading: function() {
            this.$el.html('<div class="loading-icon"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span></div>');
            return this;
        },

        addToDOM: function() {}
    });
})(jQuery);