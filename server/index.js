import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({path:"./config.env"});

process.on("uncaughtException", (err)=>{
    console.log("UNCAUGHT EXCEPTION Shutting down.....");
    console.log(err.name, err.message);
    process.exit(1);
});

export const connectDB = async () =>{
try{
    await mongoose.connect(process.env.DB_URL);
    console.log("Mongo db connected");
}catch(err){
    console.error(err);
}
}

connectDB();
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
console.log(`App running on port ${PORT}`);
});

process.on("unhandleRejection", (err)=>{
    console.log("UNHANDLE REJECTION Shutting down.....");
    console.log(err.name, err.message);
    process.exit(1);
})



