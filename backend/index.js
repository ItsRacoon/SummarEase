const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const summarizeRoutes = require('./summarizeRoutes');
const summarizePdfRoutes = require('./summarizepdf'); // Add this line to import summarizepdf.js

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use('/api/summarize', summarizeRoutes); // Existing summarize route
app.use('/api/summarizepdf', summarizePdfRoutes); // Add the new summarizepdf route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
