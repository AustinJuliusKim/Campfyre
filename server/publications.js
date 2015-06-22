Meteor.publish('groups', function () {
    return Groups.find();
});

Meteor.publish('messages', function () {
    return Messages.find();
});

Meteor.publish('allUsers', function () {
    return Meteor.users.find();
});