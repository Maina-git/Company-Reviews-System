//const  catchAsync = require('../utils/catchAsync');
//const Story = require('../model/reviewModel');
import catchAsync from "../utils/catchAsync";
import Story from "../model/reviewModel.js";


exports.getAllReviews = catchAsync(async(req, res, next)=>{
    const {
        companyName = "",
        vibe = "",
        search = "newest",
        page = 1,
        limit = 6
    } = req.body;


// create  filter object
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