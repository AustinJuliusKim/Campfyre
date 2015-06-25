Notifications = new Mongo.Collection('notifications');

Notifications.allow({
    update: function (userId, doc, fieldNames) {
        return ownMsg(userId, doc) &&
            fieldNames.length === 1 && fieldNames[0] === 'read';
    },
    remove: function (userId, post) {
        return true;
    }
});

createMessageNotification = function (msg, msgId) {
    if (msg.authorId !== msg.contextId) {
        Notifications.insert({
            userId: msg.contextId,
            messageId: msgId,
            senderId: msg.authorId,
            senderName: msg.author,
            read: false
        });
    }
};