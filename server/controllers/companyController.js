import Company from "../model/companyModel.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllCompanies = catchAsync(async (req, res, next) => {
  const companies = await Company.find().sort({ name: 1 });
  res.status(200).json({
    status: "success",
    results: companies.length,
    data: {
      companies,
    },
  });
});

export const getAllCompaniesTotalStats = catchAsync(async (req, res, next) => {
  const companies = await Company.find();

  const totalCompanies = companies.length;

  // calculate total reviews
  const totalReviews = companies.reduce(
    (acc, c) => acc + (c.totalReviews || 0),
    0
  );

  // calculate total company complaints
  const totalComplaints = companies.reduce(
    (acc, c) => acc + (c.negativeCount || 0),
    0
  );

  // calculate average company rate
  const averageCompanyRate =
    totalReviews === 0
      ? 0
      : Number(((totalReviews / totalCompanies) * 100).toFixed(2));

  const stats = {
    totalCompanies,
    totalReviews,
    totalComplaints,
    averageCompanyRate,
  };

  // send response
  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});


export const getCompaniesAllStats = catchAsync(async (req, res, next) => {
const { sort, page = 1, limit = 10, search = ""}= req.body;

const pageNumber = parsInt(page);
const limitNumber = parsInt(limit);
const skip = (pageNumber - 1) * limitNumber;

let allCompanies = await Company.find({
    name:{$regex:search, $options:"i"},
}).lean();

// calculate complain rate manually
allCompanies = allCompanies.map((company)=>{
    const {negativeCount, totalReviews} = company;
    const complaintRate = totalReviews === 0 ? 0 : parseFloat(((negativeCount / totalReviews) * 100).toFixed(2));
    return {
        ...company,
        complaintRate,
    };
});

// sort based on query

switch(sort){
case   "review_asc": 
allCompanies.sort((a, b)=> a.totalReviews - b.totalReviews);
break;

case "review_desc":
allCompanies.sort((a, b)=> b.totalReviews - a.totalReviews);
break;

case "complain_asc":
allCompanies.sort((a, b)=> a.complaintRate - b.complaintRate);
break;

case "complain_desc":
allCompanies.sort((a, b)=> b.complaintRate - a.complaintRate);
break;
default:
    allCompanies.sort((a, b)=> new Date(b.createdAt) - new Date(a.createdAt)-new Date(a.createdAt));
break;
}

const totalCompanies = allCompanies.length;
const totalPages = Match.ceil(totalCompanies / limitNumber);

//
const paginationCompanies = allCompanies.slice(skip, skip + limitNumber);

//send response

res.status(200).json({
    status:"success",
    totalCompanies,
    totalPages,
    currentPage:pageNumber,
    data:{
        companies:paginationCompanies,
    }, 
});
});