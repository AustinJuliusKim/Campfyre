Meteor.publish('groups', function () {
    return Groups.find();
});

Meteor.publish('publicMessages', function (id) {
    check(id, String);
    return Messages.find({private: false, contextId: id});
});

//add addition constraints authorId: this.id?
Meteor.publish('privateMessages', function (id) {
    check(id, String);
    return Messages.find({private: true, contextId: id});
});

Meteor.publish('users', function () {
    return Meteor.users.find();
});