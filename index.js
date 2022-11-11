var express=require("express");
var app= express();
var bodyParser=require("body-parser");
var mongoose = require("mongoose");
var cors=require("cors");
var path=require('path');
const Match = require("./models/Match");
var util= require('util');
const Batsman = require("./models/Batsman");
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
    // console.log(req.body);
    var d=new Match({
        matchId:req.body.id,
        details:req.body.data
    });
    var sr=await d.save();
    // console.log(sr);
    res.json("Successfull");
 });

 app.post("/match/:matchId",async (req,res) => {
    //  console.log(req.body);
    var d=await Match.findOne({matchId:req.params.matchId});
    // console.log(d);
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
});

// balls: 8
// dot: 0
// fours: 3
// name: "Rohit"
// notout: false
// outBy: "Sodhi"
// runOut: false
// runs: 19
// sixes: 0
// strikeRate: 0

// ---------------
// runs:Number,
// ballsPlayed:Number,
// sixes:Number,
// fours:Number,
// dots:Number
app.post("/generateReport",async (req,res) => {
    console.log("request here");
    // console.log(req.body);
    var d=req.body;
    console.log(d);
    var arr=d[d.batting].batsmans.map(async (batsman) => {
        var b = await Batsman.findOne({name:batsman.name});
        console.log("value of b",b);
        if(b==null){
            var b=new Batsman({
            name:batsman.name,
            runs:batsman.runs,
            ballsPlayed:batsman.balls,
            // dots:batsman.dots,
            sixes:batsman.sixes,
            fours:batsman.fours,
            matchesPlayed:1
            });
            const sdata=await b.save();
            console.log(sdata);
        }else{
        b.runs += batsman.runs;
        b.ballsPlayed += batsman.balls;
        b.dots += batsman.dot;
        b.sixes += batsman.sixes;
        b.fours += batsman.fours;
        b.matchesPlayed += 1;
        var savedData=await b.save();
        console.log(savedData);
        }
    });

    var arr2=d[d.bowling].batsmans.map(async (batsman) => {
        var b = await Batsman.findOne({name:batsman.name});
        console.log("value of b",b);
        if(b==null){
            var b=new Batsman({
            name:batsman.name,runs:batsman.runs,ballsPlayed:batsman.balls,
            dots:batsman.dots,sixes:batsman.sixes,fours:batsman.fours,matchesPlayed:1
            });

            const sdata=await b.save();
            console.log(sdata);
        }else{
        b.runs += batsman.runs;
        b.ballsPlayed += batsman.balls;
        b.dots += batsman.dot;
        b.sixes += batsman.sixes;
        b.fours += batsman.fours;
        b.matchesPlayed += 1;
        var savedData=await b.save();
        console.log(savedData);
        }
    });

    var arr2=d[d.bowling].batsmans.map(async (batsman) => {
        var b = await Batsman.findOne({name:batsman.name});
        console.log("value of b",b);
        if(b==null){
            var b=new Batsman({
            name:batsman.name,runs:batsman.runs,ballsPlayed:batsman.balls,
            dots:batsman.dots,sixes:batsman.sixes,fours:batsman.fours,matchesPlayed:1
            });

            const sdata=await b.save();
            console.log(sdata);
        }else{
        b.runs += batsman.runs;
        b.ballsPlayed += batsman.balls;
        b.dots += batsman.dot;
        b.sixes += batsman.sixes;
        b.fours += batsman.fours;
        b.matchesPlayed += 1;
        var savedData=await b.save();
        console.log(savedData);
        }
    });

    var arr2=d[d.bowling].batsmans.map(async (batsman) => {
        var b = await Batsman.findOne({name:batsman.name});
        console.log("value of b",b);
        if(b==null){
            var b=new Batsman({
            name:batsman.name,runs:batsman.runs,ballsPlayed:batsman.balls,
            dots:batsman.dots,sixes:batsman.sixes,fours:batsman.fours,matchesPlayed:1
            });

            const sdata=await b.save();
            console.log(sdata);
        }else{
        b.runs += batsman.runs;
        b.ballsPlayed += batsman.balls;
        b.dots += batsman.dot;
        b.sixes += batsman.sixes;
        b.fours += batsman.fours;
        b.matchesPlayed += 1;
        var savedData=await b.save();
        console.log(savedData);
        }
    });
    
    Promise.all(arr);
    Promise.all(arr2);
    res.json("Successfull");
})

app.get('*', function(req, res) {
    // console.log(path.join(__dirname, '../build', 'index.html'));
     res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT,() => console.log(`Server started at ${PORT}`));

