import { NextFunction ,Response , Request} from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import {User} from "./userType";

const createUser = async (req :Request , res :Response ,next :NextFunction)=>{

    const {name , email , password} = req.body; 
    if( !name || !email || !password){
       const error =createHttpError(400 ,"all feilds are required!"); 
       return next(error);
    }

    try{
        const user = await userModel.findOne({ email });
        if(user){
            const error = createHttpError(400 ,"email already exists!");
            return next(error);
        }
        
    }catch(error){
        return next(createHttpError(500, `${error.message}`));
    }
    

   
   
    const hashPassword = await bcrypt.hash(password , 10); 
    let newUser = User;
    try{
         newUser = await new userModel({
            name,
            email,
            password: hashPassword
        });
    }catch(error){
        return next(createHttpError(500, "Error creating user"));}
   
        try{
            const token = sign({sub: newUser._id,} ,config.jwtSecret as string , {expiresIn: '7d'}); 
            res.json({
                accessToken :token,
             })
        }catch(error){
            return next(createHttpError(500, "Error creating token"));
        }
    
    
 







   

}


export {createUser}