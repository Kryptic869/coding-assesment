import Offer from "../models/Offer.js";

// Controller to get all offers
const getOffers = async (req, res) => {
    try {
        const offers = await Offer.find()
            .populate("business")
            .sort({ createdAt: -1 });
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
        const newOffer = await Offer.create(req.body);

        res.status(201).json({
            success: true,
            message: "Offer created successfully",
            data: newOffer,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const toggleOfferStatus = async (req, res) => {
    try {
        const offerId = req.params.id;
        const offer = await Offer.findById(offerId).populate("business");

        if (!offer) {
            return res.status(404).json({
                success: false,
                message: "Offer not found",
            });
        }
        const previousStatus = offer.status;

        // Toggle the status between "active" and "inactive"
        offer.status = offer.status === "active" ? "inactive" : "active";
        const updatedOffer = await offer.save();

        const newStatus = updatedOffer.status;

        res.status(200).json({
            success: true,
            message: `Offer status changed from ${previousStatus} to ${newStatus}`,
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