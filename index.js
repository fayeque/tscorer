var express=require("express");
var app= express();
var bodyParser=require("body-parser");
var mongoose = require("mongoose");
var cors=require("cors");
var path=require('path');
const Match = require("./models/Match");
var util= require('util');
const Batsman = require("./models/Batsman");
const Bowler=require("./models/Bowler");
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
    //res.render('home.ejs',{matches:matches});
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

app.get('/updateExisting',async (req,res) => {
    var result = await batsman.find({});

    result.forEach((doc) => {
        // Make changes to the document fields if required
        doc.tournament = 'SUMMER2023';
      });
    
      // Save the modified documents
      const savedDocuments = await Promise.all(result.map(doc => doc.save()));
    
      console.log('Documents updated and saved:', savedDocuments);

    console.log('records updated successfully');


    // var bowres= await Bowler.updateMany(
    //     {},
    //     {$set:{tournament:'SUMMER2023'}},
    //     {upsert:true}
    // );
    res.json("Successfull");
  


});

app.post("/generateReport",async (req,res) => {
    console.log("request here");
    // console.log(req.body);
    var d=req.body;
    console.log(d);
    // var arr=d[d.batting].batsmans.map(async (batsman) => {
        for(batsman of d[d.batting].batsmans){
        if(batsman.name.trim() != ''){
        var b = await Batsman.findOne({name:batsman.name.trim().toUpperCase(),tournament:'TPL2023'});
        console.log("value of b",b);
        if(b==null){
            var b=new Batsman({
            name:batsman.name.trim().toUpperCase(),
            runs:batsman.runs,
            ballsPlayed:batsman.balls,
            // dots:batsman.dot,
            sixes:batsman.sixes,
            fours:batsman.fours,
            matchesPlayed:1,
            tournament:'TPL2023'
            });
            b.save();
            // console.log(sdata);
        }else{
        b.runs = parseInt(b.runs) + parseInt(batsman.runs);
        b.ballsPlayed = parseInt(b.ballsPlayed) + parseInt(batsman.balls);
        b.dots += batsman.dot;
        b.sixes += batsman.sixes;
        b.fours += batsman.fours;
        b.matchesPlayed += 1;
         b.save();
        // console.log(savedData);
        }
    }
    }
    // });

    // var arr2=d[d.bowling].batsmans.map(async (batsman) => {
        for(batsman of d[d.bowling].batsmans ){
        if(batsman.name.trim() != ''){
        var b = await Batsman.findOne({name:batsman.name.trim().toUpperCase(),tournament:'TPL2023'});
        console.log("value of b",b);
        if(b==null){
            var b=new Batsman({
            name:batsman.name.trim().toUpperCase(),runs:batsman.runs,ballsPlayed:batsman.balls,
            dots:batsman.dot,sixes:batsman.sixes,fours:batsman.fours,matchesPlayed:1,tournament:'TPL2023'
            });

            b.save();
            // console.log(sdata);
        }else{
        b.runs = parseInt(b.runs) + parseInt(batsman.runs);
        b.ballsPlayed = parseInt(b.ballsPlayed) + parseInt(batsman.balls);
        b.dots += batsman.dot;
        b.sixes += batsman.sixes;
        b.fours += batsman.fours;
        b.matchesPlayed += 1;
        b.save();
        // console.log(savedData);
        }
    }
    }
    // });

    // bowler:{name:"",runsGiven:0,ballsDelivered:0,overs:0,economy:0,wicket:0,timeline:[]},
    // var arr3=d[d.batting].bowlers.map(async (batsman) => {
        for(batsman of d[d.batting].bowlers ){
        if(batsman.name.trim() != ''){
        var p = await Bowler.findOne({name:batsman.name.trim().toUpperCase(),tournament:'TPL2023'});
        console.log("value of b",p);
        console.log(parseInt(parseInt(batsman.ballsDelivered) + parseInt(batsman.over*6)));
        if(p==null){
            var p=new Bowler({
            name:batsman.name.trim().toUpperCase(),runsGiven:batsman.runsGiven,ballsDelivered: calcualteBallsDelivered(batsman),
            overs:`${Math.floor(batsman.overs)}.${(batsman.ballsDelivered)}`,
             wickets : parseInt(batsman.wicket),economy:(batsman.runsGiven/parseFloat(batsman.overs)).toFixed(2),
             ballInnings : 1,tournament:'TPL2023'
            });

            p.save();
            // console.log(sdata);
        }else{
            p.runsGiven=parseInt(p.runsGiven)+parseInt(batsman.runsGiven);
            p.ballsDelivered=parseInt(p.ballsDelivered)+parseInt(calcualteBallsDelivered(batsman));
            p.ballInnings=p.ballInnings+1;
            p.wickets=parseInt(p.wickets)+parseInt(batsman.wicket);
            p.overs=`${Math.floor(p.ballsDelivered/6)}.${(p.ballsDelivered%6)}`;
            p.economy=(p.runsGiven/parseFloat(p.overs)).toFixed(2);
            p.save();
            // console.log(savedData);
        }
    }
}
    // });

    // var arr4=d[d.bowling].bowlers.map(async (batsman) => {
        for(batsman of d[d.bowling].bowlers ){
        if(batsman.name.trim() != ''){
        var p = await Bowler.findOne({name:batsman.name.trim().toUpperCase(),tournament:'TPL2023'});
        console.log("value of b",p);
        if(p==null){
            var p=new Bowler({
            name:batsman.name.trim().toUpperCase(),runsGiven:batsman.runsGiven,ballsDelivered:calcualteBallsDelivered(batsman),
            overs:`${Math.floor(batsman.overs)}.${(batsman.ballsDelivered)}`,
             wickets : parseInt(batsman.wicket),economy:(batsman.runsGiven/parseFloat(batsman.overs)).toFixed(2),
             ballInnings:1,tournament:'TPL2023'
            });

            p.save();
            // console.log(sdata);
        }else{
            p.runsGiven=parseInt(p.runsGiven)+parseInt(batsman.runsGiven);
            p.ballsDelivered=parseInt(p.ballsDelivered)+parseInt(calcualteBallsDelivered(batsman));
            p.ballInnings=p.ballInnings+1;
            p.wickets=parseInt(p.wickets)+parseInt(batsman.wicket);
            p.overs=`${Math.floor(p.ballsDelivered/6)}.${(p.ballsDelivered%6)}`;
            p.economy=(p.runsGiven/parseFloat(p.overs)).toFixed(2);
           p.save();
            // console.log(savedData);
        }
    }
}
    // });


    // Promise.all(arr);
    // Promise.all(arr2);
    // Promise.all(arr3);
    // Promise.all(arr4);
    res.json("Successfull");
});

