Template.chat.helpers({
    groups: function () {
        return Groups.find();
    }
});

Template.chat.events({
    'submit #input-panel': function (e, t) {
        e.preventDefault();

        var inputElement = t.find('#input-box');
        var content = inputElement.value;
        var context = this;

        console.log(context);

        //clear inputbox
        inputElement.value = '';

        var msg = {
            context: context.name,
            contextId: context._id,
            content: content
        };


        Meteor.call('messageInsert', msg, function (error, result) {
            if (error) {
                console.log(error.reason)
            }
        })
    }
});
