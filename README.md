# NovaStore Frontend

Expo (React Native) storefront for **NovaStore** by Novalith Labs. Runs on iOS, Android, and web.

## Stack

- Expo SDK 54 + Expo Router
- React Native / React Native Web
- Redux Toolkit + RTK Query
- Axios API client
- AsyncStorage (cart + theme preference)
- Secure Store for auth tokens (native)

## Features

- Customer home, browse-by-category, cart, checkout, orders, wallet, account
- Admin product / category / order / store-settings screens
- Light / dark theme
- Google OAuth (optional)
- Web deploy via Expo export + Vercel

## Quick start

### 1. Prerequisites

- Node.js 20+
- Running NovaStore API ([store-backend](../store-backend)) on the URL in `.env`

### 2. Install

```bash
cp .env.example .env
npm install
```

### 3. Environment

```env
EXPO_PUBLIC_API_URL=http://localhost:4020
EXPO_PUBLIC_GOOGLE_AUTH_BASE_URL=http://localhost:4020
EXPO_PUBLIC_GOOGLE_AUTH_START_PATH=/api/auth/google
EXPO_PUBLIC_ENABLE_GOOGLE_AUTH=true
EXPO_PUBLIC_GOOGLE_APP_CALLBACK_URL=exp://127.0.0.1:8081/--/auth/google/callback
```

`EXPO_PUBLIC_*` values are baked in at build time. Change them, then restart or redeploy.

### 4. Run

```bash
npm start
# then press i / a / w for iOS, Android, or web

npm run android
npm run ios
npm run web
```

Default Metro / Expo URL is typically http://localhost:8081.

## Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Expo dev server |
| `npm run web` | Start web target |
| `npm run android` / `npm run ios` | Native targets |
| `npm run build:web` | Static web export to `dist/` |
| `npm run lint` | ESLint |

## Project structure

```
app/           # Expo Router routes (tabs, auth, admin, checkout)
screens/       # Screen components
components/    # Shared UI
context/       # Cart, theme, notifications
store/         # Redux + RTK Query APIs
services/      # Axios helpers
brand/         # NovaStore / Novalith identity
```

## Cart persistence

The cart lives in `CartContext` and is persisted to AsyncStorage (`novastore_cart`) so items survive app reloads. Checkout still posts orders to the backend API.

## Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Vercel + Railway setup, CORS, and post-deploy checks.

```bash
npm run build:web
# output: dist/
```

## License

Private Novalith Labs project
