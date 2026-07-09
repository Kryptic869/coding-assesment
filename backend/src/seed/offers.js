export default (businesses) => [
    {
        title: "20% Off Mediterranean Dinner",
        description:
            "Enjoy a delicious Mediterranean dinner with a 20% discount on your total bill. Perfect for couples, families, and groups looking for a quality dining experience.",
        amountOfUses: 1,
        business: businesses[0]._id,
        category: "food & beverage",
        discount: 20,
        plan: "premium",
        redeemableDays: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday"
        ],
        locations: [
            "Bugibba",
            "Sliema"
        ],
        offerImages: [
            "https://example.com/images/olive-dinner-offer.jpg"
        ],
        expiryDate: new Date("2026-12-31"),
        status: "active",
        termsAndConditions:
            "Valid for dine-in customers only. Cannot be combined with other promotions. Reservation may be required."
    },

    {
        title: "Weekend Brunch Special",
        description:
            "Get a discounted weekend brunch experience including a selection of pastries, beverages, and Mediterranean-inspired dishes.",
        amountOfUses: 2,
        business: businesses[0]._id,
        category: "food & beverage",
        discount: 15,
        plan: "basic",
        redeemableDays: [
            "saturday",
            "sunday"
        ],
        locations: [
            "Bugibba"
        ],
        offerImages: [
            "https://example.com/images/brunch-offer.jpg"
        ],
        expiryDate: new Date("2026-10-31"),
        status: "active",
        termsAndConditions:
            "Offer valid only during brunch hours. Maximum two redemptions per customer."
    },

    {
        title: "Smartphone Upgrade Deal",
        description:
            "Upgrade your smartphone and receive 25% off selected accessories including cases, chargers, and wireless headphones.",
        amountOfUses: 1,
        business: businesses[1]._id,
        category: "electronics & gadgets",
        discount: 25,
        plan: "premium",
        redeemableDays: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday"
        ],
        locations: [
            "Valletta",
            "Mosta"
        ],
        offerImages: [
            "https://example.com/images/smartphone-upgrade.jpg",
            "https://example.com/images/accessories.jpg"
        ],
        expiryDate: new Date("2026-09-30"),
        status: "active",
        termsAndConditions:
            "Applies only to selected accessories. Subject to stock availability."
    },

    {
        title: "Gaming Bundle Discount",
        description:
            "Save 30% when purchasing selected gaming accessories including keyboards, mice, and headsets.",
        amountOfUses: 1,
        business: businesses[1]._id,
        category: "electronics & gadgets",
        discount: 30,
        plan: "enterprise",
        redeemableDays: [
            "friday",
            "saturday",
            "sunday"
        ],
        locations: [
            "Mosta"
        ],
        offerImages: [
            "https://example.com/images/gaming-bundle.jpg"
        ],
        expiryDate: new Date("2026-08-15"),
        status: "active",
        termsAndConditions:
            "Offer excludes newly released products. Cannot be combined with other discounts."
    },

    {
        title: "3 Month Gym Membership Offer",
        description:
            "Join ActiveLife Fitness Club with a 40% discount on your first three months of membership.",
        amountOfUses: 1,
        business: businesses[2]._id,
        category: "sports & fitness",
        discount: 40,
        plan: "premium",
        redeemableDays: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday"
        ],
        locations: [
            "St Julian's",
            "Mellieha"
        ],
        offerImages: [
            "https://example.com/images/gym-membership.jpg"
        ],
        expiryDate: new Date("2026-11-30"),
        status: "active",
        termsAndConditions:
            "New members only. Membership must be activated within 30 days of purchase."
    },

    {
        title: "Personal Training Package",
        description:
            "Receive a discounted personal training package with certified fitness coaches.",
        amountOfUses: 3,
        business: businesses[2]._id,
        category: "health & wellness",
        discount: 35,
        plan: "basic",
        redeemableDays: [
            "monday",
            "wednesday",
            "friday"
        ],
        locations: [
            "St Julian's"
        ],
        offerImages: [
            "https://example.com/images/personal-training.jpg"
        ],
        expiryDate: new Date("2026-07-31"),
        status: "active",
        termsAndConditions:
            "Sessions must be booked in advance. Cancellation policy applies."
    },

    {
        title: "Summer Fitness Challenge",
        description:
            "Take part in a summer fitness challenge and receive exclusive membership benefits.",
        amountOfUses: 1,
        business: businesses[2]._id,
        category: "sports & fitness",
        discount: 50,
        plan: "enterprise",
        redeemableDays: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday"
        ],
        locations: [
            "Mellieha"
        ],
        offerImages: [
            "https://example.com/images/summer-challenge.jpg"
        ],
        expiryDate: new Date("2026-09-01"),
        status: "active",
        termsAndConditions:
            "Challenge participation requires registration. Benefits cannot be exchanged for cash."
    }
];