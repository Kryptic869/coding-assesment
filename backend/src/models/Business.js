import { Schema, model } from 'mongoose';

// Business Schema
// Name, description, category, locations, email, phone, logoUrl, website, images
const businessSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Business name is required"],
            maxlength: [100, "Business name cannot exceed 100 characters"]
        },

        description: {
            type: String,
            required: [true, "Business description is required"],
            maxlength: [700, "Business description cannot exceed 700 characters"]
        },

        category: {
            type: [
                {
                    type: String,
                    enum: {
                        values: [
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
                        message: "Invalid business category"
                    },
                },
            ],
            required: [true, "Business category is required"],
            // Custom validator to ensure at least one category is provided
            // This does not allow for an empty array
            validate: {
                validator: function (value) {
                    return Array.isArray(value) && value.length > 0;
                },
                message: "Business category must contain at least one category"
            }
        },

        locations: {
            type: [String],
            required: [true, "Business locations are required"],
        },

        email: {
            type: String,
            required: [true, "Business email is required"],
            unique: true,
            match: [/.+\@.+\..+/, "Please fill a valid email address"]
        },

        phone: {
            type: String,
            required: [true, "Business phone number is required"],
            match: [/^\+356\s?\d{8}$/, "Please fill a valid phone number in the format +356 ********"]
        },

        logoUrl: {
            type: String,
            required: [true, "Business logo URL is required"],
        },

        website: {
            type: String,
            required: [true, "Business website URL is required"],
        },

        images: [
            {
                type: String,
                required: [true, "Image URL is required"]
            },
        ]
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Business = model("Business", businessSchema);

export default Business;