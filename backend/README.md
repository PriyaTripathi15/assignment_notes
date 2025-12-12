# Backend (Express + MongoDB)

Instructions:

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies: `npm install`
3. Run: `npm run dev` (requires nodemon globally) or `npm start`
4. API endpoints:
   - POST /api/auth/register {name,email,password}
   - POST /api/auth/login {email,password}
   - GET /api/auth/profile (Authorization: Bearer <token>)
   - CRUD /api/notes (Authorization required)
