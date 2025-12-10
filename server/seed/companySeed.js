import mongoose from "mongoose"; 
import dotenv from "dotenv"; 
import Company from "../model/companyModel.js"; 
dotenv.config({path:"../config.env"}); 
const connectDB = async () =>{ 
    try{ await mongoose.connect(process.env.DB_URL); 
    console.log("Mongo db connected"); 
}catch(err){
     console.error(err); } } 
connectDB(); 
const banks = [ "Janata Bank", "Sonali Bank", "Rupali Bank", "Agrani Bank", "Islami Bank Bangladesh", "Dutch-Bangla Bank", "BRAC Bank", "Prime Bank", "Eastern Bank", "United Commercial Bank", "Pubali Bank", "National Bank", "Trust Bank", "Southeast Bank", "City Bank", "AB Bank", "Bank Asia", "Mercantile Bank", "Midland Bank", "One Bank" ]; 
const addCompanies = async () =>{ 
    try{ await Company.deleteMany(); 
    const formatted = banks.map((name)=>({ name:name.trim(), 
        totalReveiws:0, 
        positiveCount:0, 
        negativeCount:0, 
        reviews:[], })); 
        await Company.insertMany(formatted); 
        console.log("Companies added successfully"); 
        process.exits(); }catch(err){ console.log("Error adding compaines", err); 
        process.exit(1); } }; 
        
        const deletCompaines = async()=>{ 
            try{ await Company.deleteMany(); 
                console.log("All companies deleted Successfully"); 
                process.exit(1); 
            }catch(err){
            console.log("Error deleting companies", err); 
            process.exit(1); } 
        }; 
        
        const run = async()=>{ 
            const arg=process.argv[2]; 
            if(arg==="--add"){ 
            await addCompanies() 
        } else if(arg==="--delete"){
        await deletCompaines(); 
      }else{ console.log("Use --arg to add company or --delete to delete company");
      process.exit(0); } } 
      run();