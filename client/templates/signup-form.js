(function () {
    Template.signupForm.events({
        'submit #signup-form': function (e, t) {
            e.preventDefault();
            Accounts.createUser({
                username: t.find('#signup-username').value,
                password: t.find('#signup-password').value
            }, function (error) {
                if (error) {
                    console.log("Account not created. Reason: " + error.reason);
                } else {
                    var avatars = [
                        'http://i.imgur.com/tLsEqDo.png',
                        'http://i.imgur.com/6G0BDmB.png',
                        'http://i.imgur.com/c0CeFRH.png',
                        'http://i.imgur.com/ENQREiE.png'
                    ];
                    var randomNum = Math.floor(Math.random() * 4);
                    var userId = Meteor.userId();
                    var profile = {
                        avatar: avatars[randomNum]
                    };
                    Meteor.call('profileInsert', profile, function (error, result) {
                        if (error) {
                            console.log(error.reason)
                        }
                    });
                }
            });
        },
        'click #back-button': function (e, t) {
            e.preventDefault();
            Session.set('clickedSignup', false);
        }
    });
})();