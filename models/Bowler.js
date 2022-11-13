var mongoose=require("mongoose");
var bowlerSchema=new mongoose.Schema({
    name:String,
    avatar:{type:String,default:"https://cdn1.iconfinder.com/data/icons/sport-avatar-6/64/07-cricket_player-cricket-sports-avatar-people-512.png"},
    ballsDelivered:{type:Number,default:0},
    ballInnings:{type:Number,default:0},
    economy:{type:Number,default:0},
    wickets:{type:Number,default:0},
    runsGiven:{type:Number,default:0},
    overs:{type:String,default:''},
    date: {
        type: Date,
        default: Date.now
      }
    },
    { timestamps: true }
);

module.exports=mongoose.model("Bowler",bowlerSchema);