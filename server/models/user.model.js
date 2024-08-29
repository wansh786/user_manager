const mongoose=require("mongoose");

const UserSchema=mongoose.Schema({
    
    deleted: Boolean,
    email: String,
    firstName: String,
    lastName: String,
    password: String
},{
    version_key:false
})

const UserModel=mongoose.model("user",UserSchema);

module.exports={
    UserModel
}