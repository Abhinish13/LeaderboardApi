var {
    port,
    ip
} = require('./config/openshift-config');

var {
    ObjectID
} = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');
const _ = require('lodash');
var path = require('path');

var host_Url = "http://127.0.0.1:5500";

console.log(`${host_Url}`);


var {
    mongoose
} = require('./db/openshift-mongoose');
var {
    Player
} = require('./models/player');



var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


app.get('/leaderboard', (req, res) => {
    Player.find().then((player) => {
        res.header('Access-Control-Allow-Origin', host_Url).send({
            player
        })
    }, (e) => {
        res.status(400).send(e);
    });

});


app.get('/score/:id', (req, res) => {
    console.log(req.params)

    var id = req.params.id;
    console.log(id);
    if (!ObjectID.isValid(id)) {
        res
            .status(404)
            .send('Id not valid');
    }


    Player.findById(id).then((player) => {
        res.send({
            player
        })
    }, (e) => {
        res.status(400).send(e);
    });

});



//this is used for updating the score by 1

app.patch('/addOne/:id', (req, res) => {
    var id = req.param.id;

    Player.findOneAndUpdate(id, {
        $inc: {
            "score": 1
        }
    }, {
        new: false
    }).then((player) => {
        if (!player) {
            return res.status(404).send("player is empty");
        }

        res.send({
            player
        });
    }).catch((e) => {
        res.status(400).send(e);
    })

});

//this is used for updating the score by 5

app.patch('/addFive/:id', (req, res) => {
    var id = req.param.id;

    Player.findOneAndUpdate(id, {
        $inc: {
            "score": 5
        }
    }, {
        new: false
    }).then((player) => {
        if (!player) {
            return res.status(404).send("player is empty");
        }

        res.send({
            player
        });
    }).catch((e) => {
        res.status(400).send(e);
    })

});

//this is used for updating the score by 10

app.patch('/addTen/:id', (req, res) => {
    var id = req.param.id;

    Player.findOneAndUpdate(id, {
        $inc: {
            "score": 10
        }
    }, {
        new: false
    }).then((player) => {
        if (!player) {
            return res.status(404).send("player is empty");
        }

        res.send({
            player
        });
    }).catch((e) => {
        res.status(400).send(e);
    })

});

//this is used for updating the score by 20

app.patch('/addTwenty/:id', (req, res) => {
    var id = req.param.id;

    Player.findOneAndUpdate(id, {
        $inc: {
            "score": 20
        }
    }, {
        new: false
    }).then((player) => {
        if (!player) {
            return res.status(404).send("player is empty");
        }

        res.send({
            player
        });
    }).catch((e) => {
        res.status(400).send(e);
    })

});

//set score for the player
app.get('/setScore/:id/:score', (req, res) => {
    var id = req.param.id;
    var score1 = req.param('score');

    Player.findOneAndUpdate(id, {
        $set: {
            score: score1
        }
    }, {
        new: false
    }).then((player) => {
        if (!player) {
            return res.status(404).send("player is empty");
        }

        res.header('Access-Control-Allow-Origin', host_Url).send();
    }).catch((e) => {
        res.status(400).send(e);
    })

});


//home path of the app

app.get('/', (req, res) => {


    res.header('Access-Control-Allow-Origin', host_Url).sendFile(path.join(__dirname, 'index.html'));


});



app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = {
    app
};