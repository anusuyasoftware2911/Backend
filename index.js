
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser=require("body-parser");
const cors=require("cors");

app.use(express.json());

const AdminRoute = require("./Controller/AdminRoute");
const QueryRoute = require("./Controller/QueryRoute");

mongoose.set("strictQuery",true);
mongoose.connect("mongodb+srv://anusuyasoftwaresolutions:Anusuya2911@cluster0.jinzdsv.mongodb.net/CompanyDb");

var db=mongoose.connection;
db.on("open",()=>console.log("Connected to Database"));
db.on("error",()=>console.log("Error Occurred"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use("/AdminRoute",AdminRoute);
app.use("/QueryRoute",QueryRoute);

app.listen(9000, ()=>{
    console.log("Server started at 9000");
})