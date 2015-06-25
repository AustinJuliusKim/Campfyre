//IIFE Immediately invoked function expression
(function () {
    Router.configure({
        layoutTemplate: 'layout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'notFound',
        waitOn: function () {
            return [Meteor.subscribe('groups'), Meteor.subscribe('profiles'), Meteor.subscribe('allUsers')];
        }
    });

    Router.route('/', {
        name: 'home',
        waitOn: function () {
            Session.set('currentContext', 'Home');
        }
    });
    Router.route('/public/:_id', {
        name: 'publicPage',
        waitOn: function () {
            var contextId = this.params._id;
            Session.set('currentContext', findContextName(contextId));
            return Meteor.subscribe('publicMessages', this.params._id);
        },
        data: function () {
            return findContextData(this.params._id);
        }
    });
    Router.route('/private/:_id', {
        name: 'privatePage',
        waitOn: function () {
            var contextId = this.params._id;
            Session.set('currentContext', findContextName(contextId));
            return Meteor.subscribe('privateMessages', this.params._id);
        },
        data: function () {
            return findContextData(this.params._id);
        }
    });

    function findContextData(id) {
        return Groups.findOne(id) || Meteor.users.findOne(id);
    }

    function findContextName(id) {
        return findContextData(id).name || findContextData(id).username;
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
})();