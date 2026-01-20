import  express from "express";
import  {getAllReviews, createStory }  from "../controllers/reviewController.js";


const router = express.Router();

router.get("/all", getAllReviews);
router.post("/create", createStory);

export default router;



