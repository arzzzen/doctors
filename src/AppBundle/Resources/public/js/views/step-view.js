define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';
    var StepView = Backbone.View.extend({
        loading: function() {
            this.$el.html('<div class="loading-icon"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span></div>');
            return this;
        },

        addToDOM: function() {}
    });
    return StepView;
});