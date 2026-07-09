import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(json());

// Routes
// Health check route
app.get('/health', (req, res) => {
    res.json({ message: 'API is running' });
});

export default app;