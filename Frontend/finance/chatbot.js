
// class FinGovChatbot {
//     constructor() {
//         this.isOpen = false;
//         this.isTyping = false;
//         this.messageHistory = [];

//         this.init();
//         this.setupEventListeners();
//         this.showWelcomeMessage();
//     }

//     init() {
//         this.chatbotToggle = document.getElementById('chatbotToggle');
//         this.chatbotContainer = document.getElementById('chatbotContainer');
//         this.chatbotMessages = document.getElementById('chatbotMessages');
//         this.chatbotInput = document.getElementById('chatbotInput');
//         this.chatbotSend = document.getElementById('chatbotSend');
//         this.chatbotMinimize = document.getElementById('chatbotMinimize');
//         this.quickActions = document.getElementById('quickActions');
//         this.typingIndicator = document.getElementById('typingIndicator');
//         this.notification = document.getElementById('chatbotNotification');
//     }

//     setupEventListeners() {
//         this.chatbotToggle.addEventListener('click', () => this.toggleChatbot());
//         this.chatbotMinimize.addEventListener('click', () => this.closeChatbot());
//         this.chatbotSend.addEventListener('click', () => this.sendMessage());

//         this.chatbotInput.addEventListener('keypress', (e) => {
//             if (e.key === 'Enter' && !e.shiftKey) {
//                 e.preventDefault();
//                 this.sendMessage();
//             }
//         });

//         this.quickActions.addEventListener('click', (e) => {
//             if (e.target.classList.contains('quick-action-btn')) {
//                 const action = e.target.getAttribute('data-action');
//                 this.handleQuickAction(action);
//             }
//         });

//         this.chatbotInput.addEventListener('input', () => this.updateSendButton());
//     }

//     toggleChatbot() {
//         if (this.isOpen) {
//             this.closeChatbot();
//         } else {
//             this.openChatbot();
//         }
//     }

//     openChatbot() {
//         this.isOpen = true;
//         this.chatbotContainer.classList.add('active');
//         this.chatbotToggle.classList.add('active');
//         this.hideNotification();
//         this.chatbotInput.focus();
//     }

//     closeChatbot() {
//         this.isOpen = false;
//         this.chatbotContainer.classList.remove('active');
//         this.chatbotToggle.classList.remove('active');
//     }

//     hideNotification() {
//         this.notification.classList.add('hidden');
//     }

//     showNotification() {
//         this.notification.classList.remove('hidden');
//     }

//     showWelcomeMessage() {
//         setTimeout(() => {
//             this.addBotMessage(
//                 "🙏 Welcome to FinGov Portal! I'm your digital assistant here to help you with government financial services, schemes, and queries. How can I assist you today?",
//                 false
//             );
//             if (!this.isOpen) {
//                 this.showNotification();
//             }
//         }, 1000);
//     }

//     sendMessage() {
//         const message = this.chatbotInput.value.trim();
//         if (!message || this.isTyping) return;

//         this.addUserMessage(message);
//         this.chatbotInput.value = '';
//         this.updateSendButton();
//         this.processMessage(message);
//     }

//     addUserMessage(message) {
//         const messageElement = this.createMessageElement('user', message);
//         this.chatbotMessages.appendChild(messageElement);
//         this.scrollToBottom();

//         this.messageHistory.push({
//             type: 'user',
//             message: message,
//             timestamp: new Date()
//         });
//     }

//     addBotMessage(message, showTyping = true) {
//         if (showTyping) {
//             this.showTypingIndicator();

//             setTimeout(() => {
//                 this.hideTypingIndicator();
//                 this.createBotMessage(message);
//             }, 1500 + Math.random() * 1000);
//         } else {
//             this.createBotMessage(message);
//         }
//     }

//     createBotMessage(message) {
//         const messageElement = this.createMessageElement('bot', message);
//         this.chatbotMessages.appendChild(messageElement);
//         this.scrollToBottom();

