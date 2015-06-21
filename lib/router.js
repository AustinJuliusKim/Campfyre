Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        Meteor.subscribe('messages');
        return Meteor.subscribe('groups');
    }
});

Router.route('/', {name: 'home'});
Router.route('/groups/:_id', {
    name: 'groupPage',
    data: function () {
        return Groups.findOne(this.params._id);
    }
});

var requireLogin = function () {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
};

Router.onBeforeAction('dataNotFound', {only: 'groupPage'});
Router.onBeforeAction(requireLogin, {only: 'groupPage'});
