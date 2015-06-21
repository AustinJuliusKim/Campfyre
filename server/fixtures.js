if (!Groups.find().count()) {
    Groups.insert({
        name: 'The Oasis'
    });
}

Meteor.startup(function() {
	if (Messages.find().count() === 0){
		for ( var i = 0; i < 10; i ++ ){
			Messages.insert({content: "A dummy message"});
		}
	}
});