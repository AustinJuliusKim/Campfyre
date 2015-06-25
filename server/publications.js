Meteor.publish('groups', function () {
    return Groups.find();
});

Meteor.publish('publicMessages', function (id) {
    check(id, String);
    return Messages.find({private: false, contextId: id});
});

Meteor.publish("privateMessages", function (id) {
    check(id, String);
    var selector1 = {private: true, contextId: this.userId, authorId: id};
    var selector2 = {private: true, contextId: id, authorId: this.userId};
    return Messages.find({
        $or: [selector1, selector2]
    })
});

//users
Meteor.publish('users', function () {
    return Meteor.users.find({}, {username: 1});
});

Meteor.publish('userPresence', function () {

});