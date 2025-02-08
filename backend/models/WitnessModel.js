const mongoose = require('mongoose');

const witnessSchema = new mongoose.Schema({
    
   hash:{          //it will contain image or video 
        type:String,
   }


},{timestamps:true});


const Witness = mongoose.model("Witness",witnessSchema);

module.exports = Witness;