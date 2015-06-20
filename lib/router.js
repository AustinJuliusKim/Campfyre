Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

Router.route('/', {name: 'home'});
Router.route('/groups/:_id', {
    name: 'groupPage',
    data: function () {
        return Groups.findOne(this.params._id);
    }
});