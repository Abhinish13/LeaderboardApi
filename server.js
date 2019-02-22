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
//
// //
// // var Todo = mongoose.model('Todo', {
// //    text : {
// //        type: String,
// //        required: true,
// //        minlength: 1,
// //        trim:true
// //
// //    } ,
// //     complete: {
// //        type:Boolean,
// //         default:false
// //     },
// //     completedAt : {
// //        type:Number,
// //         default:null
// //     }
// // });
// //
// // var newTodo = new Todo({
// //     text : 'Cook dinner',
// //     complete:false,
// //     completedAt:10
// // }) ;
// //
// // newTodo.save().then(
// //     (doc) =>
// //         console.log('Saved Todo',doc)
// //     ,(e) => console.log('Unable to save todo')
// // );
// // //Creating of todo
// // var myTodo = new Todo({
// //     text:'Going Home from market',
// //     complete:false,
// //     completedAt:20
// // });
// // //Saving of todo
// // myTodo.save().then((doc) =>
// // console.log(JSON.stringify(doc, undefined,2))
// //     ,(e) =>
// //         console.log('Unable to save the myTodo')
// // );
// //
// //
// // var new2Todo = new Todo({
// //     text:true
// // });
// //
// // new2Todo.save().then((doc) =>
// //
// //    console.log(doc)
// // ,(e) => console.log('Unable to save the doc'));
//
// //new user model email -require trim it set minlength=1
// // password
//
// // var User = mongoose.model('User', {
// //     email : {
// //         type: String,
// //         required: true,
// //         minlength: 1,
// //         trim:true
// //     },
// //     password : {
// //         type: String,
// //         minlength:5,
// //         trim: true
// //     }
// // });
//
// //Creating new User object
//
// // var user = new User({
// //     email:'      abhinish@gmail.com        '
// // });
// //
// // user.save().then((doc) =>
// //     console.log(doc)
// // ,(e)=> console.log('Unable to save the doc'));
//

//
//
// app.get('/',(req,res)=> {
//     res
//         .status(200)
//         .send('You are at home');
// });
//
// app.post('/todos', authenticate, (req,res) =>{
//     var todo = new Todo({
//        text: req.body.text,
//         completedAt: req.body.completedAt,
//         complete: req.body.complete,
//         _creator:req.user._id
// });
//
//     todo.save().then((doc) =>{
//     res.status(200).send(doc);
//     },(e) => {
//         res.status(400).send(e);
//     });
// });
//
//
// //to fetch the all the todo
//
// app.get('/todos',authenticate,(req,res) => {
//    Todo.find({
//        _creator:req.user._id
//    }).then((todos) => {
//        res.send({todos})
//    },(e) => {
//        res.status(400).send(e);
//    });
// });
//
// //GET /todos/12345645
//
// app.get('/todos/:id', (req,res) => {
//
//     console.log(req.params)
//
//     var id = req.params.id;
//         console.log(id);
//     if (!ObjectID.isValid(id)){
//         res
//             .status(404)
//             .send('Id not valid');
//     }
//
//     Todo.findById(
//         id
//     ).then((todos) => {
//         console.log(todos);
//         res.status(200).send({todos})},
//         (e) => {
//         res.status(400).send(e);
//         }
//     );
//
//     // res.send(req.params);
//
//     //valid id using isValid
//     //404 -send empty
//
//     //findById
//     //success message
//         //if todo -send it back
//         //if no todo - send back 404  with empty body
//     //error
//         //400 and -send empty case
// });
//
// app.delete('/todos/:id',authenticate, (req,res) => {
//    var id = req.param.id;
//
//    if (!ObjectID.isValid(id)){
//        return res.status(404).send();
//    }
//
//    Todo.findByIdAndRemove({
//        _id:id,
//        _creator: req.user._id
//    }).then((todo) => {
//        if(!todo) {
//            return res.status(404).send();
//        }
//
//        res.send({todo});
//    }).catch((e) => {
//        res.status(400).send(e);
//    });
// });
//
// app.patch('/todos/:id',(req,res)=>{
//    var id = req.param.id;
//    var body = _.pick(req.body, ['text', 'completed']);
//
//    if (!ObjectID.isValid(id)){
//        return res.status(404).send();
//    }
//
//    if(_.isBoolean(body.completed) && body.completed) {
//        body.completedAt = new Date().getTime();
//    } else {
//        body.completed = false;
//        body.completedAt = null;
//    }
//
//
//
//    Todo.findByIdAndUpdate(id, {$set:body}, {new: true}).then((todo) =>{
//        if(!todo){
//            return res.status(404).send();
//        }
//
//        res.send({todo});
//    }).catch((e) => {
//        res.status(400).send();
//    })
//
// });
//
// app.get('/user/:id', (req,res) => {
//    console.log(req.params);
//
//    var id = req.params.id;
//     console.log(id);
//     if(!ObjectID.isValid(id)){
//         res
//             .status(400)
//             .send('Id not valid');
//     }
//
//     User.findById(
//         id
//     ).then((user) => {
//         if(user){
//         console.log(user);
//         res.status(200).send({user})}
//         else {
//             res.status(404).send('User not exist');
//         }
//     }, (e) => {
//         res.status(400).send(e);
//     })
// });
//
// //post /users
// app.post('/users' , (req, res) => {
//     var body = _.pick(req.body, ['email', 'password']);
//     var user = new User(body);
//
//     user.save().then(() => {
//         // res.send(user);
//         return user.generateAuthToken();
//
//     }).then((token) => {
//         res.header('x-auth', token).send(user);
//     }).catch((e) => {
//         res.status(400).send(e);
//     })
// });
//
// //middle ware for the Authentication
//
//
// app.get('/users/me',authenticate , (req,res) => {
//
//     // var token = req.header('x-auth');
//     //
//     // User.findByToken(token).then((user) => {
//     //     if(!user){
//     //
//     //         return Promise.reject();
//     //     }
//     //
//     //     res.send(user);
//     //
//     // }).catch((e) => {
//     //     res.status(401).send();
//     // });
//     res.send(req.user);
//
//
// });
//
// //post /users/login {email , password}
//
// app.post('/users/login',(req,res) => {
//     var body = _.pick(req.body, ['email', 'password']);
//
//     User.findByCredentials(body.email,body.password).then((user) => {
//         return user.generateAuthToken().then((token)=> {
//             res.header('x-auth', token).send(user);
//         })
//         // res.send(user);
//
//     }).catch((e) => {
//         res.status(400).send();
//     });
//
//       // res.send(body);
// });
//
// app.delete('/users/me/token', authenticate , (req,res) => {
//     req.user.removeToken(req.token).then(() => {
//         res.status(200).send();
//     }, () => {
//         res.status(400).send();
//     });
// });
//

