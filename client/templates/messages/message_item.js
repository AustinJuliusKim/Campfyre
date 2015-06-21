Template.messageItem.helpers({
    messages: function(){
    	return Messages.find({}, {sort: {submitted: -1}});
    }
});