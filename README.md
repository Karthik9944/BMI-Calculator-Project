# BMI Project

A dark-themed React BMI calculator with authentication, result tracking, and a small optional Node API.

## Features

- User signup and login
- BMI calculation with category-based result screen
- Stored BMI history per user using `localStorage`
- Protected routes for dashboard and results
- Optional backend API for health check and BMI calculation

## Tech Stack

- React 18
- React Router
- Create React App
- Node.js HTTP server

## Project Structure

```text
src/
  components/
    Auth/
    BMIcalculator/
    ResultPage/
  context/
    AuthContext.jsx
  utils/
    calculations.js
  App.js
  Intro.jsx
server.js
scripts/start.js
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the frontend

```bash
npm start
```

The app runs on:

`http://localhost:3000`

### 3. Start the backend API

In a separate terminal:

```bash
npm run server
```

The backend runs on:

`http://localhost:5000`

## Available Scripts

- `npm start`  
  Starts the React development server.

- `npm run dev`  
  Starts the React app with `react-scripts start`.

- `npm run server`  
  Starts the backend API from [`server.js`](/c:/Users/suren/OneDrive/Desktop/BMI-Project-main/server.js).

- `npm run build`  
  Builds the app for production.

- `npm test`  
  Runs the test suite.

## API Endpoints

### `GET /api/health`

Returns a simple health response:

```json
{
  "ok": true,
  "service": "bmi-backend"
}
```

### `POST /api/bmi`

Request body:

```json
{
  "weight": 70,
  "height": 170
}
```

Response:

```json
{
  "bmi": 24.2
}
```

## How the App Works

- New users can create an account from the auth screen.
- Login state is stored in the browser using `localStorage`.
- Each BMI calculation is saved to the logged-in user's history.
- The result page shows BMI value, category, measurements, and guidance text.

## Environment

The backend reads variables from `.env` when present.

Example:

```env
PORT=5000
```

## Notes

- This project currently stores user data in browser `localStorage`, so it is best suited for learning, demos, and small local projects.
- The backend is lightweight and optional for frontend usage in development.

