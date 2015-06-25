Profiles = new Mongo.Collection('profiles');

Meteor.methods({
    profileInsert: function (profile) {
        check(profile, {
            avatar: String
        });

        var user = Meteor.user();
        var msg = _.extend(profile, {
            user: user.username,
            userId: user._id,
            timestamp: new Date()
        });

        Profiles.insert(profile);
    }
});