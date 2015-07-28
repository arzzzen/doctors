/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        'jquery-fullcalendar': ['jquery', 'moment']
    },
    paths: {
        jquery: '../vendor/jquery/dist/jquery',
        underscore: '../vendor/underscore/underscore',
        backbone: '../vendor/backbone/backbone',
        appointment: 'models/appointment',
        'jquery-fullcalendar': '../../adesignscalendar/js/fullcalendar/jquery.fullcalendar.min',
        'moment': '../vendor/moment/min/moment.min'
    }
});

require([
    'backbone',
    'views/app-view'
], function (Backbone, AppView) {
    // Initialize the application view
    new AppView();
});