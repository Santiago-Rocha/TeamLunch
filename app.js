var express = require("express");
var bodyParser =  require("body-parser");
var User = require("./models/user").User;
var Lunch = require("./models/lunch").Lunch;
var app = express();
var mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("views"));
app.set("view engine","pug");
app.set('port', process.env.PORT || 8080);

app.get("/", function(req,res){
    User.find(function(err,doc){
        console.log(doc);
        res.render("index",{users:doc});
    });
});

app.post("/who", function(req,res){
    console.log(req.body.participants)
    User.aggregate([
        {
            $match: {
                _id : { $in: req.body.participants.map(function(id){return mongoose.Types.ObjectId(id);})}
            }
        },
        {
            $group :{
                _id: { benefits: { $multiply: ['$benefits',-1]}, date: '$last_lunch'},
                docs: {$push: '$$ROOT'}
            }
        },
        {
            $sort: {_id: 1}
        },
        {
            $limit: 2
        }
    ], function(err, docs){
        console.log(docs);
        if(err) res.send("algo salio mal");
        else if(req.body.participants.length > 4){
            if(docs[0].docs.length >= 2) res.send([docs[0].docs[0],docs[0].docs[1]]);
            else res.send([docs[0].docs[0],docs[1].docs[0]]); 
        }
        else res.send([docs[0].docs[0]]);
    });
});

app.get("/user",function(req, res){
    User.find(function(err,doc){
        res.render("user",{users:doc});
    });
});

app.post("/user", function(req, res){
    var user =  new User({name: req.body.name, last_name: req.body.last_name, nick_name : req.body.nickname, last_lunch: req.body.lunch, benefits: req.body.benefits});
    user.save(function(err){
        if(err) res.send("algo salio mal");
        else res.send("usuario guardado");
    });
});

app.get("/add", function(req,res){
    User.find(function(err,doc){
        res.render("add",{users:doc});
    });

    Lunch.find(function(err,doc){
        console.log(doc);
    })
});

app.post("/add", function(req,res){
    var lunch =  new Lunch({date: req.body.date, heater: req.body.heater, participants: req.body.participants });
    lunch.save(function(err){
        if(err) res.send("algo salio mal");
        else{
            heaterLunch(req.body.heater, req.body.date,function(err){
                if(err) res.send("algo salio mal")
                else{
                    participantsLunch(req.body.participants, function(){
                        if(err) res.send("algo salio mal")
                        else{
                            res.send("almuerzo guardado correctamente")
                        }
                    });
                }
            });
        }
    });
})

function heaterLunch(heater, date ,next){
    User.updateMany({_id: heater}, { "$set" : {benefits: 0, last_lunch: date}}, function(err,doc){
        if(err) next(err);
        else next(null);
    });
}

function participantsLunch(pArr, next){
    User.updateMany({_id: {$in : pArr}},{$inc: {benefits: 1}}, 
        function(err, doc){
            if(err) next(err);
            else next(null); 
    });
}


app.get("/hola", function(req, res){

    User.remove({}, function (err) {
        res.send("lo borre");
      });
});

app.listen(app.get('port'));