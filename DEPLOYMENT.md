# NovaStore frontend deployment

Deploy the NovaStore web app (this repo) alongside the NovaStore API (`store-backend`).

## Services

| Service | Platform |
| --- | --- |
| Frontend | Vercel |
| Backend API | Railway (or any Node host) |
| Database | Postgres |

## Frontend on Vercel

1. Import this repository in Vercel.
2. Root directory: repository root (this folder).
3. Framework preset: **Other** (or leave blank; `vercel.json` sets `framework: null`).
4. Environment variables:

```env
EXPO_PUBLIC_API_URL=https://your-api.up.railway.app
EXPO_PUBLIC_GOOGLE_AUTH_BASE_URL=https://your-api.up.railway.app
EXPO_PUBLIC_GOOGLE_AUTH_START_PATH=/api/auth/google
EXPO_PUBLIC_ENABLE_GOOGLE_AUTH=true
EXPO_PUBLIC_GOOGLE_APP_CALLBACK_URL=https://your-frontend.vercel.app/auth/google/callback
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=
```

5. Build command: `npx expo export -p web` (already in `vercel.json`)
6. Output directory: `dist` (already in `vercel.json`)
7. `vercel.json` rewrites all routes to `/` for Expo Router SPA navigation.

**Important:** `EXPO_PUBLIC_*` values are baked in at build time. Change the API URL, then redeploy.

## CORS and app URLs

On the backend set:

```env
APP_NAME=NovaStore
SMTP_FROM=noreply@novastore.app
BREVO_SENDER_EMAIL=noreply@novastore.app
CORS_ORIGINS=https://your-frontend.vercel.app,http://localhost:8081,http://localhost:19006
GOOGLE_APP_CALLBACK_URL=https://your-frontend.vercel.app/auth/google/callback
```

Verify `noreply@novastore.app` (or your domain) as a sender in Brevo before production email.

## Build locally

```bash
npm install
npm run build:web
# serve dist/ (Vercel does this automatically)
npx serve dist
```

## Post-deploy verification

- [ ] Home shows **NovaStore** branding
- [ ] Login / register works against the deployed API
- [ ] Verification and password-reset emails arrive from `noreply@novastore.app`
- [ ] Light / dark theme still works
- [ ] Deep links like `/category/...` and `/checkout` load after refresh
