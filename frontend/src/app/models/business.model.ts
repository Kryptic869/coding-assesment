export interface Business {
    _id: string;
    name: string;
    description: string;
    category: string[];
    locations: string[];
    // locationLinks: string[];
    email: string;
    phone: string;
    logoUrl: string;
    website: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}