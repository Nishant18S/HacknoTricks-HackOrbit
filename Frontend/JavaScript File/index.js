 const chatBox = document.getElementById('chat-box');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const langToggle = document.getElementById('lang-toggle');

    // Panel Elements
    const languageBtn = document.getElementById('language-btn');
    const voiceBtn = document.getElementById('voice-btn');
    const cameraBtn = document.getElementById('camera-btn');
    const uploadBtn = document.getElementById('upload-btn');
    const readerBtn = document.getElementById('reader-btn');
    const emergencyBtn = document.getElementById('emergency-btn');
    const grievanceBtn = document.getElementById('grievance-btn');
    const schemesBtn = document.getElementById('schemes-btn');
    const documentsBtn = document.getElementById('documents-btn');
    const folderBtn = document.getElementById('folder-btn');
    const downloadChatBtn = document.getElementById('download-chat-btn');
    const clearChatBtn = document.getElementById('clear-chat-btn');


    const languagePanel = document.getElementById('language-panel');
    const uploadPanel = document.getElementById('upload-panel');
    const cameraPanel = document.getElementById('camera-panel');
    const emergencyPanel = document.getElementById('emergency-panel');
    const grievancePanel = document.getElementById('grievance-panel');
    const schemesPanel = document.getElementById('schemes-panel');
    const documentsPanel = document.getElementById('documents-panel');
    const folderPanel = document.getElementById('folder-panel');
    const ocrPanel = document.getElementById('ocr-panel');
    const docTypePanel = document.getElementById('document-type-panel');

    const closePanelButtons = document.querySelectorAll('.close-panel');
    const langOptions = document.querySelectorAll('.lang-option');
    const deptButtons = document.querySelectorAll('.dept-btn');
    const offlineIndicator = document.getElementById('offline-indicator');
    const offlineModeBtn = document.getElementById('offline-mode-btn');
        const scanAnimation = document.getElementById('scan-animation');
    const ocrPreview = document.getElementById('ocr-preview');
    const ocrProcessing = document.getElementById('ocr-processing');

    // Variables
    let isOffline = false;

    let currentDept = 'health,education,finance,agriculture';
    let currentLang = 'en';
    let readerActive = true;
    let recognition;
    let cameraStream;
    let userLocation = { lat: null, lon: null };
    let applications = [];
    let grievances = [];
    let chatHistory = [];

    // Language names for the toggle
    const languageNames = {
      en: 'English',
      hi: 'हिंदी',
      or: 'ଓଡ଼ିଆ',
      ta: 'தமிழ்',
      te: 'తెలుగు',
      ml: 'മലയാളം'
    };

    // Language-specific placeholders
    const languagePlaceholders = {
      en: 'Type your message...',
      hi: 'अपना संदेश टाइप करें...',
      or: 'ଆପଣଙ୍କର ବାର୍ତ୍ତା ଟାଇପ୍ କରନ୍ତୁ...',
      ta: 'உங்கள் செய்தியை தட்டச்சு செய்க...',
      te: 'మీ సందేశాన్ని టైప్ చేయండి...',
      ml: 'നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക...'
    };

    // Document templates
    const documentTemplates = {
      aadhaar: {
        name: "Aadhaar Card",
        fields: {
          name: "John Doe",
          dob: "15-07-1985",
          gender: "Male",
          aadhaarNumber: "1234 5678 9012",
          address: "123 Main St, City, State - 560001"
        }
      },
      pan: {
        name: "PAN Card",
        fields: {
          name: "John Doe",
          fatherName: "Robert Doe",
          dob: "15-07-1985",
          panNumber: "ABCDE1234F"
        }
      },
      voter: {
        name: "Voter ID",
        fields: {
          name: "John Doe",
          fatherName: "Robert Doe",
          dob: "15-07-1985",
          voterId: "ABC1234567",
          address: "123 Main St, City, State - 560001"
        }
      },
      driving: {
        name: "Driving License",
        fields: {
          name: "John Doe",
          dob: "15-07-1985",
          licenseNumber: "DL-123456789012",
          validity: "15-07-2030"
        }
      }
    };

    // Folder contents
    const folderContents = {
      id: [
        { type: 'aadhaar', name: 'Aadhaar Card', date: '2024-05-10' },
        { type: 'pan', name: 'PAN Card', date: '2024-04-22' },
        { type: 'voter', name: 'Voter ID', date: '2024-03-15' },
        { type: 'driving', name: 'Driving License', date: '2024-02-28' }
      ],
      finance: [
        { type: 'bank', name: 'Bank Statement', date: '2024-06-01' },
        { type: 'tax', name: 'Tax Returns', date: '2024-05-20' },
        { type: 'salary', name: 'Salary Slips', date: '2024-05-05' }
      ],
      health: [
        { type: 'medical', name: 'Medical Reports', date: '2024-06-10' },
        { type: 'insurance', name: 'Health Insurance', date: '2024-05-15' },
        { type: 'vaccine', name: 'Vaccination Records', date: '2024-04-30' }
      ],
      education: [
        { type: 'degree', name: 'Degree Certificate', date: '2024-03-01' },
        { type: 'marksheet', name: 'Marksheets', date: '2024-02-15' }
      ],
      property: [
        { type: 'sale', name: 'Sale Deed', date: '2024-01-10' },
        { type: 'tax', name: 'Property Tax Receipts', date: '2024-06-05' }
      ],
      others: [
        { type: 'misc', name: 'Miscellaneous Documents', date: '2024-05-25' }
      ]
    };

    // Department-specific actions
    const departmentActions = {
      health: [
        { id: 'apply_scheme', title: 'Apply for Health Scheme', icon: 'fa-file-medical' },
        { id: 'find_hospital', title: 'Find Nearby Hospitals', icon: 'fa-hospital' },
        { id: 'book_appointment', title: 'Book Doctor Appointment', icon: 'fa-calendar-check' },
        { id: 'emergency_services', title: 'Emergency Services', icon: 'fa-ambulance' },
        { id: 'health_records', title: 'Access Health Records', icon: 'fa-file-medical-alt' }
      ],
      agriculture: [
        { id: 'apply_loan', title: 'Apply for Agriculture Loan', icon: 'fa-hand-holding-usd' },
        { id: 'crop_prices', title: 'Check Crop Prices', icon: 'fa-seedling' },
        { id: 'weather_forecast', title: 'Weather Forecast', icon: 'fa-cloud-sun' },
        { id: 'subsidy_info', title: 'Subsidy Information', icon: 'fa-percentage' },
        { id: 'mandi_prices', title: 'Mandi Prices', icon: 'fa-shopping-cart' }
      ],
      finance: [
        { id: 'personal_loan', title: 'Apply for Personal Loan', icon: 'fa-money-bill-wave' },
        { id: 'tax_assistance', title: 'Tax Filing Assistance', icon: 'fa-file-invoice-dollar' },
        { id: 'pension_services', title: 'Pension Services', icon: 'fa-user-tie' },
        { id: 'investment_schemes', title: 'Investment Schemes', icon: 'fa-chart-line' },
        { id: 'banking_services', title: 'Banking Services', icon: 'fa-university' }
      ],
      education: [
        { id: 'scholarship', title: 'Apply for Scholarship', icon: 'fa-graduation-cap' },
        { id: 'admission', title: 'Admission Assistance', icon: 'fa-user-graduate' },
        { id: 'exam_results', title: 'Check Exam Results', icon: 'fa-poll' },
        { id: 'online_courses', title: 'Online Courses', icon: 'fa-laptop' },
        { id: 'certificate', title: 'Download Certificate', icon: 'fa-file-certificate' }
      ]
    };

    // Initialize
    function init() {
      // Set current department
      setActiveDepartment('health');

      // Add event listeners
      addEventListeners();

      // Initialize location
      getLocation();

      // Initialize accessibility
      toggleReader();

      // Update language toggle
      updateLangToggle();


      // Enhanced offline detection
      updateOfflineStatus();


      // Load chat history from local storage
      loadChatHistory();
      window.addEventListener('online', updateOfflineStatus);
      window.addEventListener('offline', updateOfflineStatus);

      // Enhanced event listeners
      attachBtn.addEventListener('click', showAttachmentOptions);
      offlineModeBtn.addEventListener('click', toggleOfflineMode);
      loadUserData();
    }

    function updateOfflineStatus() {
      isOffline = !navigator.onLine;
      offlineIndicator.style.display = isOffline ? 'flex' : 'none';
      offlineModeBtn.innerHTML = isOffline ?
        '<i class="fas fa-wifi-slash"></i>' :
        '<i class="fas fa-wifi"></i>';
    }

    function toggleOfflineMode() {
      if (isOffline) {
        // Try to reconnect
        location.reload();
      } else {
        // Prepare for offline
        saveAllData();
        addBotMessage("Offline mode activated. Some features may be limited.");
      }
    }

    // Enhanced data persistence
    function saveAllData() {
      localStorage.setItem('userApplications', JSON.stringify(applications));
      localStorage.setItem('userGrievances', JSON.stringify(grievances));
      localStorage.setItem('userChatHistory', JSON.stringify(chatHistory));
      localStorage.setItem('userDocuments', JSON.stringify(folderContents));
    }

    function loadUserData() {
      applications = JSON.parse(localStorage.getItem('userApplications')) || [];
      grievances = JSON.parse(localStorage.getItem('userGrievances')) || [];
      chatHistory = JSON.parse(localStorage.getItem('userChatHistory')) || [];
      const savedDocs = JSON.parse(localStorage.getItem('userDocuments'));
      if (savedDocs) folderContents = savedDocs;

      // Show pending applications
      renderApplications();
    }

    // Enhanced attachment handling
    function showAttachmentOptions() {
      const attachmentHTML = `
    <div class="attachment-options">
      <button class="attachment-option" data-type="image">
        <i class="fas fa-image"></i> Photo
      </button>
      <button class="attachment-option" data-type="document">
        <i class="fas fa-file-pdf"></i> Document
      </button>
      <button class="attachment-option" data-type="location">
        <i class="fas fa-map-marker-alt"></i> Location
      </button>
    </div>
  `;

      addBotMessage("What would you like to attach?", attachmentHTML);

      // Add event listeners
      document.querySelectorAll('.attachment-option').forEach(option => {
        option.addEventListener('click', (e) => {
          const type = e.currentTarget.dataset.type;
          handleAttachment(type);
        });
      });
    }

    function handleAttachment(type) {
      switch (type) {
        case 'image':
          cameraPanel.classList.add('active');
          startCamera();
          break;
        case 'document':
          uploadPanel.classList.add('active');
          break;
        case 'location':
          shareLocation();
          break;
      }
    }

    // Enhanced location handling
    function getLocation() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              userLocation = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
              };
              document.getElementById('location-text').textContent =
                `Approx: ${userLocation.lat.toFixed(4)}, ${userLocation.lon.toFixed(4)}`;
              resolve(userLocation);
            },
            error => {
              console.error('Error getting location:', error);
              document.getElementById('location-text').textContent =
                'Location access denied. Using approximate location based on IP.';
              estimateLocationByIP().then(resolve).catch(reject);
            }
          );
        } else {
          estimateLocationByIP().then(resolve).catch(reject);
        }
      });
    }

    function estimateLocationByIP() {
      return fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
          userLocation = {
            lat: data.latitude,
            lon: data.longitude,
            city: data.city,
            region: data.region
          };
          document.getElementById('location-text').textContent =
            `Approx: ${data.city}, ${data.region}`;
          return userLocation;
        })
        .catch(error => {
          console.error('IP location error:', error);
          document.getElementById('location-text').textContent =
            'Location services unavailable';
          return null;
        });
    }
    function shareLocation() {
      if (userLocation) {
        const mapUrl = `https://www.google.com/maps?q=${userLocation.lat},${userLocation.lon}`;
        addUserMessage("Sharing my current location");
        addBotMessage(`Your approximate location: <a href="${mapUrl}" target="_blank">View on Google Maps</a>`);
      } else {
        getLocation().then(shareLocation);
      }
    }

    // Enhanced OCR and document processing
    function processDocumentImage(imageData, docType) {
      togglePanel(ocrPanel);

      // Simulate OCR processing with realistic delay
      setTimeout(() => {
        const document = documentTemplates[docType];

        // Enhanced OCR simulation - extract text from image
        const ocrResult = simulateOCR(document, docType);

        displayDocumentPreview(ocrResult, docType, imageData);
      }, 2500);
    }

    function simulateOCR(document, docType) {
      // Realistic OCR simulation with potential errors
      const fields = { ...document.fields };

      // Introduce realistic OCR errors
      const errorRate = 0.2; // 20% chance of error per field
      for (const field in fields) {
        if (Math.random() < errorRate) {
          fields[field] = introduceOCRerror(fields[field]);
        }
      }

      return {
        name: document.name,
        fields: fields,
        confidence: (90 + Math.random() * 9).toFixed(1) + "%",
        docType: docType
      };
    }
    function introduceOCRerror(text) {
      const errors = [
        text => text.replace(/[aeiou]/gi, ''), // remove vowels
        text => text.replace(/\d/g, match => Math.random() > 0.5 ? '8' : '0'), // number errors
        text => text.split('').reverse().join(''), // reverse
        text => text.toUpperCase(), // all caps
        text => text.replace(/[a-z]/gi, match =>
          Math.random() > 0.7 ? String.fromCharCode(match.charCodeAt(0) + 1) : match) // char shift
      ];

      return errors[Math.floor(Math.random() * errors.length)](text);
    }
    // Enhanced application tracking
    function renderApplications() {
      if (applications.length === 0) return;

      const appsHTML = `
    <div class="section-title">My Applications</div>
    ${applications.map(app => `
      <div class="application-card">
        <div class="application-title">
          <i class="fas fa-file-alt"></i> ${app.title}
          <span class="application-status ${app.statusClass}">${app.statusText}</span>
        </div>
        <div class="scheme-details">
          Application ID: <strong>${app.id}</strong>
        </div>
        <div class="scheme-eligibility">
          <i class="fas fa-clock"></i> Submitted: ${app.date}
          ${app.lastUpdate ? `<br><i class="fas fa-sync"></i> Last update: ${app.lastUpdate}` : ''}
        </div>
        <div class="service-actions">
          <button class="service-action-btn" data-app-id="${app.id}">Track Status</button>
          <button class="service-action-btn" data-app-id="${app.id}">Download Receipt</button>
        </div>
      </div>
    `).join('')}
  `;

      addBotMessage('Your recent applications:', appsHTML);

      // Add event listeners
      document.querySelectorAll('.service-action-btn[data-app-id]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const appId = e.target.dataset.appId;
          const app = applications.find(a => a.id === appId);
          showApplicationDetails(app);
        });
      });
    }
    function showApplicationDetails(app) {
      const detailsHTML = `
    <div class="application-details">
      <h3>${app.title} - ${app.id}</h3>
      <div class="detail-row">
        <span>Status:</span>
        <span class="application-status ${app.statusClass}">${app.statusText}</span>
      </div>
      <div class="detail-row">
        <span>Submitted:</span>
        <span>${app.date}</span>
      </div>
      ${app.lastUpdate ? `
      <div class="detail-row">
        <span>Last Update:</span>
        <span>${app.lastUpdate}</span>
      </div>` : ''}
      
      <div class="progress-tracker">
        ${['Submitted', 'Processing', 'Verification', 'Approval'].map((stage, index) => `
          <div class="progress-stage ${index < app.stage ? 'completed' : ''}">
            <div class="stage-icon">${index + 1}</div>
            <div class="stage-label">${stage}</div>
          </div>
        `).join('')}
      </div>
      
      ${app.notes ? `<div class="application-notes"><strong>Notes:</strong> ${app.notes}</div>` : ''}
      
      <div class="service-actions">
        <button class="service-action-btn download-receipt-btn">Download Receipt</button>
        <button class="service-action-btn contact-support-btn">Contact Support</button>
      </div>
    </div>
  `;

      addBotMessage(`Application details for ${app.id}:`, detailsHTML);

      // Add event listeners
      document.querySelector('.download-receipt-btn')?.addEventListener('click', () => {
        generateApplicationPDF(app);
      });

      document.querySelector('.contact-support-btn')?.addEventListener('click', () => {
        startSupportChat(app);
      });
    }

    // Enhanced unimplemented features
    function showSubsidyInformation() {
      const subsidies = {
        health: [
          { name: "PMJAY Health Insurance", amount: "₹5 lakh/year", eligibility: "Families in SECC database" },
          { name: "Janani Suraksha Yojana", amount: "₹1,400-₹6,000", eligibility: "Pregnant women from BPL families" }
        ],
        agriculture: [
          { name: "PM Kisan Samman Nidhi", amount: "₹6,000/year", eligibility: "Small and marginal farmers" },
          { name: "Subsidy on Farm Equipment", amount: "50-80%", eligibility: "All farmers" }
        ],
        education: [
          { name: "Post-Matric Scholarship", amount: "Full tuition + maintenance", eligibility: "SC/ST students" },
          { name: "National Means Scholarship", amount: "₹12,000/year", eligibility: "Class 9-12 students" }
        ]
      };

      const deptSubsidies = subsidies[currentDept] || subsidies.agriculture;

      let html = '<div class="subsidy-list">';
      deptSubsidies.forEach(subsidy => {
        html += `
      <div class="subsidy-card">
        <div class="subsidy-name">${subsidy.name}</div>
        <div class="subsidy-amount">Amount: ${subsidy.amount}</div>
        <div class="subsidy-eligibility">Eligibility: ${subsidy.eligibility}</div>
        <button class="service-action-btn apply-subsidy-btn">Apply Now</button>
        <button class="service-action-btn details-btn">Details</button>
      </div>
    `;
      });
      html += '</div>';

      addBotMessage(`Available subsidies for ${currentDept}:`, html);

      // Add event listeners
      document.querySelectorAll('.apply-subsidy-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
          startSchemeApplication(deptSubsidies[index].name);
        });
      });
    }

    function showMandiPrices() {
      getLocation().then(location => {
        const crops = [
          { name: "Wheat", min: 2100, max: 2300, unit: "quintal", trend: "up" },
          { name: "Rice", min: 3000, max: 3200, unit: "quintal", trend: "stable" },
          { name: "Tomato", min: 800, max: 1500, unit: "quintal", trend: "down" },
          { name: "Potato", min: 900, max: 1100, unit: "quintal", trend: "up" }
        ];

        let html = `<div class="mandi-prices">
      <div class="location-info">
        <i class="fas fa-map-marker-alt"></i> 
        Nearest mandi: ${location.city ? `${location.city} Mandi` : 'Regional Mandi'}
      </div>`;

        crops.forEach(crop => {
          html += `
        <div class="crop-price">
          <div class="crop-name">${crop.name}</div>
          <div class="price-range">₹${crop.min} - ₹${crop.max}/${crop.unit}</div>
          <div class="price-trend ${crop.trend}">
            <i class="fas fa-arrow-${crop.trend === 'up' ? 'up' : crop.trend === 'down' ? 'down' : 'right'}"></i>
            ${crop.trend === 'up' ? 'Increasing' : crop.trend === 'down' ? 'Decreasing' : 'Stable'}
          </div>
        </div>
      `;
        });

        html += `
      <div class="service-actions">
        <button class="service-action-btn">View Historical Prices</button>
        <button class="service-action-btn">Get Price Alerts</button>
      </div>
    </div>`;

        addBotMessage("Current mandi prices:", html);
      });
    }

    // Enhanced voice recognition with continuous listening
    function startVoiceInput() {
      if (!('webkitSpeechRecognition' in window)) {
        addBotMessage('Voice recognition is not supported in your browser.');
        return;
      }

      recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = getLangCode();

      let finalTranscript = '';

      recognition.onstart = function () {
        voiceBtn.classList.add('active');
        addBotMessage('Listening... Speak now.');
      };

      recognition.onresult = function (event) {
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        // Update input field with interim results
        userInput.value = finalTranscript + interimTranscript;
      };

      recognition.onerror = function (event) {
        voiceBtn.classList.remove('active');
        addBotMessage('Voice recognition error: ' + event.error);
      };

      recognition.onend = function () {
        voiceBtn.classList.remove('active');
        if (finalTranscript) {
          // Auto-submit if we have final transcript
          setTimeout(() => {
            chatForm.dispatchEvent(new Event('submit'));
          }, 500);
        }
      };

      recognition.start();
    }
    // Enhanced AI responses
    async function getAIResponse(message) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Enhanced context-aware responses
          const contextResponse = handleContextualQuery(message);
          if (contextResponse) {
            resolve(contextResponse);
            return;
          }

          // Department-specific responses
          const deptResponses = {
            health: [
              "For health services, I can help you with:",
              "• Finding nearby hospitals and clinics",
              "• Booking doctor appointments",
              "• Applying for health insurance schemes",
              "• Accessing your health records",
              "How can I assist you specifically?"
            ],
            agriculture: [
              "Agricultural services I can help with:",
              "• Current crop prices and market trends",
              "• Weather forecasts for your farm",
              "• Applying for agricultural subsidies",
              "• Kisan Credit Card applications",
              "• Connecting with agricultural experts",
              "What do you need help with today?"
            ],
            finance: [
              "Financial services available:",
              "• Personal loan calculations and applications",
              "• Tax filing assistance",
              "• Pension service information",
              "• Government investment schemes",
              "• Banking service locator",
              "How can I help with your financial needs?"
            ],
            education: [
              "Education services I can assist with:",
              "• Scholarship applications",
              "• Admission procedures",
              "• Exam results and certificates",
              "• Online course recommendations",
              "• Educational institution information",
              "What educational support do you need?"
            ]
          };

          const response = deptResponses[currentDept] || [
            "I can help you with government services related to:",
            "• Health Department services",
            "• Agriculture Department programs",
            "• Finance and schemes",
            "• Education services",
            "Which department would you like assistance with?"
          ];

          resolve(response.join('<br>'));
        }, 1000);
      });
    }

    function handleContextualQuery(message) {
      const lowerMsg = message.toLowerCase();

      // Application status queries
      if (lowerMsg.includes('status') && lowerMsg.includes('application')) {
        if (applications.length === 0) {
          return "You don't have any recent applications. Would you like to apply for a service?";
        }

        let response = "Your recent applications:\n";
        applications.forEach(app => {
          response += `• ${app.title} (${app.id}): ${app.statusText}\n`;
        });
        response += "\nSay 'details' followed by application ID for more information.";
        return response;
      }

      // Grievance status queries
      if (lowerMsg.includes('status') && lowerMsg.includes('grievance')) {
        if (grievances.length === 0) {
          return "You haven't filed any grievances yet.";
        }

        let response = "Your filed grievances:\n";
        grievances.forEach(grievance => {
          response += `• ${grievance.id}: ${grievance.status}\n`;
        });
        return response;
      }

      // Document queries
      if (lowerMsg.includes('document') || lowerMsg.includes('aadhaar') ||
        lowerMsg.includes('pan') || lowerMsg.includes('voter')) {
        return "I can help you with document services:\n• Upload documents for verification\n• Access documents in your digital locker\n• Apply for new documents\nHow can I assist you?";
      }

      // Location-based services
      if (lowerMsg.includes('near me') || lowerMsg.includes('nearby')) {
        return "Based on your location, I can help you find:\n• Government offices\n• Hospitals\n• Banks\n• Schools\nWhat service are you looking for?";
      }

      return null;
    }

    // Enhanced application submission
    function submitApplication(formType, formData) {
      const schemes = {
        health: { title: "Ayushman Bharat Health Scheme", prefix: "HLTH" },
        agri: { title: "Kisan Credit Card", prefix: "AGRI" },
        edu: { title: "National Scholarship", prefix: "EDU" },
        appt: { title: "Doctor Appointment", prefix: "APPT" }
      };

      const scheme = schemes[formType];
      const appId = `${scheme.prefix}-${Math.floor(1000 + Math.random() * 9000)}`;

      const application = {
        id: appId,
        title: scheme.title,
        date: new Date().toLocaleDateString(),
        statusText: "Submitted",
        statusClass: "status-pending",
        formData: formData,
        stage: 1
      };

      applications.push(application);
      saveAllData();

      // Schedule status updates
      scheduleStatusUpdate(application);

      return application;
    }

    function scheduleStatusUpdate(application) {
      // Simulate processing delays
      const delays = [3000, 5000, 8000, 10000]; // 3s, 5s, 8s, 10s
      const statuses = ["Processing", "Under Review", "Approved"];
      const notes = [
        "Application received",
        "Documents verified",
        "Eligibility confirmed",
        "Approval granted"
      ];

      statuses.forEach((status, index) => {
        setTimeout(() => {
          application.stage = index + 2;
          application.statusText = status;
          application.lastUpdate = new Date().toLocaleString();

          if (index === statuses.length - 1) {
            application.statusText = "Approved";
            application.statusClass = "status-approved";
            application.notes = "Your application has been approved!";
          } else {
            application.notes = notes[index];
          }

          saveAllData();

          // Notify user
          addBotMessage(`Update for application ${application.id}: ${application.notes}`);
        }, delays[index]);
      });
    }

    // Enhanced camera functionality with flash simulation
    function captureImage() {
      const video = document.getElementById('camera-feed');
      const canvas = document.getElementById('camera-canvas');
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Simulate camera flash
      const flash = document.createElement('div');
      flash.style.position = 'fixed';
      flash.style.top = '0';
      flash.style.left = '0';
      flash.style.width = '100%';
      flash.style.height = '100%';
      flash.style.backgroundColor = 'rgba(255,255,255,0.9)';
      flash.style.zIndex = '10000';
      flash.style.pointerEvents = 'none';
      flash.style.animation = 'flash 0.3s';
      document.body.appendChild(flash);

      setTimeout(() => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        document.body.removeChild(flash);

        const imageData = canvas.toDataURL('image/png');
        const docType = getDocumentTypeFromCamera();

        processDocumentImage(imageData, docType);
        stopCamera();
      }, 300);
    }

    function getDocumentTypeFromCamera() {
      const docTypes = ['aadhaar', 'pan', 'voter', 'driving'];
      return docTypes[Math.floor(Math.random() * docTypes.length)];
    }


    // Add event listeners
    function addEventListeners() {
      // Form submission
      chatForm.addEventListener('submit', sendMessage);

      // Department buttons
      deptButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const dept = btn.dataset.dept;
          setActiveDepartment(dept);
        });
      });

      // Language options
      langOptions.forEach(option => {
        option.addEventListener('click', () => {
          const lang = option.dataset.lang;
          setLanguage(lang);
        });
      });

      // Feature buttons
      languageBtn.addEventListener('click', () => togglePanel(languagePanel));
      uploadBtn.addEventListener('click', () => togglePanel(uploadPanel));
      cameraBtn.addEventListener('click', () => togglePanel(cameraPanel));
      emergencyBtn.addEventListener('click', () => togglePanel(emergencyPanel));
      grievanceBtn.addEventListener('click', () => togglePanel(grievancePanel));
      schemesBtn.addEventListener('click', () => togglePanel(schemesPanel));
      documentsBtn.addEventListener('click', () => togglePanel(documentsPanel));
      folderBtn.addEventListener('click', () => togglePanel(folderPanel));
      readerBtn.addEventListener('click', toggleReader);
      langToggle.addEventListener('click', () => togglePanel(languagePanel));
      downloadChatBtn.addEventListener('click', downloadChatHistory);
      clearChatBtn.addEventListener('click', clearChatHistory);

      // Close panel buttons
      closePanelButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const panel = btn.closest('.feature-panel');
          panel.classList.remove('active');
        });
      });

      // Voice button
      voiceBtn.addEventListener('click', startVoiceInput);

      // Upload area
      document.getElementById('upload-area').addEventListener('click', () => {
        simulateDocumentUpload();
      });

      // Camera buttons
      document.getElementById('camera-upload-btn').addEventListener('click', () => {
        uploadPanel.classList.remove('active');
        showDocumentTypeSelector();
      });

      document.getElementById('camera-cancel').addEventListener('click', () => {
        stopCamera();
        cameraPanel.classList.remove('active');
        document.querySelector('.scan-animation').style.display = 'none';
      });

      document.getElementById('camera-capture').addEventListener('click', captureImage);

      // Grievance submission
      document.getElementById('submit-grievance').addEventListener('click', submitGrievance);

      // Apply scheme buttons
      document.querySelectorAll('.apply-scheme-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const scheme = e.target.dataset.scheme;
          startSchemeApplication(scheme);
        });
      });

      // Emergency options
      document.querySelectorAll('.emergency-option').forEach(option => {
        option.addEventListener('click', (e) => {
          const type = e.currentTarget.dataset.type;
          findEmergencyServices(type);
        });
      });

      // Folder navigation
      document.querySelectorAll('.folder-item').forEach(item => {
        item.addEventListener('click', () => {
          const folder = item.dataset.folder;
          showFolderContent(folder);
        });
      });

      // Back to folders button
      document.getElementById('back-to-folders').addEventListener('click', () => {
        document.getElementById('folder-content').style.display = 'none';
        document.getElementById('folder-grid').style.display = 'grid';
      });

      // OCR Submit button
      document.getElementById('ocr-submit-btn').addEventListener('click', submitDocument);

      // Department action buttons
      chatBox.addEventListener('click', function (e) {
        if (e.target.classList.contains('dept-action-btn')) {
          const actionId = e.target.dataset.action;
          handleDepartmentAction(actionId);
        }

        if (e.target.classList.contains('form-submit-btn')) {
          handleFormSubmission(e);
        }
      });
    }

    // Set active department
    function setActiveDepartment(dept) {
      currentDept = dept;

      // Update UI
      deptButtons.forEach(btn => {
        if (btn.dataset.dept === dept) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      // Update header
      const deptIcon = document.querySelector('.dept-icon');
      const deptTitle = document.querySelector('.dept-info h2');
      const deptSubtitle = document.querySelector('.dept-info p');

      deptIcon.className = 'dept-icon';
      switch (dept) {
        case 'health':
          deptIcon.classList.add('health-icon');
          deptTitle.textContent = 'Health Department';
          deptSubtitle.textContent = 'Online assistance for health services';
          break;
        case 'agriculture':
          deptIcon.classList.add('agriculture-icon');
          deptTitle.textContent = 'Agriculture Department';
          deptSubtitle.textContent = 'Support for farmers and agriculture';
          break;
        case 'finance':
          deptIcon.classList.add('finance-icon');
          deptTitle.textContent = 'Finance Department';
          deptSubtitle.textContent = 'Schemes, loans, and financial services';
          break;
        case 'education':
          deptIcon.classList.add('education-icon');
          deptTitle.textContent = 'Education Department';
          deptSubtitle.textContent = 'Educational programs and services';
          break;
      }

      // Show department actions
      showDepartmentActions();
    }

    // Show department actions in chat
    function showDepartmentActions() {
      const actions = departmentActions[currentDept];
      let actionsHTML = '<div class="dept-actions">';

      actions.forEach(action => {
        actionsHTML += `
          <button class="dept-action-btn" data-action="${action.id}">
            <i class="fas ${action.icon}"></i> ${action.title}
          </button>
        `;
      });

      actionsHTML += '</div>';

      addBotMessage(`How can I assist you with ${document.querySelector('.dept-info h2').textContent}? Here are some actions you can take:`, actionsHTML);
    }

    // Set language
    function setLanguage(lang) {
      currentLang = lang;

      // Update UI
      langOptions.forEach(option => {
        if (option.dataset.lang === lang) {
          option.classList.add('active');
        } else {
          option.classList.remove('active');
        }
      });

      // Update language toggle
      updateLangToggle();

      // Update input placeholder
      userInput.placeholder = languagePlaceholders[lang] || 'Type your message...';

      // Show message about language change
      let langName = '';
      switch (lang) {
        case 'en': langName = 'English'; break;
        case 'hi': langName = 'Hindi'; break;
        case 'or': langName = 'Odia'; break;
        case 'ta': langName = 'Tamil'; break;
        case 'te': langName = 'Telugu'; break;
        case 'ml': langName = 'Malayalam'; break;
      }

      addBotMessage(`Language changed to ${langName}. How can I assist you?`);
      languagePanel.classList.remove('active');
    }

    // Update language toggle display
    function updateLangToggle() {
      const langText = document.querySelector('#lang-toggle span');
      langText.textContent = languageNames[currentLang] || 'English';
    }

    // Toggle panel
    function togglePanel(panel) {
      // Hide all panels first
      document.querySelectorAll('.feature-panel').forEach(p => {
        p.classList.remove('active');
      });

      // Toggle requested panel
      panel.classList.toggle('active');
    }

    // Toggle screen reader
    function toggleReader() {
      readerActive = !readerActive;
      readerBtn.classList.toggle('active', readerActive);

      const notice = document.getElementById('accessibility-notice');
      if (readerActive) {
        notice.style.display = 'flex';
        speakMessage('Screen reader is now active. I will read messages aloud.');
      } else {
        notice.style.display = 'none';
        speakMessage('Screen reader is now inactive.');
      }
    }

    // Speak message
    function speakMessage(text) {
      if (!readerActive) return;

      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);

        // Set language based on selection
        let langCode = 'en-US';
        switch (currentLang) {
          case 'hi': langCode = 'hi-IN'; break;
          case 'or': langCode = 'or-IN'; break;
          case 'ta': langCode = 'ta-IN'; break;
          case 'te': langCode = 'te-IN'; break;
          case 'ml': langCode = 'ml-IN'; break;
        }

        utterance.lang = langCode;
        speechSynthesis.speak(utterance);
      }
    }

    // Start voice input
    function startVoiceInput() {
      if (!('webkitSpeechRecognition' in window)) {
        addBotMessage('Voice recognition is not supported in your browser.');
        return;
      }

      recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      // Set language based on selection
      let langCode = 'en-US';
      switch (currentLang) {
        case 'hi': langCode = 'hi-IN'; break;
        case 'or': langCode = 'or-IN'; break;
        case 'ta': langCode = 'ta-IN'; break;
        case 'te': langCode = 'te-IN'; break;
        case 'ml': langCode = 'ml-IN'; break;
      }

      recognition.lang = langCode;

      recognition.onstart = function () {
        voiceBtn.classList.add('active');
        addBotMessage('Listening... Please speak now.');
      };

      recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        voiceBtn.classList.remove('active');
      };

      recognition.onerror = function (event) {
        voiceBtn.classList.remove('active');
        addBotMessage('Voice recognition error: ' + event.error);
      };

      recognition.start();
    }

    // Start camera
    function startCamera() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function (stream) {
            cameraStream = stream;
            const video = document.getElementById('camera-feed');
            video.srcObject = stream;
            video.style.display = 'block';
            document.querySelector('#camera-preview i').style.display = 'none';
            document.querySelector('.scan-animation').style.display = 'block';
            video.play();
          })
          .catch(function (error) {
            console.error('Camera error: ', error);
            alert('Unable to access camera: ' + error.message);
          });
      } else {
        alert('Your browser does not support camera access.');
      }
    }

    // Stop camera
    function stopCamera() {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        document.getElementById('camera-feed').style.display = 'none';
        document.querySelector('#camera-preview i').style.display = 'block';
        document.querySelector('.scan-animation').style.display = 'none';
      }
    }

    // Capture image
    function captureImage() {
      const video = document.getElementById('camera-feed');
      const canvas = document.getElementById('camera-canvas');
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to data URL
      const imageData = canvas.toDataURL('image/png');

      // Process the captured image as a document
      processDocumentImage(imageData);

      // Close camera panel
      stopCamera();
      cameraPanel.classList.remove('active');
    }

    // Simulate document upload
    function simulateDocumentUpload() {
      // Randomly select a document type
      const docTypes = ['aadhaar', 'pan', 'voter', 'driving'];
      const docType = docTypes[Math.floor(Math.random() * docTypes.length)];

      // Get the document template
      const document = documentTemplates[docType];

      // Show OCR panel with processing
      togglePanel(ocrPanel);

      // Simulate document processing
      setTimeout(() => {
        displayDocumentPreview(document, docType);
      }, 2000);
    }

    // Show document type selector
    function showDocumentTypeSelector() {
      const panelHTML = `
        <div class="panel-header">
          <div class="panel-title">Select Document Type</div>
          <button class="close-panel">&times;</button>
        </div>
        <div class="document-types">
          <div class="document-type" data-doctype="aadhaar">
            <i class="fas fa-id-card" style="font-size: 36px; margin-bottom: 10px;"></i>
            <div>Aadhaar Card</div>
          </div>
          <div class="document-type" data-doctype="pan">
            <i class="fas fa-credit-card" style="font-size: 36px; margin-bottom: 10px;"></i>
            <div>PAN Card</div>
          </div>
          <div class="document-type" data-doctype="voter">
            <i class="fas fa-vote-yea" style="font-size: 36px; margin-bottom: 10px;"></i>
            <div>Voter ID</div>
          </div>
          <div class="document-type" data-doctype="driving">
            <i class="fas fa-car" style="font-size: 36px; margin-bottom: 10px;"></i>
            <div>Driving License</div>
          </div>
        </div>
      `;

      docTypePanel.innerHTML = panelHTML;
      docTypePanel.classList.add('active');

      // Add event listeners
      docTypePanel.querySelector('.close-panel').addEventListener('click', () => {
        docTypePanel.classList.remove('active');
      });

      docTypePanel.querySelectorAll('.document-type').forEach(type => {
        type.addEventListener('click', () => {
          const docType = type.dataset.doctype;
          docTypePanel.classList.remove('active');
          cameraPanel.classList.add('active');
          startCamera();
        });
      });
    }

    // Process document image
    function processDocumentImage(imageData) {
      // Show OCR panel with processing
      togglePanel(ocrPanel);

      // Randomly select a document type
      const docTypes = ['aadhaar', 'pan', 'voter', 'driving'];
      const docType = docTypes[Math.floor(Math.random() * docTypes.length)];

      // Get the document template
      const document = documentTemplates[docType];

      // Simulate OCR processing delay
      setTimeout(() => {
        displayDocumentPreview(document, docType, imageData);
      }, 2500);
    }

    // Display document preview
    function displayDocumentPreview(document, docType, imageData = null) {
      const ocrPreview = document.getElementById('ocr-preview');
      const ocrProcessing = document.getElementById('ocr-processing');
      const ocrText = document.getElementById('ocr-text');
      const ocrDetails = document.getElementById('ocr-details');
      const ocrSubmitBtn = document.getElementById('ocr-submit-btn');

      // Hide processing and show results
      ocrProcessing.style.display = 'none';
      ocrText.style.display = 'block';
      ocrDetails.style.display = 'block';
      ocrSubmitBtn.style.display = 'block';

      // Create preview image
      if (imageData) {
        ocrPreview.innerHTML = `<img src="${imageData}" alt="${document.name}">`;
      } else {
        // Create a placeholder image
        ocrPreview.innerHTML = `<div style="background:#f1f5f9; height:100%; display:flex; align-items:center; justify-content:center; color:var(--gray);">${document.name} Preview</div>`;
      }

      // Create document details
      let detailsHTML = '';
      for (const [key, value] of Object.entries(document.fields)) {
        detailsHTML += `
          <div class="document-field">
            <span class="document-label">${key}:</span>
            <span class="document-value">${value}</span>
          </div>
        `;
      }
      ocrDetails.innerHTML = detailsHTML;

      // Create extracted text
      let textContent = `Document Type: ${document.name}\n\n`;
      for (const [key, value] of Object.entries(document.fields)) {
        textContent += `${key}: ${value}\n`;
      }
      ocrText.textContent = textContent;
    }

    // Submit document for verification
    function submitDocument() {
      const docName = document.getElementById('ocr-preview').querySelector('img') ?
        "Captured Document" : "Uploaded Document";

      addBotMessage(`Thank you! Your ${docName} has been submitted for verification. It will be processed shortly.`);
      ocrPanel.classList.remove('active');
    }

    // Show folder content
    function showFolderContent(folder) {
      const folderGrid = document.getElementById('folder-grid');
      const folderContent = document.getElementById('folder-content');
      const folderTitle = document.getElementById('current-folder-title');
      const documentList = document.getElementById('folder-document-list');

      // Update UI
      folderGrid.style.display = 'none';
      folderContent.style.display = 'block';

      // Set folder title
      folderTitle.textContent = document.querySelector(`.folder-item[data-folder="${folder}"] .folder-name`).textContent;

      // Clear document list
      documentList.innerHTML = '';

      // Add documents to the list
      folderContents[folder].forEach(doc => {
        const docItem = document.createElement('div');
        docItem.className = 'document-item';
        docItem.innerHTML = `
          <div class="document-icon">
            <i class="fas fa-file"></i>
          </div>
          <div class="document-info">
            <div class="document-title">${doc.name}</div>
            <div class="document-date">Uploaded: ${doc.date}</div>
          </div>
          <button class="service-action-btn">View</button>
        `;
        documentList.appendChild(docItem);
      });
    }

    // Get user location
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const locationText = document.getElementById('location-text');
            const lat = position.coords.latitude.toFixed(4);
            const lon = position.coords.longitude.toFixed(4);
            locationText.textContent = `Approx: ${lat}, ${lon}`;
          },
          error => {
            console.error('Error getting location:', error);
            document.getElementById('location-text').textContent =
              'Location access denied. Please enable location services.';
          }
        );
      } else {
        document.getElementById('location-text').textContent =
          'Geolocation is not supported by this browser.';
      }
    }

    // Find emergency services
    function findEmergencyServices(type) {
      const resultsContainer = document.getElementById('emergency-results');
      resultsContainer.innerHTML = '<div class="service-result-item"><i class="fas fa-spinner fa-spin"></i> Finding nearby services...</div>';

      // Simulate API call
      setTimeout(() => {
        const services = {
          medical: [
            { name: "City General Hospital", distance: "1.2 km", address: "123 Medical St, City Center", phone: "123-456-7890" },
            { name: "Emergency Medical Center", distance: "2.5 km", address: "456 Health Ave, Downtown", phone: "987-654-3210" },
            { name: "24/7 Urgent Care", distance: "0.8 km", address: "789 Care Blvd, Westside", phone: "555-123-4567" }
          ],
          police: [
            { name: "Central Police Station", distance: "0.5 km", address: "101 Safety Rd, City Center", phone: "100" },
            { name: "Highway Patrol Unit", distance: "3.2 km", address: "202 Patrol Ave, Eastside", phone: "112" }
          ],
          fire: [
            { name: "Fire Station #1", distance: "1.8 km", address: "303 Fire Lane, Downtown", phone: "101" },
            { name: "Rescue Squad HQ", distance: "2.7 km", address: "404 Rescue Dr, North District", phone: "102" }
          ],
          women: [
            { name: "Women's Safety Helpline", distance: "", address: "24/7 National Helpline", phone: "1091" },
            { name: "Women Protection Center", distance: "2.1 km", address: "505 Support St, City Center", phone: "1800-123-1234" }
          ]
        };

        resultsContainer.innerHTML = '';

        services[type].forEach(service => {
          const item = document.createElement('div');
          item.className = 'service-result-item';
          item.innerHTML = `
            <div class="result-name">${service.name}</div>
            <div class="result-details">
              <div>${service.address}</div>
              <div>${service.distance ? service.distance + ' away' : ''}</div>
            </div>
            <div class="result-details">
              <div><i class="fas fa-phone"></i> ${service.phone}</div>
              <button class="service-action-btn">Call</button>
              <button class="service-action-btn">Directions</button>
            </div>
          `;
          resultsContainer.appendChild(item);
        });
      }, 1500);
    }

    // Start scheme application
    function startSchemeApplication(scheme) {
      const schemesList = document.getElementById('schemes-list');
      const schemeProgress = document.getElementById('scheme-progress');

      schemesList.style.display = 'none';
      schemeProgress.style.display = 'block';

      const progressSteps = document.getElementById('progress-steps');
      progressSteps.innerHTML = '';

      const steps = [
        { title: "Eligibility Check", desc: "Verifying your eligibility for this scheme" },
        { title: "Document Collection", desc: "Upload required documents" },
        { title: "Application Form", desc: "Fill out the application form" },
        { title: "Verification", desc: "Your application is being verified" },
        { title: "Approval", desc: "Application approved" }
      ];

      steps.forEach((step, index) => {
        const stepEl = document.createElement('div');
        stepEl.className = 'progress-step';
        stepEl.innerHTML = `
          <div class="step-icon">${index + 1}</div>
          <div class="step-content">
            <div class="step-title">${step.title}</div>
            <div class="step-desc">${step.desc}</div>
          </div>
        `;
        progressSteps.appendChild(stepEl);

        // Simulate progress
        setTimeout(() => {
          stepEl.classList.add('step-active');
          speakMessage(`Starting step ${index + 1}: ${step.title}`);

          if (index === 0) {
            setTimeout(() => {
              stepEl.classList.remove('step-active');
              stepEl.classList.add('step-complete');
              stepEl.querySelector('.step-icon').innerHTML = '<i class="fas fa-check"></i>';
              speakMessage(`Completed step ${index + 1}: ${step.title}`);
            }, 2000);
          }
        }, index * 1500);
      });

      // Show completion message
      setTimeout(() => {
        addBotMessage(`Your application for the scheme has been submitted successfully! Your application ID is APP-${Math.floor(100000 + Math.random() * 900000)}.`);
        schemesPanel.classList.remove('active');
        schemesList.style.display = 'block';
        schemeProgress.style.display = 'none';
      }, 8000);
    }

    // Submit grievance
    function submitGrievance() {
      const name = document.getElementById('grievance-name').value;
      const phone = document.getElementById('grievance-phone').value;
      const dept = document.getElementById('grievance-dept').value;
      const details = document.getElementById('grievance-details').value;

      if (!name || !phone || !details) {
        alert('Please fill in all required fields');
        return;
      }

      // Generate unique grievance ID
      const grievanceId = 'GRV-' + Math.floor(100000 + Math.random() * 900000);

      // Show success message with ID
      const idCard = document.createElement('div');
      idCard.className = 'grievance-id-card';
      idCard.innerHTML = `
        <i class="fas fa-check-circle" style="font-size: 36px;"></i>
        <h3>Grievance Registered Successfully</h3>
        <p>Your grievance reference number:</p>
        <div class="id-number">${grievanceId}</div>
        <p>Please note this ID for future reference</p>
        <button class="service-action-btn" id="download-grievance-btn" style="margin-top: 15px;">
          <i class="fas fa-download"></i> Download Receipt
        </button>
      `;

      grievancePanel.innerHTML = '';
      grievancePanel.appendChild(idCard);

      // Add event listener for download button
      document.getElementById('download-grievance-btn').addEventListener('click', () => {
        generateGrievancePDF(name, phone, dept, details, grievanceId);
      });

      // Add to chat
      addBotMessage(`Your grievance has been registered with ID: ${grievanceId}. You can track status using this ID.`);
    }

    // Generate grievance PDF
    function generateGrievancePDF(name, phone, dept, details, id) {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      // Add content to PDF
      doc.setFontSize(20);
      doc.text("Grievance Receipt", 105, 20, null, null, 'center');

      doc.setFontSize(12);
      doc.text(`Grievance ID: ${id}`, 20, 40);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 50);

      doc.line(20, 55, 190, 55);

      doc.text(`Name: ${name}`, 20, 65);
      doc.text(`Phone: ${phone}`, 20, 75);
      doc.text(`Department: ${dept}`, 20, 85);

      doc.text("Grievance Details:", 20, 100);
      doc.text(details, 20, 110, { maxWidth: 170 });

      doc.line(20, 250, 190, 250);
      doc.text("Note: This is an official receipt for your grievance submission.", 105, 260, null, null, 'center');
      doc.text("Keep this reference number for future communication.", 105, 267, null, null, 'center');

      // Save the PDF
      doc.save(`grievance_${id}.pdf`);

      alert('PDF downloaded successfully!');
    }

    // Download chat history
    function downloadChatHistory() {
      const chatText = Array.from(chatBox.children).map(child => {
        const who = child.classList.contains('user-message') ? 'You' : 'GovSeva Assistant';
        const time = child.querySelector('.message-time')?.textContent || '';
        const message = child.querySelector('p')?.textContent || '';
        return `${time} - ${who}: ${message}`;
      }).join('\n\n');

      const blob = new Blob([chatText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'govseva-chat-history.txt';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 0);
    }

    // Clear chat history
    function clearChatHistory() {
      if (confirm('Are you sure you want to clear the chat history?')) {
        chatBox.innerHTML = '';
        addBotMessage('Welcome back! How can I assist you today?');
        localStorage.removeItem('chatHistory');
      }
    }

    // Save chat to local storage
    function saveChatToLocalStorage() {
      const chatMessages = [];
      chatBox.querySelectorAll('.message').forEach(message => {
        const isUser = message.classList.contains('user-message');
        const content = message.querySelector('p').textContent;
        const time = message.querySelector('.message-time').textContent;
        chatMessages.push({ isUser, content, time });
      });
      localStorage.setItem('chatHistory', JSON.stringify(chatMessages));
    }

    // Load chat from local storage
    function loadChatHistory() {
      const savedChat = localStorage.getItem('chatHistory');
      if (savedChat) {
        const messages = JSON.parse(savedChat);
        messages.forEach(msg => {
          if (msg.isUser) {
            addUserMessage(msg.content, msg.time);
          } else {
            addBotMessage(msg.content, msg.time);
          }
        });
      }
    }

    // Send message
    async function sendMessage(e) {
      e.preventDefault();

      const message = userInput.value.trim();
      if (!message) return;

      addUserMessage(message);
      userInput.value = '';

      try {
        // Simulate AI response
        const response = await getAIResponse(message);

        // Display response
        addBotMessage(response);
      } catch (error) {
        console.error('Error getting response:', error);
        addBotMessage("I'm having trouble connecting to the service. Please try again later.");
      }
    }

    // Simulate AI response
    function getAIResponse(message) {
      return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
          // Context-based responses
          let response = "Thank you for your message. I'm here to help with government services.";

          // Department-specific responses
          if (currentDept === 'health') {
            const healthResponses = [
              "For health services, you can apply for Ayushman Bharat scheme, find nearby hospitals, or book teleconsultations.",
              "I can help you find nearby hospitals, schedule appointments, or provide information on health schemes.",
              "Health services include Ayushman Bharat, PMJAY, and other government health initiatives."
            ];
            response = healthResponses[Math.floor(Math.random() * healthResponses.length)];
          }
          else if (currentDept === 'agriculture') {
            const agriResponses = [
              "Agricultural services include subsidy information, weather alerts, market prices, and farmer support programs.",
              "I can provide information on PM Kisan Samman Nidhi, crop insurance, and agricultural subsidies.",
              "For agriculture-related queries, I can help with schemes, subsidies, and market information."
            ];
            response = agriResponses[Math.floor(Math.random() * agriResponses.length)];
          }
          else if (currentDept === 'finance') {
            const financeResponses = [
              "Financial services include tax filing, scheme applications, pension information, and banking services.",
              "I can assist with income tax filing, GST registration, and financial scheme applications.",
              "For finance-related queries, I can help with banking services, tax information, and government schemes."
            ];
            response = financeResponses[Math.floor(Math.random() * financeResponses.length)];
          }
          else if (currentDept === 'education') {
            const eduResponses = [
              "Education services include scholarship applications, exam results, school information, and online courses.",
              "I can help with scholarship applications, exam results, and information on educational institutions.",
              "For education-related queries, I can assist with scholarships, admissions, and educational resources."
            ];
            response = eduResponses[Math.floor(Math.random() * eduResponses.length)];
          }

          // Resolve with the response
          resolve(response);
        }, 1000);
      });
    }

    // Add user message
    function addUserMessage(text, timeString = null) {
      const now = new Date();
      timeString = timeString || now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const messageDiv = document.createElement('div');
      messageDiv.className = 'message user-message';
      messageDiv.innerHTML = `
        <div class="message-header">
          <i class="fas fa-user"></i>
          <span>You</span>
        </div>
        <p>${text}</p>
        <div class="message-time">${timeString}</div>
        <div class="message-actions">
          <button class="msg-action-btn"><i class="fas fa-volume-up"></i></button>
          <button class="msg-action-btn"><i class="fas fa-copy"></i></button>
        </div>
      `;

      chatBox.appendChild(messageDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
      speakMessage(text);

      // Save to local storage
      saveChatToLocalStorage();
    }

    // Add bot message
    function addBotMessage(text, additionalHTML = '') {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const messageDiv = document.createElement('div');
      messageDiv.className = 'message bot-message';
      messageDiv.innerHTML = `
        <div class="message-header">
          <i class="fas fa-robot"></i>
          <span>GovSeva Assistant</span>
        </div>
        <p>${text}</p>
        ${additionalHTML}
        <div class="message-time">${timeString}</div>
        <div class="message-actions">
          <button class="msg-action-btn"><i class="fas fa-volume-up"></i></button>
          <button class="msg-action-btn"><i class="fas fa-copy"></i></button>
          <button class="msg-action-btn"><i class="fas fa-download"></i></button>
        </div>
      `;

      chatBox.appendChild(messageDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
      speakMessage(text);

      // Save to local storage
      saveChatToLocalStorage();
    }

    // Handle department action
    function handleDepartmentAction(actionId) {
      switch (actionId) {
        // Health Department Actions
        case 'apply_scheme':
          showHealthSchemeForm();
          break;
        case 'find_hospital':
          findNearbyHospitals();
          break;
        case 'book_appointment':
          showAppointmentForm();
          break;
        case 'emergency_services':
          togglePanel(emergencyPanel);
          break;
        case 'health_records':
          accessHealthRecords();
          break;

        // Agriculture Department Actions
        case 'apply_loan':
          showAgricultureLoanForm();
          break;
        case 'crop_prices':
          showCropPrices();
          break;
        case 'weather_forecast':
          showWeatherForecast();
          break;
        case 'subsidy_info':
          showSubsidyInformation();
          break;
        case 'mandi_prices':
          showMandiPrices();
          break;

        // Finance Department Actions
        case 'personal_loan':
          showPersonalLoanCalculator();
          break;
        case 'tax_assistance':
          showTaxAssistance();
          break;
        case 'pension_services':
          showPensionServices();
          break;
        case 'investment_schemes':
          showInvestmentSchemes();
          break;
        case 'banking_services':
          showBankingServices();
          break;

        // Education Department Actions
        case 'scholarship':
          showScholarshipForm();
          break;
        case 'admission':
          showAdmissionAssistance();
          break;
        case 'exam_results':
          showExamResults();
          break;
        case 'online_courses':
          showOnlineCourses();
          break;
        case 'certificate':
          downloadCertificate();
          break;
      }
    }

    // Show health scheme form
    function showHealthSchemeForm() {
      const formHTML = `
        <div class="form-container">
          <h3>Apply for Ayushman Bharat Health Scheme</h3>
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-input" id="health-name">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Age</label>
              <input type="number" class="form-input" id="health-age">
            </div>
            <div class="form-group">
              <label class="form-label">Gender</label>
              <select class="form-input" id="health-gender">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Address</label>
            <textarea class="form-input" id="health-address" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Annual Income (₹)</label>
            <input type="number" class="form-input" id="health-income">
          </div>
          <div class="form-group">
            <label class="form-label">Family Members</label>
            <input type="number" class="form-input" id="health-family" value="1">
          </div>
          <button class="form-submit-btn" data-form="health">Submit Application</button>
        </div>
      `;

      addBotMessage('Please fill the form to apply for the Ayushman Bharat Health Scheme:', formHTML);
    }

    // Show agriculture loan form
    function showAgricultureLoanForm() {
      const formHTML = `
        <div class="form-container">
          <h3>Apply for Kisan Credit Card</h3>
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-input" id="agri-name">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Land Size (acres)</label>
              <input type="number" class="form-input" id="agri-land">
            </div>
            <div class="form-group">
              <label class="form-label">Crop Type</label>
              <select class="form-input" id="agri-crop">
                <option>Wheat</option>
                <option>Rice</option>
                <option>Sugarcane</option>
                <option>Cotton</option>
                <option>Vegetables</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Loan Amount (₹)</label>
              <input type="number" class="form-input" id="agri-amount">
            </div>
            <div class="form-group">
              <label class="form-label">Loan Duration (years)</label>
              <input type="number" class="form-input" id="agri-duration" min="1" max="10" value="5">
            </div>
          </div>
          <div class="calculator-container">
            <h4>Loan Calculator</h4>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Loan Amount (₹)</label>
                <input type="number" class="form-input" id="loan-amount" value="50000">
              </div>
              <div class="form-group">
                <label class="form-label">Interest Rate (%)</label>
                <input type="number" class="form-input" id="interest-rate" value="4" step="0.1">
              </div>
              <div class="form-group">
                <label class="form-label">Duration (years)</label>
                <input type="number" class="form-input" id="loan-duration" value="5" min="1" max="15">
              </div>
            </div>
            <button class="service-action-btn" id="calculate-btn">Calculate EMI</button>
            <div class="calculator-result">
              Estimated Monthly EMI: <span class="calculator-value" id="emi-result">₹0</span>
            </div>
          </div>
          <button class="form-submit-btn" data-form="agri">Submit Application</button>
        </div>
      `;

      addBotMessage('Apply for the Kisan Credit Card to get financial support for your farming needs:', formHTML);

      // Add calculator functionality
      document.getElementById('calculate-btn').addEventListener('click', calculateEMI);
    }

    // Calculate EMI
    function calculateEMI() {
      const amount = parseFloat(document.getElementById('loan-amount').value) || 50000;
      const rate = parseFloat(document.getElementById('interest-rate').value) || 4;
      const duration = parseFloat(document.getElementById('loan-duration').value) || 5;

      const monthlyRate = rate / 1200; // Monthly interest rate
      const months = duration * 12;

      const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

      document.getElementById('emi-result').textContent = `₹${emi.toFixed(2)}`;
    }

    // Show scholarship form
    function showScholarshipForm() {
      const formHTML = `
        <div class="form-container">
          <h3>National Scholarship Application</h3>
          <div class="form-group">
            <label class="form-label">Student Name</label>
            <input type="text" class="form-input" id="edu-name">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Date of Birth</label>
              <input type="date" class="form-input" id="edu-dob">
            </div>
            <div class="form-group">
              <label class="form-label">Gender</label>
              <select class="form-input" id="edu-gender">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Educational Institution</label>
            <input type="text" class="form-input" id="edu-institution">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Course/Program</label>
              <input type="text" class="form-input" id="edu-course">
            </div>
            <div class="form-group">
              <label class="form-label">Academic Year</label>
              <input type="text" class="form-input" id="edu-year" value="2024-2025">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Annual Family Income (₹)</label>
            <input type="number" class="form-input" id="edu-income">
          </div>
          <div class="form-group">
            <label class="form-label">Bank Account Details</label>
            <input type="text" class="form-input" id="edu-bank" placeholder="Account Number, IFSC Code">
          </div>
          <button class="form-submit-btn" data-form="edu">Submit Application</button>
        </div>
      `;

      addBotMessage('Apply for the National Scholarship to support your education:', formHTML);
    }

    // Handle form submission
    function handleFormSubmission(e) {
      e.preventDefault();
      const formType = e.target.dataset.form;
      let applicationId = '';

      switch (formType) {
        case 'health':
          applicationId = `HLTH-${Math.floor(100000 + Math.random() * 900000)}`;
          addBotMessage(`Your health scheme application has been submitted successfully! Your Application ID is: <strong>${applicationId}</strong>. We will notify you once it's processed.`);
          showApplicationCard('Ayushman Bharat Health Scheme', applicationId, 'pending');
          break;

        case 'agri':
          applicationId = `AGRI-${Math.floor(100000 + Math.random() * 900000)}`;
          addBotMessage(`Your agriculture loan application has been submitted successfully! Your Application ID is: <strong>${applicationId}</strong>. Our representative will contact you within 2 working days.`);
          showApplicationCard('Kisan Credit Card', applicationId, 'pending');
          break;

        case 'edu':
          applicationId = `EDU-${Math.floor(100000 + Math.random() * 900000)}`;
          addBotMessage(`Your scholarship application has been submitted successfully! Your Application ID is: <strong>${applicationId}</strong>. You can track the status in the "My Applications" section.`);
          showApplicationCard('National Scholarship', applicationId, 'pending');
          break;
      }
    }

    // Show application card
    function showApplicationCard(title, id, status) {
      const statusText = status === 'pending' ? 'Pending' : status === 'approved' ? 'Approved' : 'Rejected';
      const statusClass = status === 'pending' ? 'status-pending' : status === 'approved' ? 'status-approved' : 'status-rejected';

      const cardHTML = `
        <div class="application-card">
          <div class="application-title">
            <i class="fas fa-file-alt"></i> ${title}
            <span class="application-status ${statusClass}">${statusText}</span>
          </div>
          <div class="scheme-details">
            Application ID: <strong>${id}</strong>
          </div>
          <div class="scheme-eligibility">
            <i class="fas fa-clock"></i> Submitted: ${new Date().toLocaleDateString()}
          </div>
          <div class="service-actions" style="margin-top: 10px;">
            <button class="service-action-btn">Track Status</button>
            <button class="service-action-btn">Download Receipt</button>
          </div>
        </div>
      `;

      addBotMessage('Your application has been received:', cardHTML);
    }

    // Find nearby hospitals
    function findNearbyHospitals() {
      addBotMessage('Finding nearby hospitals...');

      // Simulate API call
      setTimeout(() => {
        const hospitals = [
          { name: "City General Hospital", distance: "1.2 km", rating: "4.5", specialties: "General, Emergency" },
          { name: "Apex Medical Center", distance: "2.5 km", rating: "4.7", specialties: "Cardiology, Orthopedics" },
          { name: "Community Health Clinic", distance: "0.8 km", rating: "4.2", specialties: "Primary Care, Pediatrics" }
        ];

        let hospitalsHTML = '<div class="service-results">';

        hospitals.forEach(hospital => {
          hospitalsHTML += `
            <div class="service-result-item">
              <div class="result-name">${hospital.name}</div>
              <div class="result-details">
                <div><i class="fas fa-map-marker-alt"></i> ${hospital.distance} away</div>
                <div><i class="fas fa-star"></i> ${hospital.rating}/5</div>
              </div>
              <div class="result-details">
                <div>${hospital.specialties}</div>
                <button class="service-action-btn">Directions</button>
                <button class="service-action-btn">Book Appointment</button>
              </div>
            </div>
          `;
        });

        hospitalsHTML += '</div>';

        addBotMessage('Here are hospitals near your location:', hospitalsHTML);
      }, 1500);
    }

    // Show appointment form
    function showAppointmentForm() {
      const formHTML = `
        <div class="form-container">
          <h3>Book Doctor Appointment</h3>
          <div class="form-group">
            <label class="form-label">Specialty</label>
            <select class="form-input" id="appt-specialty">
              <option>General Physician</option>
              <option>Cardiologist</option>
              <option>Dermatologist</option>
              <option>Orthopedist</option>
              <option>Pediatrician</option>
              <option>Gynecologist</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Preferred Date</label>
            <input type="date" class="form-input" id="appt-date">
          </div>
          <div class="form-group">
            <label class="form-label">Preferred Time</label>
            <select class="form-input" id="appt-time">
              <option>Morning (9 AM - 12 PM)</option>
              <option>Afternoon (1 PM - 4 PM)</option>
              <option>Evening (5 PM - 8 PM)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-input" id="appt-name">
          </div>
          <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input type="tel" class="form-input" id="appt-phone">
          </div>
          <div class="form-group">
            <label class="form-label">Reason for Visit</label>
            <textarea class="form-input" id="appt-reason" rows="3"></textarea>
          </div>
          <button class="form-submit-btn" data-form="appt">Book Appointment</button>
        </div>
      `;

      addBotMessage('Please fill the form to book your doctor appointment:', formHTML);
    }

    // Access health records
    function accessHealthRecords() {
      addBotMessage('Retrieving your health records...');

      // Simulate loading
      setTimeout(() => {
        const records = [
          { date: "2024-06-15", doctor: "Dr. Sharma", diagnosis: "Routine Checkup", report: "Download" },
          { date: "2024-05-10", doctor: "Dr. Patel", diagnosis: "Blood Test Results", report: "Download" },
          { date: "2024-04-22", doctor: "Dr. Kumar", diagnosis: "Vaccination Record", report: "Download" }
        ];

        let recordsHTML = '<div class="document-list">';

        records.forEach(record => {
          recordsHTML += `
            <div class="document-item">
              <div class="document-icon" style="background: var(--health);">
                <i class="fas fa-file-medical"></i>
              </div>
              <div class="document-info">
                <div class="document-title">${record.diagnosis}</div>
                <div class="document-details">
                  <div>${record.date}</div>
                  <div>${record.doctor}</div>
                </div>
              </div>
              <button class="service-action-btn">${record.report}</button>
            </div>
          `;
        });

        recordsHTML += '</div>';

        addBotMessage('Your health records:', recordsHTML);
      }, 2000);
    }

    // Show crop prices
    function showCropPrices() {
      addBotMessage('Fetching current crop prices...');

      // Simulate API call
      setTimeout(() => {
        const crops = [
          { name: "Wheat", price: "₹2,100/quintal", change: "+2.5%" },
          { name: "Rice", price: "₹3,200/quintal", change: "+1.2%" },
          { name: "Cotton", price: "₹6,500/quintal", change: "-0.8%" },
          { name: "Sugarcane", price: "₹310/quintal", change: "0.0%" },
          { name: "Potato", price: "₹1,100/quintal", change: "+5.3%" }
        ];

        let cropsHTML = '<div class="service-results">';

        crops.forEach(crop => {
          const changeClass = crop.change.startsWith('+') ? 'color: green;' :
            crop.change.startsWith('-') ? 'color: red;' : '';

          cropsHTML += `
            <div class="service-result-item">
              <div class="result-name">${crop.name}</div>
              <div class="result-details">
                <div>Price: <strong>${crop.price}</strong></div>
                <div style="${changeClass}">${crop.change}</div>
              </div>
            </div>
          `;
        });

        cropsHTML += '</div>';

        addBotMessage('Current market prices for major crops:', cropsHTML);
      }, 1500);
    }

    // Show weather forecast
    function showWeatherForecast() {
      addBotMessage('Fetching weather forecast for your area...');

      // Simulate API call
      setTimeout(() => {
        const forecast = [
          { day: "Today", temp: "32°C", condition: "Partly Cloudy", rain: "10%" },
          { day: "Tomorrow", temp: "34°C", condition: "Sunny", rain: "0%" },
          { day: "Day 3", temp: "33°C", condition: "Partly Cloudy", rain: "20%" },
          { day: "Day 4", temp: "31°C", condition: "Light Rain", rain: "60%" },
          { day: "Day 5", temp: "29°C", condition: "Rainy", rain: "80%" }
        ];

        let forecastHTML = '<div class="service-results">';

        forecast.forEach(day => {
          forecastHTML += `
            <div class="service-result-item">
              <div class="result-name">${day.day}</div>
              <div class="result-details">
                <div><i class="fas fa-temperature-high"></i> ${day.temp}</div>
                <div>${day.condition}</div>
                <div><i class="fas fa-cloud-rain"></i> ${day.rain}</div>
              </div>
            </div>
          `;
        });

        forecastHTML += '</div>';

        addBotMessage('5-day weather forecast for your location:', forecastHTML);
      }, 1500);
    }

    // Show personal loan calculator
    function showPersonalLoanCalculator() {
      const calculatorHTML = `
        <div class="calculator-container">
          <h3>Personal Loan Calculator</h3>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Loan Amount (₹)</label>
              <input type="number" class="form-input" id="personal-amount" value="100000">
            </div>
            <div class="form-group">
              <label class="form-label">Interest Rate (%)</label>
              <input type="number" class="form-input" id="personal-rate" value="10.5" step="0.1">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Loan Duration (months)</label>
              <input type="number" class="form-input" id="personal-months" value="36" min="6" max="60">
            </div>
            <div class="form-group">
              <label class="form-label">Processing Fee (%)</label>
              <input type="number" class="form-input" id="personal-fee" value="1.5" step="0.1">
            </div>
          </div>
          <button class="service-action-btn" id="personal-calculate">Calculate</button>
          <div class="calculator-result">
            Monthly EMI: <span class="calculator-value" id="personal-emi">₹0</span>
          </div>
          <div class="calculator-result">
            Total Interest: <span class="calculator-value" id="personal-interest">₹0</span>
          </div>
          <div class="calculator-result">
            Processing Fee: <span class="calculator-value" id="personal-fee-amount">₹0</span>
          </div>
          <div class="service-actions" style="margin-top: 15px;">
            <button class="service-action-btn">Apply Now</button>
            <button class="service-action-btn">Check Eligibility</button>
          </div>
        </div>
      `;

      addBotMessage('Calculate your personal loan details:', calculatorHTML);

      // Add calculator functionality
      document.getElementById('personal-calculate').addEventListener('click', calculatePersonalLoan);
    }

    // Calculate personal loan
    function calculatePersonalLoan() {
      const amount = parseFloat(document.getElementById('personal-amount').value) || 100000;
      const rate = parseFloat(document.getElementById('personal-rate').value) || 10.5;
      const months = parseFloat(document.getElementById('personal-months').value) || 36;
      const feePercent = parseFloat(document.getElementById('personal-fee').value) || 1.5;

      const monthlyRate = rate / 1200; // Monthly interest rate
      const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

      const totalPayment = emi * months;
      const totalInterest = totalPayment - amount;
      const feeAmount = amount * (feePercent / 100);

      document.getElementById('personal-emi').textContent = `₹${emi.toFixed(2)}`;
      document.getElementById('personal-interest').textContent = `₹${totalInterest.toFixed(2)}`;
      document.getElementById('personal-fee-amount').textContent = `₹${feeAmount.toFixed(2)}`;
    }

    // Show tax assistance
    function showTaxAssistance() {
      const taxHTML = `
        <div class="service-card">
          <div class="service-title">Income Tax Filing Assistance</div>
          <div class="service-desc">Get help with filing your income tax returns</div>
          <div class="dept-actions">
            <button class="dept-action-btn" data-action="file_it">
              <i class="fas fa-file-import"></i> File IT Return
            </button>
            <button class="dept-action-btn" data-action="verify_it">
              <i class="fas fa-check-circle"></i> Verify IT Return
            </button>
            <button class="dept-action-btn" data-action="track_refund">
              <i class="fas fa-search-dollar"></i> Track Refund
            </button>
          </div>
        </div>
        <div class="scheme-card">
          <div class="scheme-title">
            <i class="fas fa-info-circle"></i>
            <span>Important Tax Dates</span>
          </div>
          <div class="scheme-details">
            <div>• Advance Tax Due: June 15, 2024</div>
            <div>• ITR Filing Deadline: July 31, 2024</div>
            <div>• Revised Return Deadline: Dec 31, 2024</div>
          </div>
        </div>
      `;

      addBotMessage('How can I assist you with tax filing?', taxHTML);
    }

    // Initialize the app
    window.onload = init;

    const flashStyle = document.createElement('style');
    flashStyle.textContent = `
  @keyframes flash {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
`;
    document.head.appendChild(flashStyle);

    // // Dummy functions for unimplemented features
    // function showSubsidyInformation() {
    //   addBotMessage('Subsidy information is currently being prepared. Please check back later.');
    // }

    // function showMandiPrices() {
    //   addBotMessage('Mandi prices are currently being updated. Please check back in a few minutes.');
    // }

    // function showPensionServices() {
    //   addBotMessage('Pension services portal is under maintenance. Please try again later.');
    // }

    // function showInvestmentSchemes() {
    //   addBotMessage('Investment schemes information is being updated. Please check back soon.');
    // }

    // function showBankingServices() {
    //   addBotMessage('Banking services portal is currently unavailable. Please try again later.');
    // }

    // function showAdmissionAssistance() {
    //   addBotMessage('Admission assistance services will be available soon. Thank you for your patience.');
    // }

    // function showExamResults() {
    //   addBotMessage('Exam results are not available at this time. Please check with your educational institution.');
    // }

    // function showOnlineCourses() {
    //   addBotMessage('Online courses portal is being upgraded. Please check back later.');
    // }

    // function downloadCertificate() {
    //   addBotMessage('Certificate download feature is currently unavailable. Please try again later.');
    // }
    function sendMessage(e) {
      e.preventDefault();

      const message = userInput.value.trim();
      if (!message) return;

      addUserMessage(message);
      userInput.value = '';

      // Send to Ollama via your backend
      sendToOllama(message);
    }

    // Send message to Ollama backend
    async function sendToOllama(message) {
      try {
        const res = await fetch('/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        });

        const data = await res.json();
        addBotMessage(data.reply);
        speakMessage(data.reply);
      } catch (err) {
        addBotMessage('Failed to get response from bot.');
        console.error('Error:', err);
      }
    }