Template.logoutForm.events({
    'submit #logout-form': function (e, t) {
        e.preventDefault();

        Meteor.logout(function (error) {
            if (error) {
                console.log('Unable to logout. Reason: ' + error.reason);
            }
        });
    }
});