Meteor.publish('groups', function () {
    return Groups.find();
});

Meteor.publish('publicMessages', function (id) {
    check(id, String);
    return Messages.find({private: false, contextId: id});
});

Meteor.publish("privateMessages1", function (id) {
    check(id, String);
    return Messages.find({private: true, contextId: this.userId, authorId: id});
});

Meteor.publish("privateMessages2", function (id) {
    check(id, String);
    return Messages.find({private: true, contextId: id, authorId: this.userId});
});

Meteor.publish('users', function () {
    return Meteor.users.find({}, {username: 1});
});