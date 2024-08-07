# TradeSphere

## Application Description
TradeSphere is a straightforward application designed for tracking and managing a trading portfolio. Users can add, view, update, and delete trades, and see live stock prices through integration with financial APIs. The application provides a simple and effective way to manage and monitor trading activities.

## Basic Elements
### Trades
- **Trade Entries**: Users can record trades with details such as stock symbol, quantity, purchase price, and date.
- **CRUD Operations**: Users can create, read, update, and delete trades.

### Live Stock Prices
- **External Data**: The application integrates with financial APIs like Alpha Vantage or IEX Cloud to display live stock prices.
- **Display**: Live stock prices are shown in a dedicated section of the app.

## Application Mechanics
### Starting the Application
- **Welcome Page**: The welcome page features the slogan "TradeSphere: Trade Smarter, Not Harder" and includes a "Sign Up for Free" button.
- **Sign Up / Login Page**: After clicking "Sign Up for Free," users are directed to a page where they can sign up with their name, email, and password, or log in if they already have an account.

### Creating a Portfolio
- **Create Manual Portfolio**: After signing up or logging in, users are led to the "Create Manual Portfolio" page.
- **Setup Your Portfolio**: Users can start creating their portfolio by entering a "New Portfolio Name" and "Portfolio Currency" and clicking the "Create" button.

### Managing Trades
- **Add Trade**: Users can input details to add a new trade.
- **View Trades**: Users can view a list of all recorded trades.
- **Update Trade**: Users can modify existing trade details.
- **Delete Trade**: Users can remove trades from their portfolio.

### Viewing Live Stock Prices
- **API Integration**: Fetch real-time stock prices from financial APIs.
- **Display Prices**: Current stock prices are displayed dynamically.

## Additional Features
### Basic Stock Price Integration
- **API Fetching**: Use services like Alpha Vantage or IEX Cloud for live stock prices.
- **Real-Time Updates**: Display current stock prices in the app.

## Attributions
- **API Providers**: Alpha Vantage, IEX Cloud, or similar for stock price data.
- **Chat GPT**: For guidance on development and documentation.

## Technologies Used
- **HTML/CSS**: For layout and styling.
- **JavaScript**: For dynamic interactions and data fetching.
- **Node.js/Express**: For server-side logic and API integration.
- **MongoDB**: For database storage and management.

## Screens
- **Welcome Page**: Includes the slogan and "Sign Up for Free" button.
- **Sign Up / Login Page**: Features forms for user registration and login.
- **Create Manual Portfolio Page**: Allows users to input a new portfolio name and currency.
- **Portfolio Dashboard**: Displays user's trade portfolio and live stock prices.

## MVP User Stories
1. **Welcome Page**: As a user, I want to see a welcoming page with the app's slogan and sign-up option.
2. **Sign Up / Login**: As a user, I want to sign up or log in to access my portfolio.
3. **Create Portfolio**: As a user, I want to create a new portfolio by entering a name and currency.
4. **View Trades**: As a user, I want to view my list of recorded trades.
5. **Add Trade**: As a user, I want to add new trades to my portfolio.
6. **Update Trade**: As a user, I want to update existing trades with new information.
7. **Delete Trade**: As a user, I want to remove trades from my portfolio.


## Stretch Goals
1. **Enhanced Stock Price Integration**: Show additional stock details such as historical data.
2. **Portfolio Analytics**: Provide basic analytics on portfolio performance.
3. **Alerts**: Set up alerts for specific stock price thresholds.
4. **Mobile Compatibility**: Ensure the app is accessible from mobile devices.
5. **View Live Prices**: As a user, I want to see live stock prices.

## Pseudocode
```javascript
// 1. Create sections for welcome page, sign up/login, and portfolio management.
// 2. Set up server-side logic for user authentication and CRUD operations on trades.
// 3. Integrate with financial APIs to fetch live stock prices.
// 4. Display real-time stock prices on the app.
// 5. Implement CRUD functionality for trade management.
// 6. Ensure secure user authentication and data handling.
```
## Layout

