var app = app || {};

(function () {
    'use strict';

    var SpecialistTypes = Backbone.Collection.extend({
        model: app.SpecialistType,

        url: Routing.generate('specialist-type')
    });

    app.specialistTypes = new SpecialistTypes();
})();