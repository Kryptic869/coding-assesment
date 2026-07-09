import { Schema, model } from 'mongoose';

// Business Schema
// Name, description, locations, email, phone, logo, website, images
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

        logo: {
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