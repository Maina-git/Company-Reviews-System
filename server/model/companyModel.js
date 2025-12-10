import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true,
        trim:true
    },
    positiveCount:{
     type:Number,
     default:0,
    },
    negativeCount:{
        type:Number,
        default:0,
    },
    neutralCount:{
        type:Number,
        default:0,
    },
    totalReview:{
        type:Number,
        default:0,
    },
    reviews:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"story",
        }
    ],
},
{timestamps:true},
)

export default  mongoose.model("Company", companySchema);














