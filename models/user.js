var mongoose = require("mongoose");
var Schema =  mongoose.Schema;

//mongoose.connect("mongodb://localhost/almuerzo", {useNewUrlParser:true});
mongoose.connect("mongodb://srd98:Thruman98@ds211083.mlab.com:11083/teamlunch-database", {useNewUrlParser:true});

 
var user_schema =  new Schema({
    name: String,
    last_name: String,
    last_lunch: Date,
    benefits: Number
});

var User =  mongoose.model("User",user_schema);

module.exports.User = User;