import { Business } from "./business.model";

export interface Offer {
    _id: string;
    title: string;
    description: string;
    amountOfUses?: number;
    business: Business;
    category: string[];
    discount: number;
    plan: string[];
    redeemableDays?: string[];
    locations: string[];
    offerImages?: string[];
    expiryDate?: Date;
    status?: "active" | "inactive";
    termsAndConditions: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateOfferRequest {
    title: string;
    description: string;
    amountOfUses?: number;
    business: string; // Business ID
    category: string[];
    discount: number;
    plan: string[];
    redeemableDays?: string[];
    locations: string[];
    offerImages?: string[];
    expiryDate?: Date;
    termsAndConditions: string;
}