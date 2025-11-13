# PRN232 Post Manager Exam App

Mono-repo that hosts the ASP.NET Core Web API backend and the React + Vite + Ant Design frontend requested in the exam brief. The app lets users create, read, update, delete, search, and sort posts that live in a PostgreSQL database.

## Tech Stack
- Backend: .NET 9, ASP.NET Core Minimal APIs, Entity Framework Core, PostgreSQL
- Frontend: React 19, Vite, TypeScript, Ant Design

## Structure Highlights
- `backend/PostManager.Api` – ASP.NET Core Web API with controllers, repositories, and services for maintainability.
- `frontend/src/app` – shared layout + routing shell so pages stay lean.
- `frontend/src/features/posts` – feature module (api, components, pages, types) for everything post-related.
- `frontend/src/lib` & `src/hooks` – shared utilities like the Axios client and custom hooks.

## Local Setup

### Backend
1. Update `backend/PostManager.Api/appsettings.Development.json` with your local PostgreSQL credentials.
2. From `backend/` run the migration once: `dotnet ef database update --project PostManager.Api --startup-project PostManager.Api`.
3. Start the API: `dotnet run --project PostManager.Api`. Swagger UI is available at `https://localhost:{PORT}/swagger`.

### Frontend
1. Copy `frontend/.env.example` to `frontend/.env` and adjust `VITE_API_BASE_URL` to match the URL (scheme + port) printed by `dotnet run`. The default launch profile uses `http://localhost:5238`; running with `dotnet run --launch-profile https` will expose an HTTPS port you can use instead.
2. Install deps if needed: `npm install` in `frontend/`.
3. Run the dev server: `npm run dev`.

The React app calls `${VITE_API_BASE_URL}/api/posts`.

## Exam TODOs
- [ ] TODO: Push the repository to a public GitHub repo once the code is finalized.
- [ ] TODO: Deploy the API (Render/Railway) plus frontend (Vercel/Netlify) using the free tier and connect both environments to the hosted PostgreSQL instance (e.g., Supabase).
- [ ] TODO: Prepare the QE123456_Exam.docx report with the GitHub link, deployed URLs, feature summary, and setup instructions screenshots per the brief.
- [ ] TODO: Re-test the full flow against the hosted stack before submission.

## Useful Commands

| Task | Command |
|------|---------|
| Restore backend dependencies | `cd backend && dotnet restore` |
| Apply EF Core migrations | `cd backend && dotnet ef database update --project PostManager.Api --startup-project PostManager.Api` |
| Run backend (watch mode) | `cd backend/PostManager.Api && dotnet watch run` |
| Install frontend deps | `cd frontend && npm install` |
| Run frontend dev server | `cd frontend && npm run dev` |
| Build frontend for prod | `cd frontend && npm run build` |

## Deployment Guide

### Backend (Render via Dockerfile)
1. **Dockerfile** – Render will build `/backend/PostManager.Api/Dockerfile`, which already restores, publishes, and runs the API on port `8080`.
2. **Create service** – In Render, choose **New → Web Service → Docker**. Point to this repo, set the root to `/` and Dockerfile path to `backend/PostManager.Api/Dockerfile`.
3. **Environment** – Add `ConnectionStrings__Postgres` with your Render-hosted Postgres URL (the one you just migrated). Add any other secrets (e.g., `ASPNETCORE_ENVIRONMENT=Production`) here.
4. **Ports / health** – Render automatically exposes `8080`. Once deployed, `https://<service>.onrender.com/swagger` should load.

### Frontend (Vercel)
1. **Link repo** – In Vercel, import this GitHub repo. The included `vercel.json` tells Vercel to build from `frontend` and serve `frontend/dist`.
2. **Environment variables** – Under “Project Settings → Environment Variables” add `VITE_API_BASE_URL=https://<render-api>.onrender.com`.
3. **Deploy** – Vercel runs `npm install && npm run build` inside `frontend`, uploads `dist/`, and serves the site globally.
4. **Verify** – Browse the Vercel URL, ensure CRUD actions talk to the Render API and DB.

Both platforms redeploy automatically whenever you push to the tracked branch, so future changes are just `git push`.
