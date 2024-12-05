import { NextFunction, Response, Request } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userType";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(createHttpError(400, "All fields are required!"));
  }

  try {
    // Check if the email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next(createHttpError(400, "Email already exists!"));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token
    const token = sign(
      { sub: newUser._id },
      config.jwtSecret as string,
      { expiresIn: "7d" }
    );

    // Respond with the access token
    
    res.status(201).json({
      message: "User created successfully!",
      user: { id: newUser._id, name:newUser.name ,email: newUser.email },
      accessToken: token,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return next(createHttpError(500, "Internal server error"));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if(!email || !password){
    return next(createHttpError(400, "All fields are required!"));
  }

  try{
    const user = await userModel.findOne({email}); 

    if(!user){
      return next(createHttpError(404, "user not found!"));
    }

    const isMatch = await bcrypt.compare(password, user.password); 

    if(!isMatch){
      return next(createHttpError(400, "Invalid credentials!"));
    }
    const token = sign(
      { sub: user._id },
      config.jwtSecret as string,
      { expiresIn: "7d" }
    );


    res.json({
      message: "Logged in successfully!",
      accessToken: token});





  }catch(err){
    return next(createHttpError(500, "Internal server error"));
  }
 
 
}

export { createUser , loginUser };
