# Frontend Developer Intern Assignment

Build a modern, secure web app with a minimal backend. Timebox: **3 days**.

## Features
- Responsive UI with form validation (client and server)
- JWT auth: signup, login, logout, protected routes
- Profile fetch/update
- CRUD on a sample entity (notes/tasks/posts)
- Search and filter in the dashboard
- Error handling, auth middleware, and password hashing

## Tech Stack
- Frontend: React or Next.js
- UI: TailwindCSS / Material UI / Bootstrap
- Backend: Node.js + Express (or Python FastAPI/Django)
- Database: MongoDB / Postgres / MySQL

## Quick Start
1) Backend: `cd backend && npm install && npm run dev`
2) Frontend: `cd frontend && npm install && npm run dev`
3) Open the frontend dev URL (e.g., http://localhost:5173) and ensure the backend (default http://localhost:5000) is reachable.

## Environment
- Backend `.env` (sample in backend/.env.example):
  - PORT=5000
  - MONGO_URI=<your-connection-string>
  - JWT_SECRET=<secure-random-string>

## Project Structure
- backend/: Express server, routes, models, middleware
- frontend/: React app with pages, components, and API client
- postman_collection.json: Example API requests

## API Surface
- Auth: POST /api/auth/register, POST /api/auth/login, GET /api/auth/profile, PUT /api/auth/profile
- Entity (e.g., notes): GET /api/notes, POST /api/notes, PUT /api/notes/:id, DELETE /api/notes/:id

## Deliverables
- Frontend + backend in this repo
- Working auth (register/login/logout with JWT)
- Dashboard with CRUD entity
- Postman collection or API docs
- Note on how you would scale frontend-backend integration for production

## Evaluation
- UI/UX quality and responsiveness
- Frontend-backend integration quality
- Security practices (hashed passwords, token validation)
- Code quality and documentation
- Scalability potential (structure, modularity)

## Security Basics
- Hash passwords (bcrypt or similar)
- Use JWT auth middleware on protected routes
- Validate inputs on both client and server
- Keep secrets out of version control (no committed .env)

## Scaling Notes
- Organize code by feature modules
- Add API versioning as endpoints grow
- Use caching (CDN for assets, response caching) and pagination for lists
- Automate with CI/CD, linting, and tests; use env-based configs for staging/prod

## Submission
Email your resume and completed assignment links (GitHub, portfolio, blog, etc.) plus log files to:
- saami@bajarangs.com
- nagasai@bajarangs.com
- chetan@bajarangs.com
- CC: sonika@primetrade.ai

Subject: Frontend Developer Task. Candidates who advance will be notified within 3 business days. Apply early; first-come-first-served.

## Tips
- Keep commits small and descriptive
- Add brief inline comments where logic is non-obvious
- Include a short scaling note (README or docs/) for production considerations



