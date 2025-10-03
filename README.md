# Prashikshan MERN

## Getting Started

1. Copy `.env.example` to `.env` in `server` and set values
2. Install dependencies
3. Run both client and server

```bash
# in project root
npm i -D concurrently
cd server && npm i && cd ..
npm run dev:all
```

Server runs on `http://localhost:5000`, client on `http://localhost:5173`.

## Tech Stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deploy

Client (this folder):

1. Set Vercel Project root to `prashiskshan1/`
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Install Command: `npm ci`

Server (`server/`):

Deploy to any Node host (Render, Railway, Fly.io, etc.) and configure environment variables from `.env`.

## Notes

- This repo contains a client app in `prashiskshan1/` and a Node server in `server/`.
- Local dev proxy from client to server is configured in `vite.config.ts` under `/api`.
