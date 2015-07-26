var app = app || {};

(function ($) {
    'use strict';

    app.DatetimeStepView = Backbone.View.extend({

        initialize: function () {
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
                    {
                        url: Routing.generate('fullcalendar_loader'),
                        type: 'POST',
                        // A way to add custom filters to your event listeners
                        data: {
                            specialist_id: app.appointment.get('specialist_id')
                        },
                        error: function() {
                            //alert('There was an error while fetching Google Calendar!');
                        }
                    }
                ],
                minTime: "09:00:00",
                maxTime: "17:00:00"
            });
            return this;
        }
    });
})(jQuery);