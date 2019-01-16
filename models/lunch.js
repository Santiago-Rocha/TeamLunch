var mongoose = require("mongoose");
var Schema =  mongoose.Schema;
var User = mongoose.model('User');

//mongoose.connect("mongodb://localhost/almuerzo", {useNewUrlParser:true});
mongoose.connect("mongodb://srd98:Thruman98@ds211083.mlab.com:11083/teamlunch-database", {useNewUrlParser:true});

 
var lunch_schema =  new Schema({
    date: Date,
    heater: [{type: Schema.ObjectId, ref: "User" }],
    participants: [{type: Schema.ObjectId, ref: "User" }]
});

var Lunch =  mongoose.model("Lunch",lunch_schema);

module.exports.Lunch = Lunch;