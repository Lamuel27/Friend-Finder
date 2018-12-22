var list = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(list);
    });

    app.post("/api/friends", function (req, res) {
        var user = req.body;

        for (var i = 0; i < user.scores.length; i++) {
            user.scores[i] = parseInt(user.scores[i]);
        }
// create variables for the best match and minimum difference
        var bestMatch = 0;
        var minDifference = 30;
// create formula to find the best match
        for (var i = 0; i < list.length; i++) {
            var totalDifference = 0;
            for (var j = 0; j < list[i].scores.length; j++) {
                var difference = Math.abs(user.scores[j] - list[i].scores[j]);
                totalDifference += difference;
            }

            if (totalDifference < minDifference) {
                bestMatch = i;
                minDifference = totalDifference;
            }
        }

        list.push(user);

        res.json(list[bestMatch]);
    });
};