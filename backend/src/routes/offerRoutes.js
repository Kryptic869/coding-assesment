import express from "express";

import {
    getOffers,
    createOffer,
    toggleOfferStatus
} from "../controllers/offerController.js";

const router = express.Router();

router.get("/", getOffers);

router.post("/", createOffer);

router.patch("/:id/status", toggleOfferStatus);

export default router;