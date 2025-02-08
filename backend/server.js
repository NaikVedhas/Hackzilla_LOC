const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();    
const cors = require('cors')

const app = express();

app.use(cors({
    origin:"http://localhost:5173"
}))

app.use(express.json({limit:"5mb"}));


mongoose.connect(process.env.MONGODBURI)
.then(()=>{
    app.listen(5000,()=>{
        console.log("MongoDb connected and server running on port 5000 ");
    })
})
.catch((err)=>console.log("error in mongo- ",err));

    
    