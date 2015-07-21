var app = app || {};

(function () {
    'use strict';

    app.SpecialistType = Backbone.Model.extend({
        defaults: {
            title: '',
            desc: ''
        }
    });
})();