// app.get("/updateBatsmanCase",async (req,res) => {
//     const batsmans= await Batsman.find({});
//     for(batsman of batsmans){
//         batsman.name=batsman.name.trim().toUpperCase();
//         await batsman.save();
//     }
//     res.json("successfull updated");
// });

// app.get("/updateBowlerCase",async (req,res) => {
//     const batsmans= await Bowler.find({name:'Adil Bhai'.trim().toUpperCase()});
//     for(batsman of batsmans){
//         console.log(batsman);
//     }
//     res.json("successfull updated");
// })

app.get("/orangeCap/:tournamentName",async (req,res) => {
    var d=await Batsman.find({tournament:req.params.tournamentName}).sort({runs:-1});
    console.log(d);
    res.json({data:d});
});


app.get("/purpleCap/:tournamentName",async (req,res) => {
    var d=await Bowler.find({tournament:req.params.tournamentName}).sort({wickets:-1,economy:1});
    console.log(d);
    res.json({data:d});
});

app.get("/batsmanTournaments",async (req,res) => {
    Batsman.aggregate([
        // Group by the tournament field and push all dates into an array for each tournament
        {
          $group: {
            _id: '$tournament',
            dates: { $push: '$date' }
          }
        },
        { $sort: { 'dates': -1 } }, // Sort by dates array in descending order
        // Sort the results based on the dates in descending order (assuming it's a date field)
        {
          $project: {
            _id: 0,
            tournament: '$_id'
          }
        }
       
      ])
      .exec((err, result) => {
        if (err) {
          console.error('Error:', err);
        } else {
          console.log('Distinct tournaments sorted by date:', result);
          res.json({data:result});
        }
      });
});

app.get("/bowlingTournaments",async (req,res) => {
    Bowler.aggregate([
        // Group by the tournament field and push all dates into an array for each tournament
        {
          $group: {
            _id: '$tournament',
            dates: { $push: '$date' }
          }
        },
        { $sort: { 'dates': -1 } }, // Sort by dates array in descending order
        // Sort the results based on the dates in descending order (assuming it's a date field)
        {
          $project: {
            _id: 0,
            tournament: '$_id'
          }
        }
       
      ])
      .exec((err, result) => {
        if (err) {
          console.error('Error:', err);
        } else {
          console.log('Distinct tournaments sorted by date:', result);
          res.json({data:result});
        }
      });
});



app.get("/purpleCap",async (req,res) => {
    var d=await Bowler.find({}).sort({wickets:-1,economy:1});
    console.log(d);
    res.json({data:d});
})


