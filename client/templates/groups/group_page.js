Template.groupPage.helpers({
    name: function () {
        return this.name;
    },
    messages: function () {
        return Messages.find();
    }
});