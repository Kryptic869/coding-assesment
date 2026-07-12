import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import offerRoutes from './routes/offerRoutes.js';
import businessRoutes from './routes/businessRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(
    helmet({
        crossOriginResourcePolicy: {
            policy: "cross-origin",
        },
    })
);
app.use(morgan('dev'));
app.use(json());
app.use("/api/offers", offerRoutes);
app.use("/api/businesses", businessRoutes);

app.use(
    "/images",
    express.static(path.join(__dirname, "../public/images"))
);

// Routes
// Health check route
app.get('/health', (req, res) => {
    res.json({ message: 'API is running' });
});

export default app;