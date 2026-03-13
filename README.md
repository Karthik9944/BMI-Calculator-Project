# BMI Project (Separated Frontend + Backend)

## Structure
- `frontend/` React application (UI)
- `backend/` Node HTTP API

## Run Frontend
```bash
npm run start:frontend
```

## Run Backend
```bash
npm run start:backend
```

Backend default URL: `http://localhost:5000`

## Sample API
- `GET /api/health`
- `POST /api/bmi` with JSON body:
```json
{ "weight": 70, "height": 170 }
```
