Template.logoutForm.events({
    'click #logout-btn': function (e, t) {
        e.preventDefault();

        Meteor.logout(function (error) {
            if (error) {
                console.log('Unable to logout. Reason: ' + error.reason);
            }
        });
    }
});