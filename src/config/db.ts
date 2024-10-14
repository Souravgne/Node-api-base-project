
import  mongoose from 'mongoose'; 
import { config } from './config';

// Connect to MongoDB

const connectDB = async ()=>{

    try{
        
        mongoose.connection.on("connected" , ()=>{
            console.log("connected to database successfully")
        }); 

        mongoose.connection.on('error' , (err)=>{
            console.log("error in connecting db" , err)
        })
        await  mongoose.connect(config.databaseUrl as string);
    }
    catch (err){
        console.log("Failed to connect database" , err); 
        process.exit(1);  // Exit the process with a non-zero status
    }
 
}
// Define a schema for the 'User' collection
export default connectDB; 