app.post("/reverseGeneratedReport",async (req,res) => {
    console.log("request here");
    // console.log(req.body);
    var d=req.body;
    console.log(d);
    // var arr=d[d.batting].batsmans.map(async (batsman) => {
        for(batsman of d[d.batting].batsmans){
        if(batsman.name.trim() != ''){
        var b = await Batsman.findOne({name:batsman.name.trim().toUpperCase()});
        console.log("value of b",b);
        b.runs = parseInt(b.runs) - parseInt(batsman.runs);
        b.ballsPlayed = parseInt(b.ballsPlayed) - parseInt(batsman.balls);
        b.dots -= batsman.dot;
        b.sixes -= batsman.sixes;
        b.fours -= batsman.fours;
        b.matchesPlayed -= 1;
         b.save();
        // console.log(savedData);
        }
    }
    // });

    // var arr2=d[d.bowling].batsmans.map(async (batsman) => {
        for(batsman of d[d.bowling].batsmans ){
        if(batsman.name.trim() != ''){
        var b = await Batsman.findOne({name:batsman.name.trim().toUpperCase()});
        console.log("value of b",b);
        b.runs = parseInt(b.runs) - parseInt(batsman.runs);
        b.ballsPlayed = parseInt(b.ballsPlayed) - parseInt(batsman.balls);
        b.dots -= batsman.dot;
        b.sixes -= batsman.sixes;
        b.fours -= batsman.fours;
        b.matchesPlayed -= 1;
        b.save();
        // console.log(savedData);
        }
    }
    
    // });

    // bowler:{name:"",runsGiven:0,ballsDelivered:0,overs:0,economy:0,wicket:0,timeline:[]},
    // var arr3=d[d.batting].bowlers.map(async (batsman) => {
        for(batsman of d[d.batting].bowlers ){
        if(batsman.name.trim() != ''){
        var p = await Bowler.findOne({name:batsman.name.trim().toUpperCase()});
        console.log("value of b",p);
        console.log(parseInt(parseInt(batsman.ballsDelivered) + parseInt(batsman.over*6)));
            p.runsGiven=parseInt(p.runsGiven)-parseInt(batsman.runsGiven);
            p.ballsDelivered=parseInt(p.ballsDelivered)-parseInt(calcualteBallsDelivered(batsman));
            p.ballInnings=p.ballInnings-1;
            p.wickets=parseInt(p.wickets)-parseInt(batsman.wicket);
            p.overs=`${Math.floor(p.ballsDelivered/6)}.${(p.ballsDelivered%6)}`;
            p.economy=(p.runsGiven/parseFloat(p.overs)).toFixed(2);
            p.save();
            // console.log(savedData);
        }
    }

    // });

    // var arr4=d[d.bowling].bowlers.map(async (batsman) => {
        for(batsman of d[d.bowling].bowlers ){
        if(batsman.name.trim() != ''){
        var p = await Bowler.findOne({name:batsman.name.trim().toUpperCase()});
        console.log("value of b",p);
            p.runsGiven=parseInt(p.runsGiven)-parseInt(batsman.runsGiven);
            p.ballsDelivered=parseInt(p.ballsDelivered)-parseInt(calcualteBallsDelivered(batsman));
            p.ballInnings=p.ballInnings-1;
            p.wickets=parseInt(p.wickets)-parseInt(batsman.wicket);
            p.overs=`${Math.floor(p.ballsDelivered/6)}.${(p.ballsDelivered%6)}`;
            p.economy=(p.runsGiven/parseFloat(p.overs)).toFixed(2);
           p.save();
            // console.log(savedData);
        }
    }

    // });

    // Promise.all(arr);
    // Promise.all(arr2);
    // Promise.all(arr3);
    // Promise.all(arr4);
    res.json("Successfull");
});

const calcualteBallsDelivered = (batsman) => {
    var ans;
    console.log(parseInt(batsman.ballsDelivered));
    console.log(parseInt(batsman.overs)*6);
    console.log(batsman.overs);
    console.log(isNaN(parseInt(batsman.ballsDelivered)));
    console.log(isNaN(parseInt(batsman.overs)*6));
    if(isNaN(parseInt(batsman.ballsDelivered)) == false){
        ans=parseInt(parseInt(batsman.ballsDelivered) + parseInt(batsman.overs)*6)
    }else{
        ans=parseInt(batsman.overs)*6;
    }
    console.log(ans);
    return ans;
}

app.get('*', function(req, res) {
    // console.log(path.join(__dirname, '../build', 'index.html'));
     res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT,() => console.log(`Server started at ${PORT}`));

