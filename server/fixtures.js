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
    for (var i = 1; i <= 5; i++) {
        Meteor.users.insert({
            username: 'dummyUser0' + i,
            "services": {
                "password": {
                    "bcrypt": "$2a$10$VUBLmUbT9M2XfCDSMFMIgOfJYOCkWTgKEejUMWkcrJ6o6wBiCcAwW"
                }
            },
            "profile": {}
        });
    }
}