const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI("AIzaSyBkGYzhk3-s_Rj37moCQC1Ocx4UN2r_zQ8");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Set up Multer for file upload
const upload = multer({
  dest: 'uploads/', // Directory to store the uploaded files
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size (10 MB)
});

// API endpoint to handle PDF file upload and summarization
router.post('/summarize', upload.single('pdfFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Extract text from the uploaded PDF
    const filePath = path.join(__dirname, req.file.path);
    const dataBuffer = fs.readFileSync(filePath);

    const pdfData = await pdfParse(dataBuffer);
    const extractedText = pdfData.text;
    const result = await model.generateContent(`Please summarize the following text in a clear and concise manner:\n\n${extractedText}`);
    const summary = result.response.text();



    // Return extracted text (you can replace this with summarization logic)
    res.json({ summary: summary });

    // Optionally, delete the uploaded file after processing
    fs.unlinkSync(filePath);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error processing PDF' });
  }
});

module.exports = router;
