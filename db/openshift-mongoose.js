const {mongoURL} = require('../config/openshift-config');

var mongoose = require('mongoose');
//mongo db native driver ,
// mongoose ORM = mongoose Object Relational Mapping

//promise comes form the blue birds it got integrated by the bluebird

mongoose.Promise = global.Promise;
console.log(mongoURL);
mongoose.connect(`${mongoURL}`,{ useMongoClient: true });

// mongoose.connect('mongodb://A1bhinish:Nishuraj_13@ds119436.mlab.com:19436/todosapp');


module.exports = {
    mongoose
};