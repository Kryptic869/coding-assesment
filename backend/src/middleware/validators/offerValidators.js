import {body} from "express-validator";
import Business from "../../models/Business.js";

export const offerValidationRules = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .bail()
        .isLength({min: 5, max: 100})
        .withMessage("Title must be between 5 and 100 characters"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .bail()
        .isLength({max: 500})
        .withMessage("Description must not exceed 500 characters"),

    body("amountOfUses")
        .trim()
        .notEmpty()
        .withMessage("Amount of uses is required")
        .bail()
        .isInt({ min: 1 })
        .withMessage("Amount of uses must be a positive integer")
        .toInt(),

    body("businessId")
        .notEmpty()
        .withMessage("Business ID is required")
        .bail()
        .isMongoId()
        .withMessage("Business ID must be a valid MongoDB ID")
        .bail()
        .custom(async (value) => {
            const business = await Business.findById(value);

            if (!business) {
                throw new Error("Business does not exist");
            }
            return true;
        }),

    body("category")
        .notEmpty()
        .withMessage("Offer category is required")
        .bail()
        .isIn([
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
        ])
        .withMessage("Invalid offer category"),

    body("discount")
        .notEmpty()
        .withMessage("Offer discount is required")
        .bail()
        .isFloat({ min: 0, max: 100 })
        .withMessage("Discount must be a number between 0 and 100"),

    body("plan")
        .exists()
        .withMessage("Offer plan is required")
        .bail()
        .isArray({min: 1})
        .withMessage("Offer plan must be an array with at least one plan")
        .bail()
        // Custom validator to ensure no duplicate values in the array
        .custom((plans) => {
            if (new Set(plans).size !== plans.length) {
                throw new Error("Offer plan cannot contain duplicate values");
            }

            return true;
        }),

    // Validate each plan type in the array
    // This ensures that each value within the array is a string and is one of the allowed values
    // Express Validator feature
    body("plan.*")
        .isString()
        .withMessage("Each offer plan must be a string")
        .bail()
        .isIn(["basic", "premium", "enterprise"])
        .withMessage("Each offer plan must be basic, premium, or enterprise"),

    body("redeemableDays")
        .isArray()
        .withMessage("Redeemable days must be an array of days of the week")
        .default(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]),

    body("locations")
        .notEmpty()
        .withMessage("Offer locations are required")
        .bail()
        .custom((value) => {
            if (typeof value === 'string' || Array.isArray(value)){
                return true;
            }
            throw new Error("Invalid locations");
        }),

    // offerImages is optional and not required

    // Expiry date validation: must be a valid date in the future
    body("expiryDate")
        .isISO8601()
        .toDate()
        .custom((value) => {
            if (new Date(value) <= new Date()) {
                throw new Error("Expiry date must be in the future");
            }
            return true;
        })
        .withMessage("Expiry date must be a valid date in the future"),

    body("status")
        .isIn(["active", "inactive"])
        .withMessage("Invalid offer status")
        .default("active"),

    body("termsAndConditions")
        .notEmpty()
        .withMessage("Terms and conditions are required"),
];
