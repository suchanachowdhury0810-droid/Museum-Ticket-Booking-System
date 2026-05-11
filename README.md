# Museum Ticket Booking System

A lightweight, multilingual chatbot application designed for a seamless museum ticket booking experience. This system allows users to select their state and language to book tickets through an interactive chat interface with integrated payment simulation.

---

## 🚀 Features

* **Multilingual Support**: Fully localized interface supporting English, Hindi, and Bengali.
* **State-Specific Interaction**: Personalized booking journey based on the user's selected Indian state.
* **Interactive Chatbot**: Real-time message processing with a "typing" indicator for a natural user experience.
* **Input Validation**: Built-in logic to ensure users book a valid number of tickets (between 1 and 100).
* **Dynamic Cost Calculation**: Automatically calculates the total price based on a fixed rate of **₹250 per ticket**.
* **Payment Simulation**: Integrated buttons for simulating various payment methods like UPI, Debit Card, and Credit Card.

---

## 📂 File Structure

* **`index.html`**: The core structure of the application, including the language/state dropdowns and the chat container.
* **`style.css`**: Contains all visual styling, including chat bubble layouts, animations for the typing indicator, and responsive container settings.
* **`script.js`**: The logic engine handling message processing, state management, translations, and event listeners.

---

## 🛠️ Technical Specifications

### Pricing Logic
The system uses a constant variable for ticket pricing:
* **Ticket Price**: ₹250
* **Logic**: `Total Cost = selectedTickets * 250`

### Supported Languages
* English (`en`)
* Hindi (`hi`)
* Bengali (`bn`)

---

## 📖 How to Use

1.  **Select State & Language**: Use the dropdown menus at the top of the page to set your location and preferred language.
2.  **Start Booking**: The bot will greet you. Type the number of tickets you wish to purchase (e.g., "5") and press Enter.
3.  **Confirm**: The bot will display the total cost. Reply with **"yes"**, **"हाँ"**, or **"হ্যাঁ"** to proceed.
4.  **Payment**: Click on one of the generated payment method buttons to complete the simulation.

---

## ⚙️ Setup Instructions

1.  Save `index.html`, `style.css`, and `script.js` in the same directory.
2.  (Optional) Add a background image named `museum.jpg` to the folder to enable the themed background.
3.  Open `index.html` in any modern web browser.

> **Note**: This is a front-end simulation. No real financial transactions are processed, and data is not persisted to a database.
