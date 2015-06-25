Template.userItem.helpers({
    name: function () {
        return this.username;
    },
    hasNotification: function () {
        //return !!Notifications.find({senderId: this.username, userId: Meteor.userId()});
    }
});