[![General-Assembly-81.jpg](https://i.postimg.cc/MHy0QhTt/General-Assembly-81.jpg)](https://postimg.cc/JHzBwYjB)

[![General-Assembly-82.jpg](https://i.postimg.cc/Kv2D2vqW/General-Assembly-82.jpg)](https://postimg.cc/ThtDjGXj)

[![General-Assembly-83.jpg](https://i.postimg.cc/8CjhHFc7/General-Assembly-83.jpg)](https://postimg.cc/1g1nR3pS)

[![General-Assembly-84.jpg](https://i.postimg.cc/ryRCtZY5/General-Assembly-84.jpg)](https://postimg.cc/3W7Ds1hw)

[![General-Assembly-86.jpg](https://i.postimg.cc/SN79WBLY/General-Assembly-86.jpg)](https://postimg.cc/kBGDChp7)


## Development and Presentation Preparation

### Week 1: August 6th - August 12th

## Development and Presentation Preparation

### Week 1: August 6th - August 12th


| Date       | Day         | Task                                               | Notes/Thoughts                                         |
|------------|-------------|----------------------------------------------------|--------------------------------------------------------|
| **August 6** | **Tuesday** | Finalize Proposal and Create Initial HTML/CSS Scaffolding | Define features, set up basic HTML and CSS. Start on the login screen. |
| **August 7** | **Wednesday** | Implement Login Screen and Basic Dashboard Layout | Create login screen and set up the dashboard layout. |
| **August 8** | **Thursday** | Develop CRUD Operations for Trades | Implement functionality for adding, viewing, updating, and deleting trades. |
| **August 9** | **Friday** | Integrate Financial API for Live Stock Prices | Fetch and display live stock prices from financial APIs. |
| **August 10** | **Saturday** | Refine User Interface and Test CRUD Operations | Enhance UI and test CRUD functionalities. |
| **August 11** | **Sunday** | Conduct Thorough Testing and Debugging | Perform testing and fix any issues. |
| **August 12** | **Monday** | Prepare and Deliver Presentation | Finalize the presentation and deploy the app. |


## ERD

[![Trade-Sphere.png](https://i.postimg.cc/fTf66vQS/Trade-Sphere.png)](https://postimg.cc/xcqxmMC9)

## RESTful Routing

| HTTP Method | Path/Endpoint           | Operation  | Route Name         | Data Payload? | Purpose                                             | Action                       |
|-------------|--------------------------|------------|--------------------|---------------|-----------------------------------------------------|------------------------------|
| POST        | `/users/signup`          | Create     | signup             | Yes           | Create a new user account.                          | Redirect to login page.      |
| POST        | `/users/login`           | Create     | login              | Yes           | Log in a user and start a session.                  | Redirect to dashboard.       |
| GET         | `/users/:userId`         | Read       | getUser            | No            | Get details of a specific user.                     | Show user profile.           |
| POST        | `/portfolios`            | Create     | createPortfolio    | Yes           | Create a new portfolio for the user.                | Redirect to dashboard.       |
| GET         | `/portfolios/:portfolioId`| Read      | getPortfolio       | No            | Get details of a specific portfolio.                | Show portfolio details.      |
| PUT         | `/portfolios/:portfolioId`| Update    | updatePortfolio    | Yes           | Update an existing portfolio.                       | Redirect to updated portfolio.|
| DELETE      | `/portfolios/:portfolioId`| Delete    | deletePortfolio    | No            | Delete a specific portfolio.                        | Redirect to portfolio list.  |
| POST        | `/trades`                | Create     | createTrade        | Yes           | Add a new trade to a portfolio.                     | Redirect to portfolio trades.|
| GET         | `/trades/:tradeId`       | Read       | getTrade           | No            | Get details of a specific trade.                    | Show trade details.          |
| PUT         | `/trades/:tradeId`       | Update     | updateTrade        | Yes           | Update an existing trade.                           | Redirect to updated trade.   |
| DELETE      | `/trades/:tradeId`       | Delete     | deleteTrade        | No            | Delete a specific trade.                            | Redirect to portfolio trades.|
| GET         | `/stocks/:symbol`        | Read       | getStockPrice      | No            | Get live stock price for a specific symbol.         | Show stock price details.    |
| GET         | `users/logout`                | Logout     | logout             | No            | Log out the current user and end the session.       | Redirect to login page.      |

