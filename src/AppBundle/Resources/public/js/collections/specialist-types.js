define([
    'jquery',
    'underscore',
    'backbone',
    'models/specialist-type'
], function ($, _, Backbone, SpecialistType) {
    'use strict';

    var SpecialistTypes = Backbone.Collection.extend({
        model: SpecialistType,

        url: Routing.generate('specialist-types')
    });

   return SpecialistTypes;
});