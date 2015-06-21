Template.chat.helpers({
    groups: function () {
        return Groups.find();
    }
});

Template.chat.events({
    'submit #input-panel': function (e, t) {
        e.preventDefault();

        var inputElement = t.find('#input-box');
        var author = Meteor.userId();
        var content = inputElement.value;
        var context = this.name;
        var timestamp = new Date.now();

        //clear inputbox
        inputElement.value = '';

        var msg = {
            author: author,
            context: context,
            content: content,
            timestamp: timestamp
        };

        Messages.insert(msg);
    }
});

// removed contextId: context._id