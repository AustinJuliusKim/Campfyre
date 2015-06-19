Template.signupForm.events({
    'submit #signup-form': function (e, t) {
        e.preventDefault();
        Accounts.createUser({
            username: t.find('#signup-username').value,
            password: t.find('#signup-password').value
        }, function (error) {
            if (error) {
                console.log("Account not created. Reason: " + error.reason);
            }
        });
    },
    'click #back-button': function (e, t) {
        e.preventDefault();
        Session.set('clickedSignup', false);
    }
});