//         this.messageHistory.push({
//             type: 'bot',
//             message: message,
//             timestamp: new Date()
//         });

//         if (!this.isOpen) {
//             this.showNotification();
//         }
//     }

//     createMessageElement(type, text) {
//         const messageDiv = document.createElement('div');
//         messageDiv.className = `message ${type}`;

//         const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//         messageDiv.innerHTML = `
//             <div class="message-avatar">
//                 ${type === 'user' ? '👤' : '🏛️'}
//             </div>
//             <div class="message-content">
//                 <div class="message-text">${text}</div>
//                 <div class="message-time">${currentTime}</div>
//             </div>
//         `;

//         return messageDiv;
//     }

//     showTypingIndicator() {
//         this.isTyping = true;
//         this.typingIndicator.classList.add('active');
//         this.scrollToBottom();
//     }

//     hideTypingIndicator() {
//         this.isTyping = false;
//         this.typingIndicator.classList.remove('active');
//     }

//     scrollToBottom() {
//         setTimeout(() => {
//             this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
//         }, 100);
//     }

//     updateSendButton() {
//         const hasText = this.chatbotInput.value.trim().length > 0;
//         this.chatbotSend.disabled = !hasText || this.isTyping;
//     }

//     processMessage(message) {
//         const lowerMessage = message.toLowerCase();
//         let response = '';

//         if (this.containsKeywords(lowerMessage, ['hello', 'hi', 'hey', 'namaste'])) {
//             response = "Hello! 👋 Welcome to FinGov Portal. I'm here to help you with government financial services. What would you like to know about?";

//         } else if (this.containsKeywords(lowerMessage, ['loan', 'credit', 'borrow'])) {
//             response = "💰 We offer various government loan schemes including:\n\n• Pradhan Mantri Mudra Yojana\n• Stand Up India Scheme\n• PM SVANidhi (Street Vendors)\n• Education Loans\n• Housing Loans\n\nWhich type of loan are you interested in?";

//         } else if (this.containsKeywords(lowerMessage, ['scheme', 'schemes', 'benefit', 'welfare'])) {
//             response = "🎯 Popular government schemes available:\n\n• Jan Dhan Yojana (Banking)\n• PM Kisan Samman Nidhi\n• Ayushman Bharat\n• PM Ujjwala Yojana\n• Digital India initiatives\n\nWould you like details about any specific scheme?";

//         } else if (this.containsKeywords(lowerMessage, ['insurance', 'coverage', 'policy'])) {
//             response = "🛡️ Government Insurance Programs:\n\n• Pradhan Mantri Jivan Jyoti Bima\n• PM Suraksha Bima Yojana\n• Ayushman Bharat Health Insurance\n• Crop Insurance Schemes\n• EPFO Social Security\n\nNeed information about eligibility or application process?";

//         } else if (this.containsKeywords(lowerMessage, ['contact', 'support', 'help', 'phone', 'email'])) {
//             response = "📞 Contact Information:\n\n• Helpline: 1800-XXX-XXXX\n• Email: support@fingov.gov.in\n• Live Chat: Available 24/7\n• Regional Offices: Available in all states\n\nYou can also visit your nearest Common Service Center (CSC) for assistance.";

//         } else if (this.containsKeywords(lowerMessage, ['thank', 'thanks', 'bye', 'goodbye'])) {
//             response = "🙏 You're welcome! Thank you for using FinGov Portal. Feel free to reach out anytime for assistance with government financial services. Have a great day! 🌟";

//         } else {
//             response = "🤔 I'd be happy to help you with that! For detailed information about your specific query, I can:\n\n• Connect you with a human agent\n• Direct you to the relevant section\n• Provide contact information\n• Schedule a callback\n\nOr you can try asking about loans, schemes, insurance, investments, or application procedures. What would you prefer?";
//         }

//         this.addBotMessage(response);
//     }

//     containsKeywords(text, keywords) {
//         return keywords.some(keyword => text.includes(keyword));
//     }

