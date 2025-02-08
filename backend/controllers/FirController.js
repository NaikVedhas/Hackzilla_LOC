

const fileFir = async (req,res) =>{


    try {
       
        try {
            //upload data to ipfs
            const {place,timeDate,crimeSection,crimeDescription,victimAadharNumber,witnessName,}
        } catch (error) {
            
        }


        try {
             //upload data to mongodb
        } catch (error) {
            
        }

        try {
            //upload data to block
        } catch (error) {
            
        }



    } catch (error) {
        console.log("Error in fileFir",error);
        return res.status(500).json({message:"Server Error bro"})
        
    }




    

   

    
}


module.exports = {
    fileFir
}