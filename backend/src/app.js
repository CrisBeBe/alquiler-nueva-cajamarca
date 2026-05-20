require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { sequelize } = require('./models');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Sync for Serverless (only in production/Vercel)
if (process.env.NODE_ENV === 'production') {
  sequelize.sync()
    .then(() => console.log('Database synced in serverless mode'))
    .catch(err => console.error('Database sync error:', err));
}

// Health check
app.get(['/api/health', '/health'], (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// API Routes
app.use('/api', routes);
app.use('/', routes); // Consistency with api/ folder setup

// Error Handling
app.use(errorHandler);

module.exports = app;
