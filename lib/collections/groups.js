Groups = new Mongo.Collection('groups');

Groups.allow({
    insert: function (userId, doc) {
        return !!userId;
    }
});