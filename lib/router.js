Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
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

var requireLogin = 
Router.onBeforeAction('dataNotFound', {only: 'groupPage'});
