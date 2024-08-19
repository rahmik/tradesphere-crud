const User = require('../models/User');
const bcrypt = require('bcrypt'); // Add bcrypt for password hashing

exports.signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send('Username, email, and password are required');
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.redirect('/auth/create-portfolio');
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }

    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('Invalid credentials');
    }

    // Assuming that you want to pass portfolio information to the portfolio view
    // You might need to fetch user's portfolio data here
    const portfolioName = 'User Portfolio'; // Replace with actual portfolio name
    const portfolioCurrency = 'USD'; // Replace with actual currency

    // Redirect to the portfolio view page with user's portfolio data
    res.redirect(`/portfolio-view?portfolioName=${encodeURIComponent(portfolioName)}&portfolioCurrency=${encodeURIComponent(portfolioCurrency)}`);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal Server Error');
  }
};
