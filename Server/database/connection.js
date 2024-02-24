import mongoose from 'mongoose';

const connection =  async ()=>{

    try{
      
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongo database is connected!!!  `)
    }catch(error){
        console.error(`Error: ${error} `)
       
    }

}

export default connection