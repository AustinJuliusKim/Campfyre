Template.messageItem.helpers({
    content: this.content,
    author: this.author,
    timestamp: this.timestamp,
    avatar: function () {
        return Profiles.findOne({'userId': this.authorId}).avatar;
    }
});
