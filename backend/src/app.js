const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
// Health check route
app.get('/health', (req, res) => {
    res.json({ message: 'API is running' });
});

module.exports = app;