
const mongoose = require("mongoose");

const AdminSchema=new mongoose.Schema({
    "Name":{type:String},
    "EmpId":{type:String},
    "LoginId":{type:String},
    "Password":{type:String},
    "Phone":{type:Number},
    "Email":{type:String},
    "DateOfBirth":{type:Date}
},{
    collection:"Admin"
})

module.exports=mongoose.model("AdminSchema",AdminSchema);