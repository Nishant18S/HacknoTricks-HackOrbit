const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3',
      prompt: message,
      stream: false
    });

    res.json({ reply: response.data.response });
  } catch (err) {
    console.error('❌ Chat Error:', err);
    res.status(500).send('Chatbot failed to respond');
  }
});

module.exports = router;
