var mongoose=require("mongoose");
var playerSchema=new mongoose.Schema({
    name:String,
    won:{type:Number,default:0},
    lost:{type:Number,default:0},
    matches:{type:Number,default:0},
    Man_of_the_match:{type:Number,default:0},
    history:{won:{type:Number,default:0},lost:{type:Number,default:0},absent:{type:Number,default:0},matches:{type:Number,default:0}},
    avatar:{type:String,default:"https://cdn1.iconfinder.com/data/icons/sport-avatar-6/64/07-cricket_player-cricket-sports-avatar-people-512.png"},
    runs:{type:Number,default:0},
    ballsPlayed:{type:Number,default:0},
    innings:{type:Number,default:0},
    ballsDelivered:{type:Number,default:0},
    ballInnings:{type:Number,default:0},
    economy:{type:Number,default:0},
    strikeRate:{type:Number,default:0},
    wickets:{type:Number,default:0},
    runsGiven:{type:Number,default:0},
    totalMatches:{type:Number,default:0},
    overs:{type:String,default:''},
    battingAverage:{type:Number,default:''},
    amountPaid:{type:Number,default:0},
    willAttend:{type:Boolean,default:true},
    absent:{type:Number,default:0},
    sixes:{type:Number,default:0},
    fours:{type:Number,default:0},
    dots:{type:Number,default:0},
    matchesPlayed:{type:Number,default:0},
    date: {
        type: Date,
        default: Date.now
      }
    },
    { timestamps: true }
);

module.exports=mongoose.model("PlayerV2",playerSchema);