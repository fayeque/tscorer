var mongoose=require("mongoose");
var matchSchema=new mongoose.Schema({
    name:String,
    runs:{type:Number,default:0},
    ballsPlayed:{type:Number,default:0},
    sixes:{type:Number,default:0},
    fours:{type:Number,default:0},
    dots:{type:Number,default:0},
    matchesPlayed:{type:Number,default:0}
    },
    { timestamps: true }
);

module.exports=mongoose.model("Batsman",matchSchema);