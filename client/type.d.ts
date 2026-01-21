export type VibeType= "positive" | "negative" | "neutral";


export type userType =
 | "individual customer" 
 | "business customer"
 | "bank employee"
 | "farmer employee"
 | "investor"
 | "other";

 export  interface Review {
    _id:string;
    vibe:VibeType;
    companyType:string;
    isAnonymouse:boolean;
    name:string;
    userType:userType;
    title:string;
    story:string;
    createdAt:string;
    updatedAt:string;
 }

 export  type CompanyType = {
   _id:string;
   name:string;
   positiveCount:string;
   negativeCount:string;
   totalReviews:number;
   neutralCount:number;
   reviews:Review[];
   complainRate:number;
}
