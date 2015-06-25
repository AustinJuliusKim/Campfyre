Template.chat.helpers({
    groups: function () {
        return Groups.find();
    },
    users: function () {
        return Meteor.users.find();
    },
    heading: function () {
        var id = Session.get('currentContextId');
        var currentContext = Groups.findOne(id) || Meteor.users.findOne(id);
        return currentContext.name || currentContext.username;
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
            context: context.name || context.username,
            contextId: context._id,
            content: content,
            private: assignPrivacy()
        };

        console.log(msg);

        Meteor.call('messageInsert', msg, function (error, result) {
            if (error) {
                console.log(error.reason)
            }
        })
    }
});

function assignPrivacy() {
    var route = Router.current().url;
    console.log(route);
    var regex = new RegExp("/private/");
    var isPrivate = route.match(regex) == '/private/';
    return isPrivate;
}