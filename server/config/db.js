import mongoose from "mongoose";
import dns from "node:dns/promises";

// Force Node.js to use public DNS servers for Atlas SRV resolution
dns.setServers(['1.1.1.1', '8.8.8.8']); 

//Function to connect to the mongodb database
const connectDB = async ()=>{
 try{
    mongoose.connection.on('connected',()=> console.log('Database Connected'));
    await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`);
}catch (error){
    console.log("MONGODB Error:",error);
};
}

export default connectDB;