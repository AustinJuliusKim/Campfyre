ownMsg = function (userId, msg) {
    return msg && msg.authorId == userId;
};