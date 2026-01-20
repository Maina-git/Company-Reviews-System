import catchAsync from "../utils/catchAsync.js";
import Story from "../model/reviewModel.js";
import AppError from "../utils/appError.js";
import Company from "../model/companyModel.js";
import crypto from "crypto";

function generateAnonymousId(){
 return "Anon" + crypto.randomBytes(3).toString("hex");
}


export const getAllReviews = catchAsync(async(req, res, next)=>{
    const {
        companyName = "",
        vibe = "",
        search = "newest",
        page = 1,
        limit = 6
    } = req.body;

const filter = {};
if (companyName){
    filter.companyName = {$regex: companyName, $options:"i"};
}
if (vibe){
    filter.vibe = vibe;
}
if(search){
filter.title = {$regex:search, $options:"i"}
}

const  sortOption = sort === "oldest" ? "createdAt" : "-createdAt"
const skip = (page - 1) * limit;
const [reviews,total] = await Promise.all([
 Story.find(filter).sort(sortOption).skip(skip).limit(Number(limit)),
 Story.countDocuments(filter),
]);

res.status(200).json({
    status:"success",
    results: reviews.length,
    total,
    page:Number(page),
    totalPages:Math.ceil(total/Number(limit)),
    data:{reviews},
})
});

export const createStory = catchAsync(async( req, res, next)=>{
    const {vibe, companyName, isAnonymous, name, userType, title, story}=req.body;

if(!isAnonymous && !name){
return next(new AppError("Name is required when nit anonymous", 400))
}
const company = await Company.findOne({name:companyName.Trim()});

if(!company) return next(new AppError("Please select a valid company from the list"));
const newStory = await  Story.create({
   vibe, 
   companyName:company.name, 
   isAnonymous,
   name:isAnonymous ? undefined :name,
   anonymousId:isAnonymous ? generateAnonymousId() :undefined,
   userType,
   title,
   story,
});

const update = {
    $push:{reviews:newStory._id},
    $inc:{totalReviews:1},
};


if(vibe === "positive") update.$inc.positiveCount + 1;
if(vibe === "negative") update.$inc.negativeCount - 1;
if(vibe === "neutral") update.$inc.neutralCount + 1;

await Company.findByIdAndUpdate(company._id, update);

res.status(201).json({
    status:"success",
    message:"Story submitted successfully",
    data:{story:newStory},
});
});






