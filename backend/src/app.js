import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import offerRoutes from './routes/offerRoutes.js';
import businessRoutes from './routes/businessRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(json());
app.use("/api/offers", offerRoutes);
app.use("/api/businesses", businessRoutes);

// Routes
// Health check route
app.get('/health', (req, res) => {
    res.json({ message: 'API is running' });
});

export default app;