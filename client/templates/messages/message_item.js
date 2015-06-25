Template.messageItem.helpers({
    content: this.content,
    author: this.author,
    timestamp: function () {
        var time = this.timestamp;
        if (!time) {
            return;
        }
        time = $.trim(time);
        time = time.replace(/\.\d\d\d+/, ""); // remove the milliseconds
        time = time.replace(/-/, "/").replace(/-/, "/"); //substitute - with /
        time = time.replace(/T/, " ").replace(/Z/, " UTC"); //remove T and substitute Z with UTC
        time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // +08:00 -> +0800
        var parsed_date = new Date(time);
        var relative_to = (arguments.length > 1) ? arguments[1] : new Date(); //defines relative to what ..default is now
        var delta = parseInt((relative_to.getTime() - 25200000 - parsed_date) / 1000);
        delta = (delta < 2) ? 2 : delta;
        var r = '';
        if (delta < 60) {
            r = delta + ' seconds ago';
        } else if (delta < 120) {
            r = 'a minute ago';
        } else if (delta < (45 * 60)) {
            r = (parseInt(delta / 60, 10)).toString() + ' minutes ago';
        } else if (delta < (2 * 60 * 60)) {
            r = 'an hour ago';
        } else if (delta < (24 * 60 * 60)) {
            r = '' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
        } else if (delta < (48 * 60 * 60)) {
            r = 'a day ago';
        } else {
            r = (parseInt(delta / 86400, 10)).toString() + ' days ago';
        }
        return 'about ' + r;
    },
    avatar: function () {
        return Profiles.findOne({'userId': this.authorId}).avatar;
    },
    ownMsg: function () {
        return this.authorId == Meteor.userId();
    }
});

Template.messageItem.events({
    'mouseover .message-options': function (e, t) {
        e.preventDefault();

        t.find('.message-options-clickable').style.marginRight = '27px';
        t.find('.message-options-clickable').style.opacity = '1';
    },
    'mouseout .message-options': function (e, t) {
        e.preventDefault();

        t.find('.message-options-clickable').style.marginRight = '-40px';
        t.find('.message-options-clickable').style.opacity = '0';
    },

    'click .fa-trash-o': function (e, t) {
        e.preventDefault();

        var messageId = this._id;
        bootbox.confirm('Are you sure you want to delete this message?', function (result) {
            if (result) {
                Messages.remove(messageId);
                //@@@remove related notifications;
            }
        });
    },

    'click .fa-pencil': function (e, t) {
        e.preventDefault();

        var messageId = this._id;

        t.find('.message-content').style.display = 'none';
        t.find('.message-content-edit').style.opacity = '1';
        t.find('.message-content-edit').style.height = '122px';
    },

    'click .cancel-edit': function (e, t) {
        e.preventDefault();

        t.find('.message-content').style.display = 'block';
        t.find('.message-content-edit').style.opacity = '0';
        t.find('.message-content-edit').style.height = '0';
    },

    'click .confirm-edit': function (e, t) {
        e.preventDefault();

        var messageId = this._id;
        var newMsgProperties = {
            content: t.find('.edit-area').value,
            lastEdited: new Date()
        };

        Messages.update(messageId, {$set: newMsgProperties}, function (error) {
            if (error) {
                console.log('failed to edit msg because: ' + error.reason);
            }
        });

        t.find('.message-content').style.display = 'block';
        t.find('.message-content-edit').style.opacity = '0';
        t.find('.message-content-edit').style.height = '0';
    }
});