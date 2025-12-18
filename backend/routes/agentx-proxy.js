const express = require('express');
const router = express.Router();
const { authenticate, rateLimitByUser } = require('../middleware/auth');
const logger = require('../utils/logger');

// Rate limiting for AI calls - 30 requests per 15 minutes per user
const aiRateLimit = rateLimitByUser(30, 15 * 60 * 1000);

// POST /chat  (Secure AgentX proxy with rate limiting and PII sanitization)
router.post('/chat', authenticate, aiRateLimit, async (req, res) => {
  try {
    const { message, context = {} } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_MESSAGE', message: 'message (string) is required' }
      });
    }

    // Sanitize user input to remove PII and sensitive data
    const sanitizedMessage = message.replace(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, '[EMAIL]')
                                    .replace(/\b\d{10,}\b/g, '[PHONE]')
                                    .trim();

    // Check for AgentX API key in environment
    const agentxKey = process.env.AGENTX_API_KEY || process.env.VITE_AGENTX_KEY;
    
    if (!agentxKey) {
      logger.warn('AgentX API key not configured - using fallback');
      return provideFallbackResponse(sanitizedMessage, context, res);
    }

    // In a real implementation, you would call AgentX API here
    // Example: const response = await axios.post('https://agentx-api.com/chat', {
    //   message: sanitizedMessage,
    //   context,
    //   userId: req.user._id
    // }, {
    //   headers: { 'Authorization': `Bearer ${agentxKey}` }
    // });

    // For now, provide smart fallback
    provideFallbackResponse(sanitizedMessage, context, res);

  } catch (error) {
    logger.error('AgentX chat route error', { error: error.message });
    res.status(500).json({
      success: false,
      error: { code: 'AGENTX_CHAT_FAILED', message: 'Failed to process chat request' }
    });
  }
});

// Fallback response function for when AgentX is unavailable
function provideFallbackResponse(message, context, res) {
  const lower = message.toLowerCase();
  let theme = 'general inspiration';
  let destination = 'beautiful place';
  let suggestions = [];

  if (/(mountain|hike|trek|climb)/.test(lower)) {
    theme = 'mountain adventure';
    destination = 'Spiti Valley or Manali';
    suggestions = [
      'Pack warm layers for high altitude',
      'Book permits in advance',
      'Carry altitude sickness medication'
    ];
  } else if (/(beach|sea|island|coast)/.test(lower)) {
    theme = 'coastal retreat';
    destination = 'Goa or Andaman Islands';
    suggestions = [
      'Best time: October to March',
      'Try water sports and scuba diving',
      'Explore local seafood cuisine'
    ];
  } else if (/(history|temple|heritage|culture)/.test(lower)) {
    theme = 'cultural exploration';
    destination = 'Hampi or Jaipur';
    suggestions = [
      'Hire a local guide for historical context',
      'Visit during sunrise for best light',
      'Explore by bicycle or on foot'
    ];
  } else if (/(food|cuisine|eat|taste)/.test(lower)) {
    theme = 'culinary journey';
    destination = 'Mumbai or Delhi';
    suggestions = [
      'Join a street food tour',
      'Try local markets and cafes',
      'Learn to cook regional dishes'
    ];
  } else if (/(romantic|couple|honeymoon|love)/.test(lower)) {
    theme = 'romantic getaway';
    destination = 'Udaipur or Kerala backwaters';
    suggestions = [
      'Book lake view accommodations',
      'Plan sunset boat rides',
      'Dine at candlelight restaurants'
    ];
  } else if (/(spiritual|peace|meditation|zen)/.test(lower)) {
    theme = 'spiritual journey';
    destination = 'Rishikesh or Dharamshala';
    suggestions = [
      'Join yoga and meditation sessions',
      'Visit ashrams and monasteries',
      'Practice mindfulness in nature'
    ];
  }

  const reply = `Based on your interest in ${theme}, I recommend exploring ${destination}. ${suggestions.length > 0 ? suggestions[0] : 'Tell me more about your preferences!'} What's your ideal trip duration?`;

  res.json({
    success: true,
    id: 'ax-' + Date.now(),
    content: reply,
    timestamp: new Date().toISOString(),
    meta: { 
      theme, 
      context,
      destination,
      suggestions,
      fallback: true // Indicates this is a fallback response
    }
  });
}

module.exports = router;
