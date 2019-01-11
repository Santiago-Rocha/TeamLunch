var express = require("express");
var bodyParser =  require("body-parser");
var User = require("./models/user").User;
var Lunch = require("./models/lunch").Lunch;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("views"));
app.set("view engine","pug");


app.get("/", function(req,res){
    res.render("index");
});

app.get("/hola", function(req, res){
    Lunch.deleteOne({ participants: [] }, function (err) {
        res.send("lo borre");
      });
});

app.post("/user", function(req, res){
    var user =  new User({name: req.body.name, last_name: req.body.last_name, last_lunch: req.body.lunch, benefits: req.body.benefits});
    user.save(function(){
        res.send("holiiii");
    });

});

app.post("/almuerzo", function(req, res){
    User.findOne({name : "Javier"}, function(err,doc){
        var lunch =  new Lunch({date: req.body.date, heater: doc._id});
        lunch.save(function(){
            res.send("holiiii");
        });
    });
});

app.listen(8080);