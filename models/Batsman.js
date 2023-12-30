var mongoose=require("mongoose");
var batsmanSchema=new mongoose.Schema({
    name:String,
    avatar:{type:String,default:"https://cdn1.iconfinder.com/data/icons/sport-avatar-6/64/07-cricket_player-cricket-sports-avatar-people-512.png"},
    runs:{type:Number,default:0},
    ballsPlayed:{type:Number,default:0},
    sixes:{type:Number,default:0},
    fours:{type:Number,default:0},
    dots:{type:Number,default:0},
    matchesPlayed:{type:Number,default:0},
    tournament:{type:String},
    date: {
        type: Date,
        default: Date.now
      }
    },
    { timestamps: true }
);

module.exports=mongoose.model("Batsman",batsmanSchema);