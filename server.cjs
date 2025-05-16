const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post('/api/ai/ask', async (req, res) => {
  const { messages } = req.body;
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000', // Required by OpenRouter
        'X-Title': 'MINIMIND' // Required by OpenRouter
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'API request failed');
    }
    
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('AI request error:', err);
    res.status(500).json({ error: 'AI request failed', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`AI backend server running on port ${PORT}`);
}); 