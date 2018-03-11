var express = require("express");
var app = express();

app.use(express.static(__dirname + "/public"))

var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

var playerOne = {"playerId": 1, "nickname": "", choice: ""};
var playerTwo = {"playerId": 2, "nickname": "", choice: ""};

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});



app.get("/get-users", function(req, res) {
    var response = {"status": 200, players: []};
    response.players.push(playerOne);
    response.players.push(playerTwo);
    res.json(response);
});


app.post("/register-user", function(req, res) {
    var response = {"status": 200, players: []};

    if (req.body.playerId === "1") {
        playerOne.nickname = req.body.chosenNickname;
    }
    if (req.body.playerId === "2") {
        playerTwo.nickname = req.body.chosenNickname;
    }
    response.players.push(playerOne);
    response.players.push(playerTwo);
    res.json(response);
});


// Ex. URL: /choose/rock?playerId=1
app.get("/choose/:choice", function(req, res) {
    var response = {"status": 200};
    console.log("This is the choice ", req.params.choice);
    console.log("This is the playerId ", req.query.playerId);

    

// todo find the player object by player Id and set their choice

    res.json(response);
});

app.get("/get-results", function(req, res) {
    var response = {"status": 200};

    if (playerOne.choice === "" || playerTwo.choice === "") {
         response.winner = "not yet";
    } else {
        response.winner = rockScissorsPaperLogic(playerOne.choice, playerTwo.choice);
    }
    res.json(response);
});


/* @return returns 1 if player 1 won, returns 2 if player 2 won or returns 0 if draw */
function rockScissorsPaperLogic(playerOneChoice, playerTwoChoice) {
    var choices = ["rock", "paper", "scissor"];

    if(playerOneChoice==choices[0] && playerTwoChoice==choices[2]) {

        return 1;
    }
    else if(playerOneChoice==choices[1] && playerTwoChoice==choices[0]) {
        return 1;
    }
    else if(playerOneChoice==choices[2] && playerTwoChoice==choices[1]) {
        return 1;
    }
    else if(playerOneChoice==choices[0] && playerTwoChoice==choices[0] 
        || playerOneChoice==choices[1] && playerTwoChoice==choices[1]
        || playerOneChoice==choices[2] && playerTwoChoice==choices[2]) {
         return 0;
     }

     else {
         return 2;
     }

}


var server = app.listen("3000", function(err) {
    if (err) {
        console.log("Server couldn't start.");
    }
    console.log("Server started on port", server.address().port);
});