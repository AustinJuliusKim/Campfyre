(function () {
//seed groups
    if (!Groups.find().count()) {
        Groups.insert({
            name: 'The Oasis'
        });

        Groups.insert({
            name: 'The Desert'
        });
    }

//seed dummy users
    if (!Meteor.users.find().count()) {
        var userId;
        for (var i = 1; i <= 5; i++) {
            userId = Meteor.users.insert({
                username: 'dummyUser0' + i,
                "services": {
                    "password": {
                        "bcrypt": "$2a$10$VUBLmUbT9M2XfCDSMFMIgOfJYOCkWTgKEejUMWkcrJ6o6wBiCcAwW"
                    }
                },
                "profile": {}
            });

            Profiles.insert({
                avatar: assignRandomAvatar(),
                user: 'dummyUser0' + i,
                userId: userId
            });
        }
    }

    function assignRandomAvatar() {
        var avatars = [
            'http://i.imgur.com/tLsEqDo.png',
            'http://i.imgur.com/6G0BDmB.png',
            'http://i.imgur.com/c0CeFRH.png',
            'http://i.imgur.com/ENQREiE.png'
        ];
        var randomNum = Math.floor(Math.random() * 4);
        return avatars[randomNum];
    }
})();