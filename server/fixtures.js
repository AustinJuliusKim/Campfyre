(function () {
//seed groups
    if (!Groups.find().count()) {
        var OasisId = Groups.insert({
            name: 'The Oasis'
        });

        Groups.insert({
            name: 'The Desert'
        });
    }

//seed dummy users
    if (!Meteor.users.find().count()) {
        var avatars = [
            'http://i.imgur.com/6G0BDmB.png',
            'http://i.imgur.com/tLsEqDo.png',
            'http://i.imgur.com/c0CeFRH.png',
            'http://i.imgur.com/ENQREiE.png'
        ];
        var name;
        var msg;

        //Richard Hendrix
        name = 'Richard Hendrix';
        msg = "Jobs was a poser. He didn't even write code.";
        addUser(name, msg, 0);

        //Erlich Bachman
        name = 'Erlich Bachman';
        msg = "You look like a ferret that gave up on himself six months ago, Gilfoyle";
        addUser(name, msg, 1);

        //Gilfoyle
        name = 'Bertram Gilfoyle';
        msg = "What do I do? System Architecture. Networking and Security. No one in this house can touch me on that. But does anyone appreciate that? While you were busy minoring in gender studies and singing acapella at Sarah Lawerence, I was getting root access to NSA servers. I was a click away from starting a second Iranian revolution. I prevent cross site scripting, I monitor for DDoS attacks, emergency database rollbacks, and faulty transaction handlings. The internet, heard of it? Transfers half a petabyte of data a minute, do you have any idea how that happens? All of those YouPorn ones and zeros streaming directly to your shitty little smart phone day after day. Every dipshit who shits his pants if he can't get the new dubstep Skrillex remix in under 12 seconds. It's not magic, it's talent and sweat. People like me ensuring your packets get delivered unsniffed. So what do I do? I make sure that one bad config on one key component doesn't bankrupt the entire ****ing company. That's what the **** I do.";
        addUser(name, msg, 2);

        //Dinesh Chugtai
        name = 'Dinesh Chugtai';
        msg = "You know who else is Canadian? Justin Bieber. The Hitler of music.";
        addUser(name, msg, 3);

        //Original Jared
        name = 'Donald Jared Dunn';
        msg = "You know, Hitler actually played the bassoon. So, technically, Hitler was the Hitler of music. ";
        addUser(name, msg, 0);
    }

    function addUser(name, msg, num) {
        var userId = Meteor.users.insert({
            username: name,
            "services": {
                "password": {
                    "bcrypt": "$2a$10$VUBLmUbT9M2XfCDSMFMIgOfJYOCkWTgKEejUMWkcrJ6o6wBiCcAwW"
                }
            },
            "profile": {}
        });

        Profiles.insert({
            avatar: avatars[num],
            user: name,
            userId: userId
        });

        Messages.insert({
            context: 'The Oasis',
            contextId: OasisId,
            content: msg,
            private: false,
            author: name,
            authorId: userId,
            timestamp: new Date()
        });
    }
})();

