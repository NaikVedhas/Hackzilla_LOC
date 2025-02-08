const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const generationConfig = {
  temperature: 0.7, // Reduced temperature for more focused responses
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 8192,
};

app.get("/health",async(req,res)=>{
    console.log("hello")
    console.log("Gemini API Key:", process.env.GEMINI_API_KEY);

    res.json("hello")
})

app.post('/api/ipc_section', async (req, res) => {
  try {
    const { description } = req.body;
    console.log(description)
    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const prompt = `You are a legal expert specializing in the Indian Penal Code (IPC).
    Based on the following incident description, analyze and provide applicable IPC sections.
   
    Important instructions:
    1. Only use official IPC sections
    2. Provide detailed reasoning based on IPC provisions
    3. Return response STRICTLY in this JSON format:
    {
      "types": ["crime type 1", "crime type 2"],
      "sections": ["IPC section 1", "IPC section 2"],
      "reasoning by ai": "Your detailed explanation citing specific IPC sections and their applicability"
    }
   
    Incident description: ${description}

    Remember:
    - Only include valid IPC sections
    - Explain each section's relevance
    - Format must be valid JSON
    - Only focus on criminal aspects covered under IPC`;

    console.log("Sending prompt to Gemini API:", prompt);
    const result = await chatSession.sendMessage(prompt);
   
    if (!result || !result.response) {
      throw new Error("Empty or invalid response from Gemini API");
    }

    const response = result.response.text();
    console.log("Raw response text:", response);

    // Remove backticks (` ```json ` and ` ``` `)
    let cleanedResponse = response.replace(/```(json)?/g, "").trim();
   
    // Parse the response directly as JSON
    try {
      const parsedResponse = JSON.parse(cleanedResponse);
      res.json(parsedResponse);
    } catch (error) {
      console.error('Failed to parse Gemini response as JSON:', error);
      res.status(500).json({
        error: 'Invalid response format from AI. Please try again.',
        raw_response: response
      });
    }
   
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ error: 'Failed to evaluate sentence. Please try again.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
