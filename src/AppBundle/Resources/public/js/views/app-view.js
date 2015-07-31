define([
    'jquery',
    'underscore',
    'backbone',
    'scope',
    'views/specialist-types-step-view',
    'views/specialists-step-view',
    'views/datetime-step-view',
    'text!templates/progress.html',
    'text!templates/sidebar-item.html',
    'router'
], function ($, _, Backbone, scope, SpecialistTypesStepView, SpecialistsStepView, DatetimeStepView, ProgressTemplate, SidebarItemTemplate, router) {
    'use strict';

    // The Application
    // ---------------

    // Our overall **AppView** is the top-level piece of UI.
    var AppView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#appointment-app',

        progressTemplate: _.template(ProgressTemplate),

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
            this.$sidebar = this.$('#sidebar');
            this.$sidebarMenu = this.$sidebar.find('ul.nav');
            this.$prevStep = this.$('#prevStep');

            this.stepViews = [
                new SpecialistTypesStepView(),
                new SpecialistsStepView(),
                new DatetimeStepView()
            ];

            _.bindAll(this, 'render');
            scope.appointment.on('change:currentStep', this.render);
        },

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        render: function () {
            var step = scope.appointment.get('currentStep');
            this.$progress.html(this.progressTemplate({
                progress: (100/this.stepViews.length)*step
            }));
            this.renderSidebar(step);
            this.showStep(step);

            this.$prevStep[step?'removeAttr':'attr']('disabled','disabled');
        },

        renderSidebar: function(step) {
            this.$sidebarMenu.html('');
            _.each(this.stepViews, function(viewItem, index) {
               this.$sidebarMenu.append(
                   _.template(SidebarItemTemplate)(
                       _.extend(viewItem, {
                           active: index == step,
                           disabled: (index > step)
                       })
                   )
               );
            }, this);
            return this;
        },

        prevStep: function () {
            scope.appointment.prevStep();
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
            router.navigate(cur_view.getNavPath());
        }
    });
    return AppView;
});