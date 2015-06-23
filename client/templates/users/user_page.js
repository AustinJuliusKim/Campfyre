Template.privatePage.helpers({
    name: function () {
        return this.username
    },

    messages: function () {
        return Messages.find();
    }
});