//app.get('/todos',authenticate,(req,res) => {
//    Todo.find({
//        _creator:req.user._id
//    }).then((todos) => {
//        res.send({todos})
//    },(e) => {
//        res.status(400).send(e);
//    });
// });

app.get('/leaderboard',(req,res) => {
    Player.find().then((player) => {
        res.header('Access-Control-Allow-Origin','*').send({player})
    },(e) => {
        res.status(400).send(e);
    });

});

//app.get('/todos/:id', (req,res) => {
//
//     console.log(req.params)
//
//     var id = req.params.id;
//         console.log(id);
//     if (!ObjectID.isValid(id)){
//         res
//             .status(404)
//             .send('Id not valid');
//     }
//
//     Todo.findById(
//         id
//     ).then((todos) => {
//         console.log(todos);
//         res.status(200).send({todos})},
//         (e) => {
//         res.status(400).send(e);
//         }
//     );
//
//     // res.send(req.params);
//
//     //valid id using isValid
//     //404 -send empty
//
//     //findById
//     //success message
//         //if todo -send it back
//         //if no todo - send back 404  with empty body
//     //error
//         //400 and -send empty case
// });

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


//post /users
// app.post('/users' , (req, res) => {
//     var body = _.pick(req.body, ['email', 'password']);
//     var user = new User(body);
//
//     user.save().then(() => {
//         // res.send(user);
//         return user.generateAuthToken();
//
//     }).then((token) => {
//         res.header('x-auth', token).send(user);
//     }).catch((e) => {
//         res.status(400).send(e);
//     })
// });

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
        res.header('Access-Control-Allow-Origin','http://localhost:63342').send(player.id);
        // if(!player){
        //     res.status(404).send();
        // }else {
        //     res.send(player);
        // }
    }).catch((e) => {
        res.status(400).send(e);
    })
});

// app.patch('/todos/:id',(req,res)=>{
//    var id = req.param.id;
//    var body = _.pick(req.body, ['text', 'completed']);
//
//    if (!ObjectID.isValid(id)){
//        return res.status(404).send();
//    }
//
//    if(_.isBoolean(body.completed) && body.completed) {
//        body.completedAt = new Date().getTime();
//    } else {
//        body.completed = false;
//        body.completedAt = null;
//    }
//
//
//
//    Todo.findByIdAndUpdate(id, {$set:body}, {new: true}).then((todo) =>{
//        if(!todo){
//            return res.status(404).send();
//        }
//
//        res.send({todo});
//    }).catch((e) => {
//        res.status(400).send();
//    })
//
// });


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

        res.header('Access-Control-Allow-Origin','http://localhost:63342').send(player);
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