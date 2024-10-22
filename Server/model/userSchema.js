import e from "express";
import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        minLength: [5, "Name must be atleast 5 characters long"],
        maxLength: [50, "Name must be less than 50 characters long"],
        trim:true
    },
    email : {
        type:String,
        required:true,
        unique:[true, "Email already exists"],
        lowercase:true,

    },
    password : {
        type:String,
        required:true,
        select:false
    },
    bio : {
        type:String,
        required:true
    },
    username : {
        type:String,
       required:true
    },
})

const userModel = mongoose.model("User", userSchema);
export default userModel;