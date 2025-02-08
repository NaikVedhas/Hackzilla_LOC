const mongoose = require('mongoose');

const evidenceSchema = new mongoose.Schema({
    
   hash:{          //it will contain image or video 
      type:String,
   }


},{timestamps:true});


const Evidence = mongoose.model("Witness",evidenceSchema);

module.exports = Evidence;