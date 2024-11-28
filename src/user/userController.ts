import { NextFunction ,Response , Request} from "express";
import createHttpError from "http-errors";

const createUser = async (req :Request , res :Response ,next :NextFunction)=>{

    const {name , email , password} = req.body; 
    if( !name || !email || !password){
       const error =createHttpError(400 ,"all feilds are required!"); 
       return next(error);
    }
    
    
    
 







    res.json({
        message: "User Created Successfully"
    })

}


export {createUser}