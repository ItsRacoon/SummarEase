const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI("AIzaSyBkGYzhk3-s_Rj37moCQC1Ocx4UN2r_zQ8");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post('/', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: "Text is required" });
    }

    try {
        const result = await model.generateContent(`Please summarize the following text in a clear and concise manner:\n\n${text}`);
        // Generate content using the API
        const summary = result.response.text(); // Call the `text` function to get the summary
    
        console.log("API Response:", result); // Log full response for debugging
        return res.json({ summary }); // Send the summary in the API response
    } catch (error) {
        console.error("Error during summarization:", error);
        return res.status(500).json({
            message: "Error summarizing text",
            error: error.message || error.stack || "Unknown error occurred",
        });
    }
    
});


module.exports = router;
