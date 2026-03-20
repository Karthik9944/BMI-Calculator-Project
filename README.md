📊 BMI Calculator Pro

A sleek, dark-themed React application for tracking and managing Body Mass Index (BMI). Designed with a premium aesthetic and professional-grade architecture.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)


🚀 Key Features

- User Authentication : Secure signup and login flow with persistent sessions.
- Dynamic Dashboard : Real-time BMI calculation with interactive result screens and category classification.
- Historical Tracking : Automatic persistence of user calculation history using "localStorage".
- Premium Dark UI : Modern, glassmorphism-inspired design for an engaging user experience.
- Protected Routes : Secure application logic ensuring only authenticated users can access their dashboard.
- Optional REST API : Lightweight backend integration for health checks and formula processing.

✨ What Makes This Project Unique?

Unlike standard BMI calculators that provide a simple one-off calculation, this project is built as a "full-scale personal health tracker".

- Non-Clinical, Premium UX**: Most BMI tools look like clinical forms. Our project uses a modern dark-mode design with glassmorphism, making the health tracking experience feel premium and engaging.
- True Privacy via Local Persistence : While other sites require cloud accounts that may store your data, our project uses LocalStorage. This means your health history stays on your device, giving you 100% data ownership.
- Architectural Excellence : This isn't just a script; it's a professionally architected React app. It demonstrates advanced concepts like the Provider Pattern, Dynamic Routing , and Encapsulated Utility Logic.
- Dual-Mode Flexibility : It works as a standalone frontend app but also includes a "RESTful Node.js API". This "Full-Stack Ready" approach makes it uniquely extensible compared to basic calculators.

🛠️ Tech Stack

- Frontend: [React 18](https://reactjs.org/), [React Router v7](https://reactrouter.com/)
- State Management : React Context API (Provider Pattern)
- Styling : Vanilla CSS3 (Custom Design System)
- Backend : [Node.js](https://nodejs.org/)
- Development : Create React App (CRA)

🏗️ Technical Architecture

The application follows a modular architecture for scalability:

- State Management : Centralized `AuthContext` manages user sessions and ensures consistent state across the app.
- Protected Routing : Custom route guards prevent unauthenticated access to the history and calculator pages.
- Data Persistence : Uses `localStorage` to simulate a database for a fast, serverless-capable demonstration.
- Separation of Concerns : Business logic (calculations) is abstracted into `utils/` for better maintainability.

📂 Project Structure

```text
src/
├── components/         # UI Components
│   ├── Auth/           # Login & Signup forms
│   ├── BMI Calculator/ # Input & Core Logic
│   └── ResultPage/     # Category Display & History
├── context/            # Global State (AuthContext)
├── utils/              # Calculation helpers
├── App.js              # Routing & Root Configuration
└── Intro.jsx           # Landing experience
server.js               # Express API entry point
```

🚥 Getting Started

Prerequisites

- Node.js (v16.x or higher)
- npm (v8.x or higher)

Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Surendhar-01/bmi-calc.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

Running the App

Start Frontend:

```bash
npm start
```

The application will be available at `http://localhost:3000`

Start Backend (Optional):

```bash
npm run server
```

The API runs at `http://localhost:5000`.

📜 Future Roadmap

- Database Integration : Migrate from `localStorage` to MongoDB for cross-device data persistence.
- Health Analytics : Add TDEE (Total Daily Energy Expenditure) and Macronutrient calculators.
- PDF Reports : Export BMI history as professional PDF reports for medical consultations.
- Localization : Support for multiple languages (i18n).

💡 Lessons Learned

Implementing a robust authentication flow using only client-side state provided valuable insights into React's Context API and lifecycle management. The project demonstrates how to create a "full-stack feel" using modern frontend techniques.
