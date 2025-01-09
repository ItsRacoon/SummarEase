const axios = require('axios');

const summarizeText = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post('https://gemini-api-endpoint', {
      text,
    }, {
      headers: { 'Authorization': `Bearer ${process.env.GEMINI_API_KEY}` },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { summarizeText };
