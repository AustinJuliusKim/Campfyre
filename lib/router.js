Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return [Meteor.subscribe('groups'), Meteor.subscribe('messages'), Meteor.subscribe('allUsers')];
    }
});

Router.route('/', {name: 'home'});
Router.route('/groups/:_id', {
    name: 'groupPage',
    data: function () {
        return Groups.findOne(this.params._id);
    }
});
Router.route('/users/:_id', {
    name: 'userPage',
    data: function () {
        return Meteor.users.findOne(this.params._id);
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
//change later
Router.onBeforeAction(requireLogin, {only: 'groupPage'});