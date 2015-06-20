Template.loginForm.events({
    'submit #login-form': function (e, t) {
        e.preventDefault();

        var username = t.find('#login-username').value;
        var password = t.find('#login-password').value;
        Meteor.loginWithPassword(username, password, function (error) {
            if (error) {
                console.log("Unable to log in with credentials. Reason: " + error.reason);
            } else {
                console.log("User '" + username + "' has logged in successfully.");
            }
        });
    },

    'click #signup-button': function (e, t) {
        e.preventDefault();
        Session.set('clickedSignup', true);
    }
});
