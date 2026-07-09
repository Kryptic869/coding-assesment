import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/database.js";
import seedDatabase from "./seed/seedDatabase.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};  

startServer();