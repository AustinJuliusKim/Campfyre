Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', {name: 'welcome'});
Router.route('/chat', {name: 'chat'});
Router.route('/groups/:_id', {
    name: 'groupPage',
    data: function () {
        return Groups.findOne(this.params._id);
    }
});