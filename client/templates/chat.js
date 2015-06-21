Template.chat.helpers({
    groups: function () {
        return Groups.find();
    }
});

// Template.chat.events({
//     'submit #input-panel': function (e, t) {
//         e.preventDefault();

//         var inputElement = t.find('#input-box');
//         var author = Meteor.user();
//         var content = inputElement.value;
//         var context = this.name;
//         var timestamp = new Date();

//         //clear inputbox
//         inputElement.value = '';

//         var msg = {
//             author: author.username,
//             authorId: author._id,
//             context: context,
//             contextId: context._id,
//             content: content,
//             timestamp: timestamp
//         };

//         Messages.insert(msg);
//     }
// });

Template.chat.events({
  'keypress input': function(e) {
    var inputVal = $('#input-box').val();
    if(!!inputVal) {
      var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
      if (charCode == 13) {
        e.stopPropagation();
        Messages.insert({text: $('#input-box').val()});
        $('#input-box').val("");
        return false;
      }    
    }
  }
});