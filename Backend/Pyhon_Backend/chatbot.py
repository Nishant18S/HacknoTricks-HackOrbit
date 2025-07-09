from flask import Blueprint, render_template, request, jsonify, session
from services.wiki_handler import handle_wikipedia_query
from services.scheme_scraper import scrape_govt_scheme_info
from services.generator import generate_chat_response
from utils.formatter import format_scheme_response

chatbot_bp = Blueprint('chatbot', __name__)

@chatbot_bp.route('/')
def landing():
    return render_template("landing.html")

@chatbot_bp.route('/chat')
def chat():
    session['chat_history'] = []
    return render_template("index.html")

@chatbot_bp.route('/get-response', methods=['POST'])
def get_response():
    ...
