const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set View Engine
app.set('view engine', 'ejs');

// Database Connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const userRoutes = require('./routes/userRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const tradeRoutes = require('./routes/tradeRoutes');
const stockRoutes = require('./routes/stockRoutes');

app.use('/users', userRoutes);
app.use('/portfolios', portfolioRoutes);
app.use('/trades', tradeRoutes);
app.use('/stocks', stockRoutes);

// Home Route
app.get('/', (req, res) => {
  res.render('welcome');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
