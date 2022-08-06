var express=require("express");
var app= express();
var bodyParser=require("body-parser");
var mongoose = require("mongoose");
var cors=require("cors");
var path=require('path');
const Match = require("./models/Match");
var util= require('util');
var encoder = new util.TextEncoder('utf-8');
// var flash=require("connect-flash");
// var Player = require("./models/Player");

const PORT = process.env.PORT || 5000;

// app.use(require("express-session")({
//     secret:"my name is khan",
//     resave:false,
//     saveUninitialized:false
//     }));
app.use(cors())

// mongoose.set('useNewUrlParser',true);
// mongoose.set('useUnifiedTopology',true);
// mongoose.set('useFindAndModify',false);
// mongoose.set('useCreateIndex',true);
mongoose.connect("mongodb+srv://fayeque123:fayeque123@devconnector-mxfos.mongodb.net/test?retryWrites=true&w=majority");
// mongoose.connect("mongodb://localhost/yelp_cam");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");


// app.use(function(req, res, next){
//     res.locals.error = req.flash("error");
//     res.locals.success = req.flash("success");
//     next();
//  });

app.use(express.static(path.join(__dirname, 'build')));

 app.get("/m",async (req,res) => {
    var matches= await Match.find({matchStarted:true}).sort({createdAt:-1});
    // console.log(matches[0].details[matches[0].details.batting]);
    // res.render('home.ejs',{matches:matches});
    res.json({matches});
    // res.render('publicLanding',{players:players,tcm:tcm,acm:amountCollected,totalPlayers:totalPlayers,playersAttend:playersAttend});
 });

 app.post("/",async (req,res) => {
    console.log(req.body);
    var d=new Match({
        matchId:req.body.id,
        details:req.body.data
    });
    var sr=await d.save();
    console.log(sr);
    res.json("Successfull");
 });

 app.post("/match/:matchId",async (req,res) => {
     console.log(req.body);
    var d=await Match.findOne({matchId:req.params.matchId});
    console.log(d);
    d.details = req.body;
    if(!d.matchStarted){
        d.matchStarted = true;
    }
    await d.save();
    res.json("SUccessfull");
});

app.get("/match/:matchId",async (req,res) => {
    var d=await Match.findOne({matchId:req.params.matchId});
    console.log(d);
    // res.render('details',{data:d.details});
    res.json({d});
})

app.get("/match/scorecard/:matchId",async (req,res) => {
    var d=await Match.findOne({matchId:req.params.matchId});
    res.json({data:d.details});
    // res.render("scorecard",{data:d.details});
})

app.get('*', function(req, res) {
    // console.log(path.join(__dirname, '../build', 'index.html'));
     res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT,() => console.log(`Server started at ${PORT}`));

