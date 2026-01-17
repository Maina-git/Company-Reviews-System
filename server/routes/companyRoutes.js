import express from "express";
import {getAllCompanies, getCompaniesAllStats} from "../controllers/companyController.js"
import { getAllCompaniesTotalStats } from "../controllers/companyController.js";
import { getCompanyById } from "../controllers/companyController.js";
const router = express.Router();

router.get("/all", getAllCompanies);
router.get("/total-stats", getAllCompaniesTotalStats);
router.get("/stats", getCompaniesAllStats);
router.get("/:id", getCompanyById);

export default router;















