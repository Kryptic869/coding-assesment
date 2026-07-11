import Offer from "../models/Offer.js";

// Controller to get all offers
const getOffers = async (req, res) => {
    try {
        const offers = await Offer.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: offers.length,
            data: offers,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch offers",
        });
    }
};

const createOffer = async (req, res) => {
    try {
        const newOffer = new Offer(req.body);
        const savedOffer = await newOffer.save();
        res.status(201).json({
            success: true,
            data: savedOffer,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create offer",
        });
    }
};

const toggleOfferStatus = async (req, res) => {
    try {
        const offerId = req.params.id;
        const offer = await Offer.findById(offerId);

        if (!offer) {
            return res.status(404).json({
                success: false,
                message: "Offer not found",
            });
        }

        // Toggle the status between "active" and "inactive"
        offer.status = offer.status === "active" ? "inactive" : "active";
        const updatedOffer = await offer.save();

        res.status(200).json({
            success: true,
            data: updatedOffer,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update offer status",
        });
    }
};

export { getOffers, createOffer, toggleOfferStatus };