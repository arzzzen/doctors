define([
    'jquery',
    'underscore',
    'backbone',
    'scope',
    'views/step-view',
    'jquery-fullcalendar',
    'collections/appointments'
], function ($, _, Backbone, scope, StepView, fullCalendar, Appointments) {
    'use strict';

    var DatetimeStepView = StepView.extend({
        title: 'Выбор даты',
        navPath: function () {
            return 'datetime/st'+scope.appointment.get('specialistType')+'/s'+scope.appointment.get('specialist_id');
        },

        initialize: function() {
            scope.appointment.on('change:specialist_id', function() {
                this.$el
                    .fullCalendar('removeEvents')
                    .fullCalendar('addEventSource', this.getCalendarEventSource());
            }, this);


        },
        render: function () {
            this.$el.html('');
            this.$el.fullCalendar({
                defaultView: 'agendaWeek',
                header: {
                    right: 'prev, next',
                    left: 'title'
                },
                lazyFetching: true,
                timeFormat: {
                    // for agendaWeek and agendaDay
                    agenda: 'h:mmt',    // 5:00 - 6:30

                    // for all other views
                    '': 'h:mmt'         // 7p
                },
                eventSources: [
                    this.getCalendarEventSource()
                ],
                minTime: "09:00:00",
                maxTime: "17:00:00"
            });
            return this;
        },
        getCalendarEventSource: function() {
            return {
                url: Routing.generate('fullcalendar_loader'),
                type: 'POST',
                data: {
                    specialist_id: scope.appointment.get('specialist_id')
                }
            };
        },
        addToDOM: function() {
            this.$el.fullCalendar('render');
        }
    });
    
    return DatetimeStepView;
});