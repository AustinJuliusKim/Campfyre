Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return [Meteor.subscribe('groups'), Meteor.subscribe('users')];
    }
});

Router.route('/', {name: 'home'});
Router.route('/public/:_id', {
    name: 'publicPage',
    waitOn: function () {
        return Meteor.subscribe('publicMessages', this.params._id);
    },
    data: function () {
        return findContextData(this.params._id);
    }
});
Router.route('/private/:_id', {
    name: 'privatePage',
    waitOn: function () {
        return [Meteor.subscribe('privateMessages1', this.params._id),
            Meteor.subscribe('privateMessages2', this.params._id)];
    },
    data: function () {
        return findContextData(this.params._id);
    }
});

function findContextData(id) {
    return Groups.findOne(id) || Meteor.users.findOne(id);
}

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