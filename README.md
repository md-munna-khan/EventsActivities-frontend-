(# Events & Activities — Frontend)

(Live client: https://events-activities-frontend-chi.vercel.app)
(Live server: https://events-activities-backend.vercel.app)

(GitHub)
(- Frontend: https://github.com/md-munna-khan/EventsActivities-frontend)
(- Backend:  https://github.com/md-munna-khan/EventsActivities-backend)

(Video walkthrough: https://drive.google.com/file/d/1IrgrVmQaY6CqQvTg5ChHipD2k1jyZXRN/view?usp=sharing)

(## Project Summary)

(Events & Activities is a social platform to discover, create and join real-world events (hikes, concerts, sports, hobby meetups, etc.). Roles include Client (regular user), Host (creates and manages events), and Admin (moderation and management).)

(This repository contains the Frontend (Next.js App Router). The Backend repo (Prisma + PostgreSQL + Node/Express or similar) exposes the API endpoints used by the frontend.)

(## Tech stack)

(- Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS)
(- Images: Next/Image, Cloudinary for hosted media)
(- Authentication: JWT via secure httpOnly cookies)
(- Backend: Node (Express/Nest/Next.js API), Prisma ORM, PostgreSQL)
(- Deployment: Vercel (frontend) and Vercel/Heroku for backend (live links above))

(## Features)

(- Role-based authentication: Client, Host, Admin)
(- Event CRUD (Host): create, edit, delete events)
(- Join/leave events (Client))
(- Host approval workflow (Admin approves hosts))
(- Reviews & ratings for completed events)
(- Dashboard views per role (Client/Host/Admin))
(- Image upload via Cloudinary)
(- Payment hooks (stubbed / integrated depending on backend))

(## Credentials (for testing))

(- Admin)
	(- Email: munnamia0200@gmail.com)
	(- Password: Admin@12345)

(- Host)
	(- Email: host@gmail.com)
	(- Password: 123456)

(- Client)
	(- Email: user@gmail.com)
	(- Password: 123456)

(Notes:)
(- To test reviews and "mark as complete" flows use the Host and Client credentials above. Events cannot be created with a date in the past / present during normal flows for data-safety — two events in the demo have been adjusted to allow testing.)

(## Local development — Frontend)

(Prereqs:)
(- Node.js (16+ recommended))
(- npm or pnpm/yarn)

(Clone the frontend repo and install:)

(PowerShell / cmd)
(```powershell)
(git clone https://github.com/md-munna-khan/EventsActivities-frontend.git)
(cd EventsActivities-frontend)
(npm install)
(# or pnpm install)
(```)

(Create a `.env.local` file in the frontend root with values similar to:)

(```env)
(# Base URL for API (backend). Example:)
(NEXT_PUBLIC_API_BASE_URL=https://events-activities-backend.vercel.app)

(# Optional: public Cloudinary key or other public config)
(NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset)
(NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud)
(```)

(Run the dev server:)

(```powershell)
(npm run dev)
(# or pnpm dev)
(```)

(Open http://localhost:3000)

(## Local development — Backend (brief))

(The backend repo is here: https://github.com/md-munna-khan/EventsActivities-backend)

(Typical steps (refer to backend README for exact commands):)

(```powershell)
(git clone https://github.com/md-munna-khan/EventsActivities-backend.git)
(cd EventsActivities-backend)
(npm install)

(# Add .env with DATABASE_URL, JWT_SECRET, CLOUDINARY_*, STRIPE keys, etc.)
(# Run Prisma migrations / seeds)
(npx prisma migrate dev --name init)
(npm run dev)
(```)

(Important backend ENV vars (examples))

(```env)
(# Postgres connection string)
(DATABASE_URL=postgresql://user:password@localhost:5432/events_db)

(# JWT secret used to sign/verify access tokens)
(JWT_SECRET=very_secret_change_me)

(# Cloudinary)
(CLOUDINARY_CLOUD_NAME=...)
(CLOUDINARY_API_KEY=...)
(CLOUDINARY_API_SECRET=...)

(# Optional payment provider keys)
(STRIPE_SECRET_KEY=...)
(```)

(## Database & Prisma)

(- Backend uses Prisma ORM with PostgreSQL. Run migrations and seeds on the backend repo as needed.)

(## Deployment)

(- Frontend: deployed to Vercel (see live link above). Point `NEXT_PUBLIC_API_BASE_URL` to your backend deployment.)
(- Backend: ensure environment variables are configured on your host provider. For Postgres use a managed DB instance and update `DATABASE_URL`.)

(## Common Development Notes & Troubleshooting)

(- Next/Image warnings)
	(- When using `fill` on `next/image`, include a `sizes` prop to help Next compute optimal image sizes (e.g. `sizes="(max-width: 768px) 100vw, 50vw"`).)
	(- When you style only width or height in CSS for an Image, also set the other dimension to `auto` (e.g. `style={{ width: '100%', height: 'auto' }}`) to preserve aspect ratio.)
	(- Filename note: the repository contains a logo asset with a trailing space in the filename (`public/evenzo .png`). Rename it to `evenzo.png` and update `src/components/shared/logo.tsx` to avoid tooling issues.)

(- Server actions and redirects (Next.js App router))
	(- Server actions that call `redirect()` throw a NEXT_REDIRECT control flow. If you use `useActionState()` on the client, prefer returning a serializable object like `{ success: true, redirectTo: '/path' }` from the server action and perform `router.push()` on the client. This avoids the client runtime error "An unexpected response was received from the server." observed during development.)

(- User info API shape)
	(- `getUserInfo()` may return different shapes depending on the caller (API response vs direct server action). UI code should be defensive when reading properties like `role` and `name` (e.g. `userInfo?.role ?? 'CLIENT'`).)

(## Tests)

(- No automated test suite is included by default. To manually test:)
	(1. Start backend and frontend)
	(2. Login with provided credentials)
	(3. Test role-specific flows: create event (Host), approve host (Admin), join event (Client), mark complete + add review (Host/Client))

(## Known issues / TODOs)

(- Some Tailwind class rename warnings show up in linter output (these are cosmetic and due to Tailwind updates).)
(- Improve server-action -> client redirect: convert server redirects to serializable responses or handle NEXT_REDIRECT on the client.)

(## Support / Contact)

(If you want me to finalize cleanup tasks (rename the logo file, add `sizes` to every `fill` image, and convert `loginUser` redirect to return `redirectTo`), say which step to take first and I will apply the patches.)

(---)

(Happy hacking! — If you want I can also produce a short CONTRIBUTING.md, CODE_OF_CONDUCT, or CI (GitHub Actions) setup for this project.)
