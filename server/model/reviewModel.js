import mongoose from "mongoose";

const storySchema =  new mongoose.Schema({
    vibe:{
        type:String,
        enum:['positive','negative', 'neutral'],
        require:true,
    },
    companyName:{
        type:String,
        require:true,
    },
    isAnonymous:{
        type:Boolean,
        default:false,
    },
    name:{
        type:String,
        require:function(){
            return !this.isAnonymous;
        }
    },
    anonymousIsd:{
        type:String,
        require:function(){
            return this.isAnonymous;
        }
    },
    userType:{
        type:String,
        enum:[
        "individual customer",
        "business customer",
        "bank employee",
        "former employee",
        "investor",
        "other"
    ],
    required: true,
    },
    title:{
        type:String,
        require:true,
    },
    story:{
        type:String,
        require:true,
    },
},
{ timeStamp:true }
);


export default mongoose.model('Story', storySchema);
//module.exports = mongoose.model('Story', storySchema);

