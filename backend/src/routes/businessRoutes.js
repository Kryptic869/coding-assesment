import express from "express";

import { getBusinesses } from "../controllers/businessController.js";

const router = express.Router();

router.get("/", getBusinesses);

export default router;