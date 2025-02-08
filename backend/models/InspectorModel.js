const mongoose = require('mongoose');

const inspectorSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    },
    profilePicture:{   
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
    policeStationLoaction:{
        type:String,
        required:true,
    }

},{timestamps:true});


const Inspector = mongoose.model("Victim",inspectorSchema);

module.exports = Inspector;