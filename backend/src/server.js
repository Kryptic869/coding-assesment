require("dotenv").config();

import { listen } from "./app";
import { connectDB } from "./config/database";
import seedDatabase from "./seed/seedDatabase";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    await seedDatabase();

    listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};



startServer();