var path = require("path");

var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        
        var user = req.body;

        var response = user.scores;

        var nameMatch = '';
        var imageMatch = '';
        var totalDiff = 500;

        for (var i = 0; i < friends.length; i++) {
            var diff = 0;

                for (var x = 0; x < response.length; x++) {
                    diff += Math.abs(friends[i].scores[x] - response[x]);

                }

                if (diff < totalDiff) {
                    totalDiff = diff;
                    nameMatch = friends[i].name;
                    imageMatch = friends[i].photo;
                }
        }

        friends.push(user);

        res.json({status: "OK", nameMatch: nameMatch, imageMatch: imageMatch});
        console.log("nameMatch: " + nameMatch);
        console.log("imageMatch: " + imageMatch)

    });
};
