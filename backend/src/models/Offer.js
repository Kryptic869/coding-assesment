import { Schema, model, Types } from 'mongoose';

// Offer Schema
// Title, description, amountOfUses, business, category, discount, plan, redeemableDays, locations, offerImages, expiryDate, status, termsAndConditions
const offerSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Offer title is required"],
            maxlength: [100, "Offer title cannot exceed 100 characters"]
        },

        description: {
            type: String,
            required: [true, "Offer description is required"],
            trim: true,
            maxlength: [500, "Offer description cannot exceed 500 characters"]
        },

        amountOfUses: {
            type: Number,
            default: 1,
            min: [1, "Amount of uses cannot be less than 1"],
        },

        business: {
            type: Types.ObjectId,
            ref: "Business",
            required: [true, "Business is required"],
        },

        category: {
            type: String,
            required: [true, "Offer category is required"],
            enum: [
                "food & beverage",
                "fashion & apparel",
                "electronics & gadgets",
                "health & wellness",
                "travel & tourism",
                "entertainment & leisure",
                "home & garden",
                "sports & fitness",
                "automotive & transportation",
                "education & learning",
                "beauty & personal care",
                "finance & insurance"
            ],
        },

        discount: {
            type: Number,
            required: [true, "Offer discount is required"],
            min: [0, "Discount must be a positive number"],
            max: [100, "Discount cannot exceed 100%"],
        },

        plan: {
            type: String,
            required: [true, "Offer plan is required"],
            enum: ["basic", "premium", "enterprise"],
        },

        redeemableDays: {
            type: [String],
            enum: [
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
            ],
            default: [
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
            ],
        },

        locations: {
            type: [String],
            required: [true, "Offer locations are required"],
            default: [],
        },

        offerImages: [
            {
                type: String,
            }
        ],

        expiryDate: {
            type: Date,
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },

        termsAndConditions: {
            type: String,
            required: [true, "Terms and conditions are required"],
        },
    },
    {
        // Automatically add createdAt and updatedAt fields
        timestamps: true,
    }
);

const Offer = model("Offer", offerSchema);

export default Offer;