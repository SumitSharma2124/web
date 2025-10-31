# The Old Rao Hotel - Restaurant Website

## Overview
This is a static frontend website for "The Old Rao Hotel", an authentic Indian restaurant based in Gurugram, Haryana. The website showcases the restaurant's menu, allows online ordering through a cart system, and provides reservation functionality.

**Project Type:** Static HTML/CSS/JavaScript website  
**Server:** Python HTTP server  
**Port:** 5000  
**Last Updated:** October 31, 2025

## Project Structure
```
public/
├── html/           # All HTML pages
│   ├── index.html           # Homepage
│   ├── menu.html            # Menu display page
│   ├── store.html           # Online ordering page
│   ├── checkout.html        # Cart and checkout
│   ├── reservation.html     # Table reservations
│   ├── summary.html         # Order summary
│   └── thank-you-screen.html # Order confirmation
├── css/            # Stylesheets
├── js/             # JavaScript files
│   ├── menu-script.js       # Menu page functionality
│   ├── store-script.js      # Store/cart functionality
│   └── checkout-script.js   # Checkout page logic
├── data/
│   └── menu.json            # Menu items database
├── assets/         # Images, icons, illustrations
└── script.js       # Main authentication and user logic

server.py           # Python HTTP server (runs on port 5000)
```

## Features
- **Homepage:** Hero section, about information, specialties showcase
- **Menu:** Dynamic menu loaded from JSON data
- **Online Store:** Product browsing with add-to-cart functionality
- **Shopping Cart:** LocalStorage-based cart system
- **Reservations:** Table booking form
- **Authentication:** Login/signup modals (uses localStorage)

## Technical Details
- **Frontend:** Pure HTML5, CSS3, JavaScript (no frameworks)
- **Data Storage:** LocalStorage for cart and user authentication
- **Menu Data:** Loaded from `public/data/menu.json`
- **Server:** Python 3 SimpleHTTPServer with cache control headers
- **Categories:** Royal Curries, Tandoor Items, Street Food, Lassis & Chai, Desserts

## Recent Changes
- **October 31, 2025:** Initial Replit setup
  - Created Python HTTP server with cache-control headers
  - Added missing `script.js` for authentication functionality
  - Fixed missing `remove()` method in Cart class for checkout
  - Configured workflow to serve on port 5000
  - Root URL (/) automatically redirects to /html/index.html

## Running the Project
The website runs automatically via the configured workflow:
- Command: `python3 server.py`
- Access: http://0.0.0.0:5000/
- The server serves static files from the `public/` directory

## Known Limitations
- Authentication is client-side only (localStorage)
- No backend API for real order processing
- Cart data persists only in browser localStorage
- No payment gateway integration
