const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    name:{type:String,required:true}, 
    email:{type:String,required:true},
    password:{type:String,required:true},
});
//validate password
//sending data to the userRouter file
const User=mongoose.model('user',UserSchema)
module.exports = {User}