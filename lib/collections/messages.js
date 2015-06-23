Messages = new Mongo.Collection('messages');

Meteor.methods({
    messageInsert: function (msg) {
        check(Meteor.userId(), String);
        check(msg, {
            content: String,
            context: String,
            contextId: String,
            private: Boolean
        });

        var user = Meteor.user();
        var msg = _.extend(msg, {
            author: user.username,
            authorId: user._id,
            timestamp: new Date()
        });

        Messages.insert(msg);
    }
});