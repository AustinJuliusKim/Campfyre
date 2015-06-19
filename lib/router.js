Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', {name: 'welcome'});
Router.route('/chat', {name: 'chat'});
