const express = require('express');
const path = require('path');
const generatePass = require('./utils/generatePass'); // Assuming your pass generation function is here

const app = express();
const port = 3000;

// Define route to generate pass
app.get('/api/pass/generate', async (req, res) => {
  try {
    // Call the function to generate the pass
    await generatePass();
    res.send('Pass generated successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating pass');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
