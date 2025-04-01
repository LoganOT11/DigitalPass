require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running and connected to MongoDB!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
