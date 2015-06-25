(function () {
    Template.chat.helpers({
        groups: function () {
            return Groups.find();
        },
        users: function () {
            return Meteor.users.find({_id:{$ne: Meteor.userId()}});
        },
        heading: function () {
            return Session.get('currentContext');
        }
    });

    Template.chat.events({
        'submit #input-panel': function (e, t) {
            e.preventDefault();

            var inputElement = t.find('#input-box');
            var content = inputElement.value;
            var context = this;

            //clear inputbox
            inputElement.value = '';
            var msg = {
                context: context.name || context.username,
                contextId: context._id,
                content: content,
                private: assignPrivacy()
            };


            Meteor.call('messageInsert', msg, function (error, result) {
                if (error) {
                    console.log(error.reason)
                } else {
                    //change to Autorun later
                    $('#display').scrollTop($('#display')[0].scrollHeight);
                }
            })
        }
    });

    function assignPrivacy() {
        var route = Router.current().url;
        var regex = new RegExp("/private/");
        var isPrivate = route.match(regex) == '/private/';
        return isPrivate;
    }
})();