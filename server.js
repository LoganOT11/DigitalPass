const express = require('express');
const bodyParser = require('body-parser');
const passRoutes = require('./routes/passRoutes'); // Import the passRoutes

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the routes
app.use('/api/pass', passRoutes); // Prefix the routes with /api/pass

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
