define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    var SpecialistType = Backbone.Model.extend({
        defaults: {
            title: '',
            desc: ''
        }
    });

    return SpecialistType;
});