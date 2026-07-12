import express from "express";

import {
    getOffers,
    createOffer,
    toggleOfferStatus
} from "../controllers/offerController.js";

import { offerValidationRules as createOfferValidator } from "../validators/offerValidators.js";

import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.get("/", getOffers);

router.post("/", createOfferValidator, validateRequest, createOffer);

router.patch("/:id/status", toggleOfferStatus);

export default router;