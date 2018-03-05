var path = require("path");
var friendObject = require("../data/friends.js");
var _ = require("underscore")._

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendObject);
    });

    app.post("/api/friends", function(req, res) {
        var userData = req.body;
        var userName = userData.name;
        var userPhoto = userData.photo;
        var userScores = userData.scores;
        var friendRank = [];
        var bestMatch = {
            name: "",
            photo: ""
        }

        for(var i = 0; i < friendObject.length; i++) {
            var friendScores = friendObject[i].scores;
            var scoreDifference = 0;

            for(var j = 0; j < userScores.length; j++) {
                if(Number(userScores[j]) !== Number(friendScores[j])) {
                   scoreDifference += Math.abs(Number(userScores[j]) - Number(friendScores[j]));
                }
            }
            friendRank.push(scoreDifference);
        }

        var indexOfBestMatch = _.indexOf(friendRank, _.min(friendRank));
        bestMatch.name = friendObject[indexOfBestMatch].name;
        bestMatch.photo = friendObject[indexOfBestMatch].photo;

        friendObject.push(userData);
        res.json(bestMatch);
        
    });
}