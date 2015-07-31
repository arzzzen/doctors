define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';
    var StepView = Backbone.View.extend({
        midLoadingTime: 400,

        loading: function() {
            this.$el.html('<div class="loading-icon"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span></div>');
            var d = $.Deferred();
            setTimeout(d.resolve, this.midLoadingTime);
            this.loadingPromise = d.promise();
        },

        addToDOM: function() {},

        loadingPromise: $.Deferred().resolve().promise(),

        title: 'No title',
        getNavPath: function() {
            return _.isFunction(this.navPath) ? this.navPath() : this.navPath;
        }
    });
    return StepView;
});