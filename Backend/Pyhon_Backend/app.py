from flask import Flask, request, jsonify, render_template, session
import wikipedia
import nltk
from transformers import pipeline
import requests
from bs4 import BeautifulSoup
import re
import logging
from functools import lru_cache

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Download NLP tools
try:
    nltk.download('punkt', quiet=True)
    nltk.download('averaged_perceptron_tagger', quiet=True)
    logging.info("NLTK resources downloaded")
except Exception as e:
    logging.error(f"Error downloading NLTK resources: {str(e)}")

# Initialize transformer model
try:
    generator = pipeline("text-generation", model="gpt2")
    logging.info("Transformer model loaded successfully")
except Exception as e:
    logging.error(f"Error loading transformer model: {str(e)}")
    generator = None

# Flask app setup
app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Change for production

# Department keywords
DEPARTMENT_KEYWORDS = {
    'health': ['health', 'hospital', 'doctor', 'medical', 'clinic', 'treatment', 'medicine'],
    'agriculture': ['agriculture', 'farmer', 'crop', 'kisan', 'mandi', 'irrigation', 'harvest'],
    'finance': ['finance', 'tax', 'loan', 'bank', 'investment', 'pension', 'gst'],
    'education': ['education', 'school', 'college', 'scholarship', 'exam', 'student', 'teacher']
}

# Cache for scraping results
@lru_cache(maxsize=128)
def scrape_govt_scheme_info(query):
    """Scrape Indian government scheme information with enhanced parsing"""
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        search_url = f"https://www.india.gov.in/search/node/{requests.utils.quote(query)}"
        res = requests.get(search_url, headers=headers, timeout=10)
        res.raise_for_status()
        
        soup = BeautifulSoup(res.text, 'lxml')
        results = soup.find_all('div', class_='search-result')
        
        if not results:
            return None
        
        # Extract and format multiple results
        scheme_info = []
        for result in results[:3]:  # Get top 3 results
            title_elem = result.find('h3').find('a')
            title = title_elem.text.strip() if title_elem else "No Title"
            link = "https://www.india.gov.in" + title_elem['href'] if title_elem else "#"
            
            snippet_elem = result.find('div', class_='search-snippet-info')
            snippet = snippet_elem.text.strip() if snippet_elem else "No description available"
            
            # Extract department if possible
            dept = ""
            for category, keywords in DEPARTMENT_KEYWORDS.items():
                if any(kw in snippet.lower() for kw in keywords):
                    dept = category.capitalize()
                    break
            
            scheme_info.append({
                'title': title,
                'link': link,
                'snippet': snippet,
                'department': dept
            })
        
        return scheme_info
    except Exception as e:
        logging.error(f"Scraping error: {str(e)}")
        return None

def detect_department(query):
    """Detect relevant department based on query"""
    query = query.lower()
    for dept, keywords in DEPARTMENT_KEYWORDS.items():
        if any(kw in query for kw in keywords):
            return dept
    return None

def format_scheme_response(schemes):
    """Format scheme information for chatbot response"""
    if not schemes:
        return "I couldn't find any government schemes related to your query."
    
    response = "I found these government schemes:\n\n"
    for i, scheme in enumerate(schemes, 1):
        dept_info = f" ({scheme['department']})" if scheme['department'] else ""
        response += f"{i}. **{scheme['title']}{dept_info}**\n"
        response += f"   {scheme['snippet']}\n"
        response += f"   [More Info]({scheme['link']})\n\n"
    
    return response

def handle_wikipedia_query(query):
    """Handle Wikipedia queries with improved parsing"""
    try:
        # Try to get page directly
        page = wikipedia.page(query, auto_suggest=False)
        return f"According to Wikipedia:\n\n**{page.title}**\n\n{page.summary[:500]}...\n[Read more]({page.url})"
    except wikipedia.DisambiguationError as e:
        try:
            # Try first suggestion
            page = wikipedia.page(e.options[0])
            return f"According to Wikipedia:\n\n**{page.title}**\n\n{page.summary[:500]}...\n[Read more]({page.url})"
        except:
            return None
    except wikipedia.PageError:
        return None
    except Exception as e:
        logging.error(f"Wikipedia error: {str(e)}")
        return None

def generate_chat_response(query, context=None):
    """Generate AI response with context awareness"""
    if not generator:
        return "I'm experiencing technical difficulties. Please try again later."
    
    try:
        # Create context-aware prompt
        prompt = f"User: {query}\n"
        if context:
            prompt = f"Conversation context: {context}\n" + prompt
        
        prompt += "Government Assistant:"
        
        # Generate response
        response = generator(
            prompt,
            max_length=250,
            num_return_sequences=1,
            temperature=0.7,
            top_p=0.9,
            do_sample=True,
        )[0]['generated_text']
        
        # Extract only the assistant's response
        return response.split("Government Assistant:")[-1].strip()
    except Exception as e:
        logging.error(f"Generation error: {str(e)}")
        return "I couldn't process your request. Please try again."

# Route: Landing page
@app.route('/')
def landing():
    return render_template("landing.html")

# Route: Chat page
@app.route('/chat')
def chat():
    # Initialize chat session
    session['chat_history'] = []
    return render_template("index.html")

# Route: Handle chatbot messages
@app.route('/get-response', methods=['POST'])
def get_response():
    user_input = request.json['message']
    chat_history = session.get('chat_history', [])
    
    # Add to chat history
    chat_history.append({"role": "user", "content": user_input})
    
    # Try Wikipedia for factual queries
    if any(q in user_input.lower() for q in ['what is', 'who is', 'tell me about', 'explain']):
        wiki_response = handle_wikipedia_query(user_input)
        if wiki_response:
            chat_history.append({"role": "assistant", "content": wiki_response})
            session['chat_history'] = chat_history
            return jsonify({'response': wiki_response})
    
    # Try government scheme search
    scheme_results = scrape_govt_scheme_info(user_input)
    if scheme_results:
        formatted_response = format_scheme_response(scheme_results)
        chat_history.append({"role": "assistant", "content": formatted_response})
        session['chat_history'] = chat_history
        return jsonify({'response': formatted_response})
    
    # Generate AI response with conversation context
    context = " ".join([msg['content'] for msg in chat_history[-3:]])  # Last 3 messages
    ai_response = generate_chat_response(user_input, context)
    
    # Add to chat history
    chat_history.append({"role": "assistant", "content": ai_response})
    session['chat_history'] = chat_history
    
    return jsonify({'response': ai_response})

# Error handler
@app.errorhandler(500)
def internal_error(error):
    logging.error(f"Server error: {str(error)}")
    return jsonify({'response': "I'm experiencing technical difficulties. Please try again later."}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)