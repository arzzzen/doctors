var app = app || {};

(function ($) {
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#appointment-app',

		progressTemplate: _.template($('#progress-template').html()),

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'click #prevStep': 'prevStep'
		},

		// At initialization we bind to the relevant events on the `Todos`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting todos that might be saved in *localStorage*.
		initialize: function () {
            this.$progress = this.$('.progress');
            this.$step = this.$('#step');
            this.$prevStep = this.$('#prevStep');

            this.stepViews = [
                new app.SpecialistTypesStepView(),
                new app.SpecialistsStepView(),
                new app.DatetimeStepView()
            ];

            _.bindAll(this, 'render');
            app.appointment.on('change:currentStep', this.render);

      		this.render();
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
            var step = app.appointment.get('currentStep');
			this.$progress.html(this.progressTemplate({
				progress: (100/this.stepViews.length)*step
			}));
            this.showStep(step);

            this.$prevStep[step?'removeAttr':'attr']('disabled','disabled');
		},

        prevStep: function () {
            app.appointment.prevStep();
        },

        showStep: function (step) {
            var cur_view = this.stepViews[step];
            this.$step.children().hide();
            if (this.$step.has(cur_view.el).length) {
                cur_view.$el.show();
            } else {
                this.$step.append(cur_view.render().$el);
                cur_view.addToDOM();
            }
        }
	});
})(jQuery);