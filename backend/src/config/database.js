const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

// Connecting to MongoDB
// Reading the MongoDB URI from environment variables
// If not provided, it will use an in-memory MongoDB server
const connectDB = async () => {
    try {
        let mongoUri = process.env.MONGODB_URI;

        if (!mongoUri) {
            mongoServer = await MongoMemoryServer.create();
            mongoUri = mongoServer.getUri();

            console.log('Using in-memory MongoDB server');
        }
        
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected');
    }
    catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    await mongoose.disconnect();

    if (mongoServer) {
        await mongoServer.stop();
        console.log('In-memory MongoDB server stopped');
    }
    else {
        console.log('MongoDB disconnected');
    }
};

module.exports = { connectDB, disconnectDB };