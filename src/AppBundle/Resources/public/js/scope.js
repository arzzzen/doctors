'use strict';
define([
    'models/appointment',
    'collections/specialist-types',
    'collections/specialists'
], function (Appointment, SpecialistTypes, Specialists) {
    return {
        appointment: new Appointment(),
        specialistTypes: new SpecialistTypes(),
        specialists: new Specialists()
    };
});