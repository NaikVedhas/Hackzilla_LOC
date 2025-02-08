const mongoose = require('mongoose');

const victimSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    },
    profilePictureHash:{   
        type:String,
        default:""
    },
    age:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        require:true,
    },
    aadharCardNo:{
        type:String,
        require:true,
    },

},{timestamps:true});


const Victim = mongoose.model("Victim",victimSchema);

module.exports = Victim;