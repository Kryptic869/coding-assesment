import Business from "../models/Business.js";

// Controller to get all businesses
const getBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: businesses.length,
            data: businesses,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch businesses",
        });
    }
};


export { getBusinesses };