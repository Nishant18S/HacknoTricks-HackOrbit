# services/generator.py

import logging
from transformers import pipeline

# Configure logger
logger = logging.getLogger(__name__)

# Load the model
try:
    generator = pipeline("text-generation", model="gpt2")
    logger.info("Transformer model loaded successfully")
except Exception as e:
    logger.error(f"Error loading transformer model: {str(e)}")
    generator = None

def generate_chat_response(query, context=None):
    """Generate a response from the AI model."""
    if not generator:
        return "I'm experiencing technical difficulties. Please try again later."
    
    try:
        prompt = f"User: {query}\n"
        if context:
            prompt = f"Conversation context: {context}\n{prompt}"
        prompt += "Government Assistant:"
        
        response = generator(
            prompt,
            max_length=250,
            num_return_sequences=1,
            temperature=0.7,
            top_p=0.9,
            do_sample=True,
        )[0]['generated_text']

        return response.split("Government Assistant:")[-1].strip()
    
    except Exception as e:
        logger.error(f"Text generation error: {str(e)}")
        return "Sorry, I couldn't generate a response at the moment."
