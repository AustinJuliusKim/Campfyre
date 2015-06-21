Meteor.publish('groups', function () {
    return Groups.find();
});

Meteor.publish('messages', function () {
    return Messages.find();
});

Meteor.publish('allUserNames', function(){
	return Meteor.users.find({}, {fields:{
		"username": 1
	}})
})