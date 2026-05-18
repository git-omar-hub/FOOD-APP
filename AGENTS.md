# AGENTS.md — FOOD-APP (Your-Dish)

MERN food ordering platform: customer frontend, admin dashboard, Express API.

## Packages

| Directory | Stack | Start command | Port |
|---|---|---|---|
| `Backend/` | Node.js + Express 5 + Mongoose | `npm start` | 4000 |
| `Frontend/` | React 19 (CRA) | `npm start` | 3000 |
| `Admin/` | React 18 + Vite | `npm run dev` | 5173 |

`./dev.sh` starts all three concurrently.

## Key Commands

- **Backend seed:** `npm run seed` — creates admin user + 9 coupon codes
- **Frontend build:** `npm run build` (env `CI=false` to avoid warning-as-error)
- **Frontend test:** `npm test` (CRA Jest, only `App.test.js` exists)
- **Admin lint:** `npm run lint` (ESLint flat config)

## Env

`.env` lives in `Backend/`. The env var names in code match the `.env.example` exactly **including intentional typos** — do not "fix" them:
- `JWT_SECRT`, `STRIB_SECRET_KEY` (missing letters)
- `DB_URL`, `port` (lowercase)
- `FRONTEND_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`

Env loading: tries `process.loadEnvFile()` (Node 21+), falls back to `dotenv`.

## Architecture

- **All JS/JSX, no TypeScript** anywhere.
- **All ESM** — `import`/`export` everywhere. No `require()`.
- **Express 5** — async middleware errors are handled natively; `req.query` is immutable.
- **Admin auth** — `Backend/middlewares/adminAuth.js` verifies JWT + `isAdmin` field. Admin panel routes guarded by local `adminToken` in sessionStorage. Default admin: `admin@yourdish.com` / `admin123` (set by seed).
- **CORS** restricted to `localhost:3000`, `localhost:5173`, `https://food-app-jtkt.vercel.app`.
- **Images** served statically: `Backend/uploads/` → `/images` URL path.
- **Deployment:** Vercel — `Admin/vercel.json` (SPA fallback), `Backend/vercel.json` (serverless).

## Repo History Quirks

- **`successs` typo** (three `s`) was fixed across order controller + frontend consumers in v2. Any new code touching order responses should destructure `success` (two `s`).
- **React version mismatch:** Admin 18.2.0, Frontend 19.2.4.

## Testing

Only the Frontend has tests (CRA Jest + Testing Library). No Backend or Admin tests exist.
