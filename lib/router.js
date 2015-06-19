Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', {name: 'welcome'});
Router.route('/signup', {name: 'sign-up'});