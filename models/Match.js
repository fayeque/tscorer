var mongoose=require("mongoose");
var matchSchema=new mongoose.Schema({
    matchId:String,
    details:{},
    matchStarted:{type:Boolean,default:false}
    },
    { timestamps: true }
);

module.exports=mongoose.model("Match",matchSchema);