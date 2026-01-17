import  express from "express";
import { getAllReviews } from "../controllers/reviewController";

const router = express.Router();

router.gwt("/all", getAllReviews);
module.exports = router;