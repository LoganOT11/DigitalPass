// /controllers/passController.js
const generatePkPass = require('../utils/generatePass');  // Import the generatePass function

// Dummy member data for testing
const memberData = {
  name: "Logan Ouellette",
  membershipId: "12345",
  expiration: "2025-12-31",
};

// Controller to generate a pass
const generatePass = async (req, res) => {
  try {
    // Call the function to generate the pass with member data
    await generatePkPass(memberData);

    // Send success response
    res.status(200).send({ message: 'Pass generated successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'Error generating pass', error });
  }
};

module.exports = { generatePass };
