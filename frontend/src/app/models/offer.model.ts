import { Business } from "./business.model";

export interface Offer {
    _id: string;
    title: string;
    description: string;
    amountOfUses?: number;
    business: Business;
    category: string[];
    discount: number;
    plan: Array<"basic" | "premium" | "enterprise">;
    redeemableDays?: string[];
    locations: string[];
    offerImages?: string[];
    expiryDate?: Date;
    status?: "active" | "inactive";
    termsAndConditions: string;
    createdAt: Date;
    updatedAt: Date;
}