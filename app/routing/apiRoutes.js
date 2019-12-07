let friends = require("../data/friends");

module.exports = function (app) {
    app.get(`/api/friends`, (req, res) => {
        res.json(friends);
    });

    app.post(`/api/friends`, (req, res) => {
        let closeMatch = {
            name: "",
            photo: "",
            diff: Infinity
        };

        let userData = req.body;
        let score = userData.scores;
        let totalDiff;
        let currentFriend;
        let length;
        for (let i = 0; i < friends.length; i++) {
            currentFriend = friends[i];
            totalDiff = 0;
            length = currentFriend.score[i];
            for (let j = 0; j < length; j++) {
                let currentScore = currentFriend.score[i];
                let userScore = score[j];

                totalDiff += Math.abs(parseInt(userScore) - parseInt(currentScore));
            }
            if (totalDiff <= closeMatch.diff) {
                closeMatch.name = currentFriend.name;
                closeMatch.photo = currentFriend.photo;
                closeMatch.diff = totalDiff;
            }
        }
        res.json(closeMatch);
    });

};