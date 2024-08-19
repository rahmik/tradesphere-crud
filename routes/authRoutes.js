const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Render authentication page
router.get('/', (req, res) => {
  res.render('auth');
});

// Handle sign up
router.post('/sign-up', authController.signUp);

// Handle login
router.post('/login', authController.login);

// Render create portfolio page
router.get('/create-portfolio', (req, res) => {
  res.render('create-portfolio');
});

// Render setup portfolio page
router.get('/setup-portfolio', (req, res) => {
  res.render('setup-portfolio');
});

// Handle form submission from setup-portfolio.ejs
router.post('/setup-portfolio', (req, res) => {
  const { portfolioName, portfolioCurrency } = req.body;

  // Example data for demonstration; replace with actual data fetching logic
  const portfolioItems = [
    { symbol: 'AAPL', shares: 10, purchasePrice: 150, lastPrice: 155, marketValue: 1550, totalCost: 1500, todayGain: 50, totalGain: 50, status: 'Hold' },
    // Add more items as needed
  ];

  // Redirect to portfolio-view with query parameters
  res.redirect(`/portfolio-view?portfolioName=${encodeURIComponent(portfolioName)}&portfolioCurrency=${encodeURIComponent(portfolioCurrency)}`);
});

module.exports = router;
