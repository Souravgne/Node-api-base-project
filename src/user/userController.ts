import { NextFunction ,Response , Request} from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";

const createUser = async (req :Request , res :Response ,next :NextFunction)=>{

    const {name , email , password} = req.body; 
    if( !name || !email || !password){
       const error =createHttpError(400 ,"all feilds are required!"); 
       return next(error);
    }
    
    // Check if email already exists
    const user = await userModel.findOne({ email });
    if(user){
        const error = createHttpError(400 ,"email already exists!");
        return next(error);
    }
    
    
 







    res.json({
        message: "User Created Successfully"
    })

}


export {createUser}