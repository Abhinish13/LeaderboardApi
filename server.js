var port = require('./config/openshift-config').port,
    ip = require('./config/openshift-config').ip;

var ObjectID = require('mongodb').ObjectID;
var express = require('express');
var bodyParser = require('body-parser');
const _ = require('lodash');
var path = require('path');




var mongoose = require('./db/openshift-mongoose').mongoose;
var Player = require('./models/player').Player;

var app = express();

app.use(express.static(__dirname + '/public'));


app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/leaderboard',(req,res) => {
    Player.find().then((player) => {
        res.header('Access-Control-Allow-Origin','*').send({player})
    },(e) => {
        res.status(400).send(e);
    });

});



app.get('/score/:id',(req,res) => {
    console.log(req.params)

    var id = req.params.id;
        console.log(id);
    if (!ObjectID.isValid(id)){
        res
            .status(404)
            .send('Id not valid');
    }


    Player.findById(id).then((player) => {
        res.send({player})
    },(e) => {
        res.status(400).send(e);
    });

});




//for creating the player in the database
app.post('/player',(req,res) => {
    var body = _.pick(req.body, ['name','score']);
    var player = new Player(body);

    player.save().then(() => {
        res.send(player);
        // if(!player){
        //     res.status(404).send();
        // }else {
        //     res.send(player);
        // }
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.get('/player/:name',(req,res) => {
    var name = req.params.name;
    var player = new Player();
    player.name = name;
    player.save().then(() => {
        res.header('Access-Control-Allow-Origin','*').send(player.id);
        // if(!player){
        //     res.status(404).send();
        // }else {
        //     res.send(player);
        // }
    }).catch((e) => {
        res.status(400).send(e);
    })
});



//this is used for updating the score by 1

app.patch('/addOne/:id',(req,res) => {
    var id = req.params.id;

    Player.findOneAndUpdate(id,{$inc: { "score" : 1 }},{new:false}).then((player) => {
        if(!player){
            return res.status(404).send("player is empty");
        }

        res.send({player});
    }).catch((e) => {
        res.status(400).send(e);
    })

});

//this is used for updating the score by 5

app.patch('/addFive/:id',(req,res) => {
    var id = req.param.id;

    Player.findOneAndUpdate(id,{$inc: { "score" : 5 }},{new:false}).then((player) => {
        if(!player){
            return res.status(404).send("player is empty");
        }

        res.send({player});
    }).catch((e) => {
        res.status(400).send(e);
    })

});

//this is used for updating the score by 10

app.patch('/addTen/:id',(req,res) => {
    var id = req.param.id;

    Player.findOneAndUpdate(id,{$inc: { "score" : 10 }},{new:false}).then((player) => {
        if(!player){
            return res.status(404).send("player is empty");
        }

        res.send({player});
    }).catch((e) => {
        res.status(400).send(e);
    })

});

//this is used for updating the score by 20

app.patch('/addTwenty/:id',(req,res) => {
    var id = req.param.id;

    Player.findOneAndUpdate(id,{$inc: { "score" : 20 }},{new:false}).then((player) => {
        if(!player){
            return res.status(404).send("player is empty");
        }

        res.send({player});
    }).catch((e) => {
        res.status(400).send(e);
    })

});

//set score for the player
app.get('/setScore/:id/:score',(req,res) => {
    var id = req.params.id;
    var score1 = req.params.score;
    //console.log(id);
    Player.findByIdAndUpdate(id,{$set: {score: score1}},{new:false}).then((player) => {
        if(!player){
            return res.status(404).send("player is empty");
        }

        res.set({
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token',
            'Access-Control-Allow-Credentials': true
        }).send(player);
    }).catch((e) => {
        res.status(400).send(e);
    })

});


//home path of the app

// app.get('/',(req,res) => {
//
//
//     res.header('Access-Control-Allow-Origin','http://localhost:63342').send();
//
// });

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});



app.listen(port, ip);
console.log('Server running on http://%s:%s kindly follow the link', ip, port);

module.exports = {app};