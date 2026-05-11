document.addEventListener('DOMContentLoaded', () => {
    const messagesDiv = document.getElementById('messages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const typingIndicator = document.getElementById('typing-indicator');
    const languageSelect = document.getElementById('languageSelect');
    const stateSelect = document.getElementById('stateSelect');
    const ticketPrice = 250;
    let bookingStep = 0;
    let selectedTickets = 1;
    let selectedLanguage = 'en';
    let selectedState = '';/ To store the user's selected state /


    const translations = {
        en: {
            greeting: 'Hello! Welcome to the Museum Ticket Booking System. Please select your state from the dropdown.',
            askTickets: 'How many tickets would you like to purchase? (Enter a number between 1 and 100)',
            invalidTickets: 'Please enter a valid number of tickets between 1 and 100.',
            selectedTickets: 'You selected {tickets} tickets. The total cost is ₹{totalCost}. Would you like to confirm your booking? (yes/no)',
            confirmBooking: 'Please respond with "yes" or "no" to confirm your booking.',
            bookingCanceled: 'Booking canceled. If you would like to start again, please enter the number of tickets you want to book.',
            paymentOptions: 'Please choose your payment method for ₹{totalCost}:',
            paymentSuccess: 'Payment Successful using {method}. Thank you!',
            selectState: 'You have selected {state}. Now, how many tickets would you like to purchase? (Enter a number between 1 and 100)',
        },
        hi: {
            greeting: 'नमस्ते! संग्रहालय टिकट बुकिंग प्रणाली में आपका स्वागत है। कृपया ड्रॉपडाउन से अपना राज्य चुनें।',
            askTickets: 'आप कितने टिकट खरीदना चाहेंगे? (1 से 100 के बीच कोई संख्या दर्ज करें)',
            invalidTickets: 'कृपया 1 से 100 के बीच वैध संख्या दर्ज करें।',
            selectedTickets: 'आपने {tickets} टिकट चुने। कुल लागत ₹{totalCost} है। क्या आप अपनी बुकिंग की पुष्टि करना चाहेंगे? (हाँ/नहीं)',
            confirmBooking: 'कृपया अपनी बुकिंग की पुष्टि करने के लिए "हाँ" या "नहीं" का उत्तर दें।',
            bookingCanceled: 'बुकिंग रद्द कर दी गई है। यदि आप फिर से आरंभ करना चाहते हैं, तो कृपया टिकटों की संख्या दर्ज करें जो आप बुक करना चाहते हैं।',
            paymentOptions: 'कृपया ₹{totalCost} के लिए अपना भुगतान विधि चुनें:',
            paymentSuccess: '{method} का उपयोग करके भुगतान सफल रहा। धन्यवाद!',
            selectState: 'आपने {state} चुना है। अब, आप कितने टिकट खरीदना चाहेंगे? (1 से 100 के बीच कोई संख्या दर्ज करें)',
        },
        bn: {
            greeting: 'নমস্কার! জাদুঘর টিকিট বুকিং সিস্টেমে আপনাকে স্বাগত জানাই। অনুগ্রহ করে ড্রপডাউন থেকে আপনার রাজ্য নির্বাচন করুন।',
            askTickets: 'আপনি কতটি টিকিট কিনতে চান? (1 থেকে 100 এর মধ্যে একটি সংখ্যা প্রবেশ করুন)',
            invalidTickets: 'দয়া করে 1 থেকে 100 এর মধ্যে একটি বৈধ সংখ্যা প্রবেশ করুন।',
            selectedTickets: 'আপনি {tickets} টিকিট নির্বাচন করেছেন। মোট খরচ ₹{totalCost}। আপনি কি আপনার বুকিং নিশ্চিত করতে চান? (হ্যাঁ/না)',
            confirmBooking: 'আপনার বুকিং নিশ্চিত করতে "হ্যাঁ" বা "না" দিয়ে উত্তর দিন।',
            bookingCanceled: 'বুকিং বাতিল হয়েছে। আপনি যদি আবার শুরু করতে চান তবে অনুগ্রহ করে টিকিটের সংখ্যা প্রবেশ করুন যা আপনি বুক করতে চান।',
            paymentOptions: '₹{totalCost} এর জন্য আপনার পেমেন্ট পদ্ধতি নির্বাচন করুন:',
            paymentSuccess: '{method} ব্যবহার করে পেমেন্ট সফল হয়েছে। ধন্যবাদ!',
            selectState: 'আপনি {state} নির্বাচন করেছেন। এখন, আপনি কতটি টিকিট কিনতে চান? (1 থেকে 100 এর মধ্যে একটি সংখ্যা প্রবেশ করুন)',
        },
       
    };

    
    setTimeout(() => displayMessage('bot', getTranslation('greeting')), 500);

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    languageSelect.addEventListener('change', (e) => {
        selectedLanguage = e.target.value;
        displayMessage('bot', getTranslation('greeting')); // Display greeting in the selected language
    });

    stateSelect.addEventListener('change', (e) => {
        selectedState = e.target.value;
        displayMessage('bot', getTranslation('selectState').replace('{state}', selectedState));
        bookingStep = 0;
    });

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            displayMessage('user', userMessage);
            processMessage(userMessage);
            userInput.value = ''; 
        }
    }

    function displayMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageDiv.innerHTML = message;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function showTypingIndicator() {
        typingIndicator.classList.remove('hidden');
        setTimeout(() => {
            typingIndicator.classList.add('hidden');
        }, 1500); 
    }

    function processMessage(message) {
        showTypingIndicator();
        setTimeout(() => {
            if (bookingStep === 0) {
                const numberOfTickets = parseInt(message, 10);
                if (isNaN(numberOfTickets) || numberOfTickets < 1 || numberOfTickets > 100) {
                    displayMessage('bot', getTranslation('invalidTickets'));
                } else {
                    selectedTickets = numberOfTickets;
                    const totalCost = selectedTickets * ticketPrice;
                    displayMessage('bot', getTranslation('selectedTickets').replace('{tickets}', selectedTickets).replace('{totalCost}', totalCost));
                    bookingStep = 1;
                }
            } else if (bookingStep === 1) {
                const response = message.toLowerCase();
                if (response === 'yes' || response === 'हाँ' || response === 'হ্যাঁ') { // Handling yes in English, Hindi, and Bengali
                    displayMessage('bot', getTranslation('paymentOptions').replace('{totalCost}', selectedTickets * ticketPrice));
                    showPaymentOptions();
                    bookingStep = 2;
                } else if (response === 'no' || response === 'नहीं' || response === 'না') { // Handling no in English, Hindi, and Bengali
                    displayMessage('bot', getTranslation('bookingCanceled'));
                    bookingStep = 0; // Reset the step for a new booking session
                } else {
                    displayMessage('bot', getTranslation('confirmBooking'));
                }
            }
        }, 1500); // Simulate processing delay
    }

    function showPaymentOptions() {
        const paymentOptions = `
            <div class="payment-options">
                <button onclick="processPayment('UPI')">UPI</button>
                <button onclick="processPayment('Debit Card')">Debit Card</button>
                <button onclick="processPayment('Credit Card')">Credit Card</button>
                <button onclick="processPayment('Others')">Others</button>
            </div>
        `;
        displayMessage('bot', paymentOptions);
    }

    window.processPayment = function(method) {
        showTypingIndicator();
        setTimeout(() => {
            displayMessage('bot', getTranslation('paymentSuccess').replace('{method}', method));
            bookingStep = 0; 
        }, 1500); 
    }

    function getTranslation(key) {
        return translations[selectedLanguage][key];
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const messagesDiv = document.getElementById('messages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const typingIndicator = document.getElementById('typing-indicator');
    const languageSelect = document.getElementById('languageSelect');
    const stateSelect = document.getElementById('stateSelect');
    const ticketPrice = 250;
    let bookingStep = 0;
    let selectedTickets = 1;
    let selectedLanguage = 'en'; 
    let selectedState = ''; 

    const translations = {
        en: {
            greeting: 'Hello! Welcome to the Museum Ticket Booking System. Please select your state from the dropdown.',
            askTickets: 'How many tickets would you like to purchase? (Enter a number between 1 and 100)',
            invalidTickets: 'Please enter a valid number of tickets between 1 and 100.',
            selectedTickets: 'You selected {tickets} tickets. The total cost is ₹{totalCost}. Would you like to confirm your booking? (yes/no)',
            confirmBooking: 'Please respond with "yes" or "no" to confirm your booking.',
            bookingCanceled: 'Booking canceled. If you would like to start again, please enter the number of tickets you want to book.',
            paymentOptions: 'Please choose your payment method for ₹{totalCost}:',
            paymentSuccess: 'Payment Successful using {method}. Thank you!',
            selectState: 'You have selected {state}. Now, how many tickets would you like to purchase? (Enter a number between 1 and 100)',
        },
        hi: {
            greeting: 'नमस्ते! संग्रहालय टिकट बुकिंग प्रणाली में आपका स्वागत है। कृपया ड्रॉपडाउन से अपना राज्य चुनें।',
            askTickets: 'आप कितने टिकट खरीदना चाहेंगे? (1 से 100 के बीच कोई संख्या दर्ज करें)',
            invalidTickets: 'कृपया 1 से 100 के बीच वैध संख्या दर्ज करें।',
            selectedTickets: 'आपने {tickets} टिकट चुने। कुल लागत ₹{totalCost} है। क्या आप अपनी बुकिंग की पुष्टि करना चाहेंगे? (हाँ/नहीं)',
            confirmBooking: 'कृपया अपनी बुकिंग की पुष्टि करने के लिए "हाँ" या "नहीं" का उत्तर दें।',
            bookingCanceled: 'बुकिंग रद्द कर दी गई है। यदि आप फिर से आरंभ करना चाहते हैं, तो कृपया टिकटों की संख्या दर्ज करें जो आप बुक करना चाहते हैं।',
            paymentOptions: 'कृपया ₹{totalCost} के लिए अपना भुगतान विधि चुनें:',
            paymentSuccess: '{method} का उपयोग करके भुगतान सफल रहा। धन्यवाद!',
            selectState: 'आपने {state} चुना है। अब, आप कितने टिकट खरीदना चाहेंगे? (1 से 100 के बीच कोई संख्या दर्ज करें)',
        },
        bn: {
            greeting: 'নমস্কার! জাদুঘর টিকিট বুকিং সিস্টেমে আপনাকে স্বাগত জানাই। অনুগ্রহ করে ড্রপডাউন থেকে আপনার রাজ্য নির্বাচন করুন।',
            askTickets: 'আপনি কতটি টিকিট কিনতে চান? (1 থেকে 100 এর মধ্যে একটি সংখ্যা প্রবেশ করুন)',
            invalidTickets: 'দয়া করে 1 থেকে 100 এর মধ্যে একটি বৈধ সংখ্যা প্রবেশ করুন।',
            selectedTickets: 'আপনি {tickets} টিকিট নির্বাচন করেছেন। মোট খরচ ₹{totalCost}। আপনি কি আপনার বুকিং নিশ্চিত করতে চান? (হ্যাঁ/না)',
            confirmBooking: 'আপনার বুকিং নিশ্চিত করতে "হ্যাঁ" বা "না" দিয়ে উত্তর দিন।',
            bookingCanceled: 'বুকিং বাতিল হয়েছে। আপনি যদি আবার শুরু করতে চান তবে অনুগ্রহ করে টিকিটের সংখ্যা প্রবেশ করুন যা আপনি বুক করতে চান।',
            paymentOptions: '₹{totalCost} এর জন্য আপনার পেমেন্ট পদ্ধতি নির্বাচন করুন:',
            paymentSuccess: '{method} ব্যবহার করে পেমেন্ট সফল হয়েছে। ধন্যবাদ!',
            selectState: 'আপনি {state} নির্বাচন করেছেন। এখন, আপনি কতটি টিকিট কিনতে চান? (1 থেকে 100 এর মধ্যে একটি সংখ্যা প্রবেশ করুন)',
        },
     
    };

    
    setTimeout(() => displayMessage('bot', getTranslation('greeting')), 500);

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    languageSelect.addEventListener('change', (e) => {
        selectedLanguage = e.target.value;
        displayMessage('bot', getTranslation('greeting')); // Display greeting in the selected language
    });

    stateSelect.addEventListener('change', (e) => {
        selectedState = e.target.value;
        displayMessage('bot', getTranslation('selectState').replace('{state}', selectedState));
        bookingStep = 0;
    });

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            displayMessage('user', userMessage);
            processMessage(userMessage);
            userInput.value = ''; // Clear input field
        }
    }

    function displayMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageDiv.innerHTML = message;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to latest message
    }

    function showTypingIndicator() {
        typingIndicator.classList.remove('hidden');
        setTimeout(() => {
            typingIndicator.classList.add('hidden');
        }, 1500); // Show typing indicator for 1.5 seconds
    }

    function processMessage(message) {
        showTypingIndicator();
        setTimeout(() => {
            if (bookingStep === 0) {
                const numberOfTickets = parseInt(message, 10);
                if (isNaN(numberOfTickets) || numberOfTickets < 1 || numberOfTickets > 100) {
                    displayMessage('bot', getTranslation('invalidTickets'));
                } else {
                    selectedTickets = numberOfTickets;
                    const totalCost = selectedTickets * ticketPrice;
                    displayMessage('bot', getTranslation('selectedTickets').replace('{tickets}', selectedTickets).replace('{totalCost}', totalCost));
                    bookingStep = 1;
                }
            } else if (bookingStep === 1) {
                const response = message.toLowerCase();
                if (response === 'yes' || response === 'हाँ' || response === 'হ্যাঁ') { // Handling yes in English, Hindi, and Bengali
                    displayMessage('bot', getTranslation('paymentOptions').replace('{totalCost}', selectedTickets * ticketPrice));
                    showPaymentOptions();
                    bookingStep = 2;
                } else if (response === 'no' || response === 'नहीं' || response === 'না') { // Handling no in English, Hindi, and Bengali
                    displayMessage('bot', getTranslation('bookingCanceled'));
                    bookingStep = 0; // Reset the step for a new booking session
                } else {
                    displayMessage('bot', getTranslation('confirmBooking'));
                }
            }
        }, 1500); // Simulate processing delay
    }

    function showPaymentOptions() {
        const paymentOptions = `
            <div class="payment-options">
                <button onclick="processPayment('UPI')">UPI</button>
                <button onclick="processPayment('Debit Card')">Debit Card</button>
                <button onclick="processPayment('Credit Card')">Credit Card</button>
                <button onclick="processPayment('Others')">Others</button>
            </div>
        `;
        displayMessage('bot', paymentOptions);
    }

    window.processPayment = function(method) {
        showTypingIndicator();
        setTimeout(() => {
            displayMessage('bot', getTranslation('paymentSuccess').replace('{method}', method));
            bookingStep = 0; // Reset the step for a new booking session
        }, 1500); // Simulate payment processing delay
    }

    function getTranslation(key) {
        return translations[selectedLanguage][key];
    }
});
