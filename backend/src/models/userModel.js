import mongoose, { mongo, Schema } from "mongoose";


const userModel=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:[true ,"Password id required"]
    },
    profilePhoto:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        enum:["male","female","other"],
        requires:true
    },
    
},
{timestamps:true}
);
export  const User =mongoose.model("User",userModel)