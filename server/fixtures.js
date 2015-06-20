if (!Groups.find().count()) {
    Groups.insert({
        name: 'The Oasis'
    });
}