//     handleQuickAction(action) {
//         const quickResponses = {
//             'loan': "I'd like to know about government loan schemes available.",
//             'schemes': "Can you tell me about welfare schemes I can apply for?",
//             'insurance': "I need information about government insurance programs.",
//             'contact': "How can I contact support for assistance?"
//         };

//         const message = quickResponses[action];
//         if (message) {
//             this.chatbotInput.value = message;
//             this.sendMessage();
//         }
//     }
// }

// // Initialize chatbot when DOM is loaded
// document.addEventListener('DOMContentLoaded', function () {
//     if (document.getElementById('chatbotToggle')) {
//         window.fingovChatbot = new FinGovChatbot();
//     }
// });






class FinGovChatbot {
    constructor() {
        this.isOpen = false;
        this.isTyping = false;
        this.messageHistory = [];
        this.selectedOption = null;
        this.currentScheme = null;
        // this.apiKey = 'AIzaSyAgWjKWKykKrXjzblRzR4SAcKX18y9SRrc'; // Replace with your actual API key
        this.apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`;

        // Scheme database (minimal hardcoding)
        this.schemes = {
            'loan': {
                'mudra loan': {
                    applyUrl: 'https://www.udyamimitra.in/mudra-loan',
                    infoUrl: 'https://www.mudra.org.in/'
                },
                'education loan': {
                    applyUrl: 'https://www.vidyalakshmi.co.in/',
                    infoUrl: 'https://www.education.gov.in/scholarships'
                }
            },
            'scheme': {
                'pm kisan': {
                    applyUrl: 'https://pmkisan.gov.in/NewFarmer.aspx',
                    infoUrl: 'https://pmkisan.gov.in/'
                },
                'ayushman bharat': {
                    applyUrl: 'https://mera.pmjay.gov.in/search/login',
                    infoUrl: 'https://abnhpm.gov.in/'
                }
            },
            'insurance': {
                'pm jivan jyoti bima': {
                    applyUrl: 'https://www.jansuraksha.gov.in/',
                    infoUrl: 'https://financialservices.gov.in/insurance-divisions/Government-Sponsored-Socially-Oriented-Insurance-Schemes/Pradhan-Mantri-Jeevan-Jyoti-Bima-Yojana(PMJJBY)'
                }
            }
        };

        this.init();
        this.setupEventListeners();
        this.showWelcomeMessage();
    }

    init() {
        this.chatbotToggle = document.getElementById('chatbotToggle');
        this.chatbotContainer = document.getElementById('chatbotContainer');
        this.chatbotMessages = document.getElementById('chatbotMessages');
        this.chatbotInput = document.getElementById('chatbotInput');
        this.chatbotSend = document.getElementById('chatbotSend');
        this.chatbotMinimize = document.getElementById('chatbotMinimize');
        this.quickActions = document.getElementById('quickActions');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.notification = document.getElementById('chatbotNotification');
    }

    setupEventListeners() {
        this.chatbotToggle.addEventListener('click', () => this.toggleChatbot());
        this.chatbotMinimize.addEventListener('click', () => this.closeChatbot());
        this.chatbotSend.addEventListener('click', () => this.sendMessage());

        this.chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        this.quickActions.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-action-btn')) {
                const action = e.target.getAttribute('data-action');
                this.handleQuickAction(action);
            }
        });

        this.chatbotInput.addEventListener('input', () => this.updateSendButton());
    }

    toggleChatbot() {
        if (this.isOpen) {
            this.closeChatbot();
        } else {
            this.openChatbot();
        }
    }

    openChatbot() {
        this.isOpen = true;
        this.chatbotContainer.classList.add('active');
        this.chatbotToggle.classList.add('active');
        this.hideNotification();
        this.chatbotInput.focus();
    }

    closeChatbot() {
        this.isOpen = false;
        this.chatbotContainer.classList.remove('active');
        this.chatbotToggle.classList.remove('active');
    }

    hideNotification() {
        this.notification.classList.add('hidden');
    }

    showNotification() {
        this.notification.classList.remove('hidden');
    }

    showWelcomeMessage() {
        setTimeout(() => {
            this.addBotMessage(
                "🙏 Welcome to FinGov Portal! I'm your digital assistant here to help you with government financial services, schemes, and queries. How can I assist you today?",
                false
            );
            if (!this.isOpen) {
                this.showNotification();
            }
        }, 1000);
    }

    sendMessage() {
        const message = this.chatbotInput.value.trim();
        if (!message || this.isTyping) return;

        this.addUserMessage(message);
        this.chatbotInput.value = '';
        this.updateSendButton();
        this.processMessage(message);
    }

    addUserMessage(message) {
        const messageElement = this.createMessageElement('user', message);
        this.chatbotMessages.appendChild(messageElement);
        this.scrollToBottom();

        this.messageHistory.push({
            type: 'user',
            message: message,
            timestamp: new Date()
        });
    }

    addBotMessage(message, showTyping = true) {
        if (showTyping) {
            this.showTypingIndicator();

            setTimeout(() => {
                this.hideTypingIndicator();
                this.createBotMessage(message);
            }, 1500 + Math.random() * 1000);
        } else {
            this.createBotMessage(message);
        }
    }

    createBotMessage(message) {
        const messageElement = this.createMessageElement('bot', message);
        this.chatbotMessages.appendChild(messageElement);
        this.scrollToBottom();

        this.messageHistory.push({
            type: 'bot',
            message: message,
            timestamp: new Date()
        });

        if (!this.isOpen) {
            this.showNotification();
        }
    }

    createMessageElement(type, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.innerHTML = `
            <div class="message-avatar">
                ${type === 'user' ? '👤' : '🏛️'}
            </div>
            <div class="message-content">
                <div class="message-text">${text}</div>
                <div class="message-time">${currentTime}</div>
            </div>
        `;

        return messageDiv;
    }

    showTypingIndicator() {
        this.isTyping = true;
        this.typingIndicator.classList.add('active');
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        this.typingIndicator.classList.remove('active');
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
        }, 100);
    }

    updateSendButton() {
        const hasText = this.chatbotInput.value.trim().length > 0;
        this.chatbotSend.disabled = !hasText || this.isTyping;
    }

    async processMessage(message) {
        const lowerMessage = message.toLowerCase();

        // Check if we're in the middle of a flow
        if (this.currentScheme) {
            await this.handleSchemeFlow(message);
            return;
        }

        // Basic hardcoded responses
        if (this.containsKeywords(lowerMessage, ['hello', 'hi', 'hey', 'namaste'])) {
            this.addBotMessage("Hello! 👋 Welcome back to FinGov Portal. How can I assist you today?");
        }
        else if (this.containsKeywords(lowerMessage, ['thank', 'thanks', 'bye', 'goodbye'])) {
            this.addBotMessage("🙏 You're welcome! Thank you for using FinGov Portal. Have a great day! 🌟");
        }
        else if (this.containsKeywords(lowerMessage, ['loan', 'credit', 'borrow'])) {
            this.selectedOption = 'loan';
            this.hideQuickActions();
            this.addBotMessage("💰 Which loan scheme are you interested in? Here are some options:\n• Mudra Loan\n• Education Loan\n• Housing Loan\n• Business Loan\n\nType the name of the scheme you want information about.");
        }
        else if (this.containsKeywords(lowerMessage, ['scheme', 'schemes', 'benefit', 'welfare'])) {
            this.selectedOption = 'scheme';
            this.hideQuickActions();
            this.addBotMessage("🎯 Which government scheme would you like information about? Here are some options:\n• PM Kisan\n• Ayushman Bharat\n• Ujjwala Yojana\n• Jan Dhan Yojana\n\nType the name of the scheme you're interested in.");
        }
        else if (this.containsKeywords(lowerMessage, ['insurance', 'coverage', 'policy'])) {
            this.selectedOption = 'insurance';
            this.hideQuickActions();
            this.addBotMessage("🛡️ Which insurance program are you interested in? Here are some options:\n• PM Jivan Jyoti Bima\n• PM Suraksha Bima\n• Ayushman Bharat\n• Crop Insurance\n\nType the name of the insurance scheme you want to know about.");
        }
        else if (this.containsKeywords(lowerMessage, ['contact', 'support', 'help', 'phone', 'email'])) {
            this.addBotMessage("📞 Contact Information:\n\n• Helpline: 1800-XXX-XXXX\n• Email: support@fingov.gov.in\n• Live Chat: Available 24/7\n• Regional Offices: Available in all states");
        }
        else {
            // For other queries, use Gemini API
            this.fetchFromGemini(message);
        }
    }

    async handleSchemeFlow(message) {
        const schemeName = this.currentScheme;
        const schemeType = this.selectedOption;

        if (this.containsKeywords(message.toLowerCase(), ['eligibility', 'criteria', 'qualify', 'requirements'])) {
            const prompt = `Provide detailed eligibility criteria for ${schemeName} under ${schemeType} in Indian government in clear bullet points`;
            const eligibilityInfo = await this.fetchFromGemini(prompt);
            this.addBotMessage(`📋 Eligibility Criteria for ${schemeName}:\n\n${eligibilityInfo}`);
            this.showActionButtons(schemeName, schemeType);
        }
        else if (this.containsKeywords(message.toLowerCase(), ['apply', 'application', 'register', 'enroll'])) {
            this.handleActionButton('apply', schemeName);
        }
        else if (this.containsKeywords(message.toLowerCase(), ['info', 'details', 'about', 'website'])) {
            this.handleActionButton('page', schemeName);
        }
        else {
            // If user sends another message, treat it as a new query
            this.currentScheme = null;
            this.selectedOption = null;
            this.processMessage(message);
        }
    }

    hideQuickActions() {
        this.quickActions.style.opacity = '0';
        setTimeout(() => {
            this.quickActions.style.display = 'none';
        }, 300);
    }

    async handleQuickAction(action) {
        this.selectedOption = action;
        this.hideQuickActions();

        switch (action) {
            case 'loan':
                this.addBotMessage("💰 Which loan scheme are you interested in? You can ask about:\n• Mudra Loan\n• Education Loan\n• Housing Loan\n• Business Loan\n\nOr type the name of a specific scheme.");
                break;
            case 'schemes':
                this.addBotMessage("🎯 Which government scheme would you like information about? You can ask about:\n• PM Kisan\n• Ayushman Bharat\n• Ujjwala Yojana\n• Jan Dhan Yojana\n\nOr type the name of a specific scheme.");
                break;
            case 'insurance':
                this.addBotMessage("🛡️ Which insurance program are you interested in? You can ask about:\n• PM Jivan Jyoti Bima\n• PM Suraksha Bima\n• Ayushman Bharat\n• Crop Insurance\n\nOr type the name of a specific insurance scheme.");
                break;
            case 'contact':
                this.addBotMessage("📞 Contact Information:\n\n• Helpline: 1800-XXX-XXXX\n• Email: support@fingov.gov.in\n• Live Chat: Available 24/7\n• Regional Offices: Available in all states");
                break;
        }
    }

    async fetchFromGemini(query) {
        this.showTypingIndicator();

        try {
            // First check if this is a scheme/loan/insurance query
            if (this.selectedOption && !this.currentScheme) {
                const schemeMatch = this.findSchemeMatch(query);
                if (schemeMatch) {
                    this.currentScheme = schemeMatch;
                    const prompt = `Provide a 2-3 sentence summary about ${schemeMatch} under ${this.selectedOption} in Indian government`;
                    const info = await this.makeGeminiRequest(prompt);
                    this.hideTypingIndicator();

                    const response = `Here's about ${schemeMatch}:\n\n${info}\n\nWhat would you like to do next?`;
                    this.addBotMessage(response);
                    this.showActionButtons(schemeMatch, this.selectedOption);
                    return;
                }
            }

            // For general queries
            const response = await this.makeGeminiRequest(query);
            this.hideTypingIndicator();
            this.addBotMessage(response);
            return response;

        } catch (error) {
            console.error('Error fetching from Gemini API:', error);
            this.hideTypingIndicator();
            this.addBotMessage("I couldn't fetch that information right now. Please try again later or visit the official website.");
            return "I couldn't fetch that information right now. Please try again later.";
        }
    }

    async makeGeminiRequest(prompt) {
        const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    findSchemeMatch(query) {
        if (!this.selectedOption || !this.schemes[this.selectedOption]) return null;

        const queryLower = query.toLowerCase();
        for (const scheme in this.schemes[this.selectedOption]) {
            if (queryLower.includes(scheme.toLowerCase())) {
                return scheme;
            }
        }
        return null;
    }

    showActionButtons(schemeName, schemeType) {
        const actionButtons = `
            <div class="action-buttons">
                <button class="action-btn" data-action="info">ℹ️ Eligibility Info</button>
                <button class="action-btn" data-action="apply">📝 Apply Now</button>
                <button class="action-btn" data-action="page">🌐 Official Page</button>
            </div>
        `;

        // Append buttons to the last bot message
        const lastMessage = this.chatbotMessages.lastElementChild;
        if (lastMessage && lastMessage.classList.contains('bot')) {
            const messageContent = lastMessage.querySelector('.message-content');
            if (messageContent) {
                messageContent.insertAdjacentHTML('beforeend', actionButtons);
                this.setupActionButtons(schemeName, schemeType);
            }
        }
    }

    setupActionButtons(schemeName, schemeType) {
        setTimeout(() => {
            const actionBtns = document.querySelectorAll('.action-btn');
            actionBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const action = e.target.getAttribute('data-action');
                    this.handleActionButton(action, schemeName, schemeType);
                });
            });
        }, 100);
    }

    handleActionButton(action, schemeName, schemeType) {
        const schemeData = this.schemes[schemeType]?.[schemeName];

        switch (action) {
            case 'info':
                this.addBotMessage(`Checking eligibility criteria for ${schemeName}...`);
                this.fetchFromGemini(`What are the eligibility criteria for ${schemeName} under ${schemeType} in Indian government? Provide detailed bullet points`)
                    .then(info => {
                        this.addBotMessage(`📋 Eligibility for ${schemeName}:\n\n${info}`);
                        this.showActionButtons(schemeName, schemeType);
                    });
                break;

            case 'apply':
                if (schemeData && schemeData.applyUrl) {
                    this.addBotMessage(`Redirecting to application form for ${schemeName}...`);
                    setTimeout(() => {
                        window.open(schemeData.applyUrl, '_blank');
                    }, 1500);
                } else {
                    this.addBotMessage(`I couldn't find the application link for ${schemeName}. Please visit the official website.`);
                }
                break;

            case 'page':
                if (schemeData && schemeData.infoUrl) {
                    this.addBotMessage(`Opening official page for ${schemeName}...`);
                    setTimeout(() => {
                        window.open(schemeData.infoUrl, '_blank');
                    }, 1500);
                } else {
                    this.addBotMessage(`I couldn't find the official page for ${schemeName}. Try searching on https://www.india.gov.in/`);
                }
                break;
        }
    }

    containsKeywords(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('chatbotToggle')) {
        window.fingovChatbot = new FinGovChatbot();
    }
});

// Global functions for external integration
window.FinGovChatbot = {
    open: () => window.fingovChatbot?.openChatbot(),
    close: () => window.fingovChatbot?.closeChatbot(),
    sendMessage: (message) => {
        if (window.fingovChatbot) {
            window.fingovChatbot.chatbotInput.value = message;
            window.fingovChatbot.sendMessage();
        }
    }
};
