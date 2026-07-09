import Business from '../models/Business.js';
import Offer from '../models/Offer.js';

import businessesSeed from './businesses.js';
import offersSeed from './offers.js';

const seedDatabase = async () => {

    const offerCount = await Offer.countDocuments();
    
    const businesses = await Business.insertMany(businessesSeed);
    console.log('Database seeded with businesses.');

    const offers = offersSeed(businesses);

    // Check if the database is already seeded
    if (offerCount === 0) {
        await Offer.insertMany(offers);
        console.log('Database seeded with offers.');
    }
};

export default seedDatabase;