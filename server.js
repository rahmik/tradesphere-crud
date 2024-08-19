const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios'); // Add axios for API requests

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Log the API key to ensure it's being loaded
console.log('Alpha Vantage API Key:', process.env.ALPHA_VANTAGE_API_KEY);

// Ticker search route
app.get('/search-tickers', async (req, res) => {
  const searchTerm = req.query.q;

  try {
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'SYMBOL_SEARCH',
        keywords: searchTerm,
        apikey: process.env.ALPHA_VANTAGE_API_KEY,
      },
    });

    // Log the response data to debug
    console.log('API Response Data:', response.data);

    // Ensure the response data contains 'bestMatches'
    const bestMatches = response.data.bestMatches;

    if (Array.isArray(bestMatches)) {
      // Map through bestMatches if it's an array
      const tickers = bestMatches.map(match => ({
        symbol: match['1. symbol'],
        name: match['2. name'],
      }));

      res.json(tickers);
    } else {
      // Handle unexpected response format
      console.error('Unexpected response format:', response.data);
      res.status(500).json({ error: 'Unexpected response format' });
    }
  } catch (error) {
    console.error('Error fetching tickers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

// Portfolio view route
app.get('/portfolio-view', (req, res) => {
  const { portfolioName, portfolioCurrency } = req.query;

  const portfolioItems = [
    { symbol: 'AAPL', shares: 10, purchasePrice: 150, lastPrice: 155, marketValue: 1550, totalCost: 1500, todayGain: 50, totalGain: 50, status: 'Hold' },
  ];

  res.render('portfolio-view', { portfolioName, portfolioCurrency, portfolioItems });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
