##  Portfolio & AI Assistant

Interactive developer portfolio for **Sai Rishi Kumar Vedi** built with React, TypeScript, Tailwind CSS, shadcn-ui, and a Supabase-powered AI chatbot that knows about your skills, experience, and projects.

This is a **frontend-only** app that can be hosted directly from GitHub (e.g. GitHub Pages, Vercel, Netlify). The AI chatbot uses a Supabase Edge Function, which is already wired up via environment variables.

---

## Features

- **Modern portfolio layout**
  - Hero, About, Skills, Experience, Projects, Certifications, Achievements, Explore More, and Contact sections.
  - Smooth scrolling, section padding utilities, and gradients defined in `index.css` and `tailwind.config.ts`.

- **Admin and edit mode**
  - `AuthContext` with a simple admin login (email + password stored locally).
  - `EditModeContext` with localStorage-based content overrides.
  - `AdminBar`, `EditModeToggle`, and `AdminInbox` for managing content while browsing the site.

- **AI chatbot about Sai**
  - Floating chat widget (`AIChatbot`) that talks specifically about **Sai Rishi Kumar Vedi**.
  - Uses **Supabase Edge Function** (`supabase/functions/chat/index.ts`) + `lovable` AI gateway.
  - Streams responses in real time using `text/event-stream`.

- **UI & theming**
  - **shadcn-ui** and **Radix UI** components under `src/components/ui`.
  - **Tailwind CSS** with custom design tokens and glassmorphism utilities in `src/index.css`.
  - **ThemeContext** powers dark/light mode by toggling classes on the root `<html>` element.

- **Tech & data**
  - React 18 + TypeScript + Vite.
  - `@tanstack/react-query` for data fetching if needed.
  - `portfolio.ts` centralizes projects, experience, education, certifications, and achievements.
  - Supabase client auto-configured in `src/integrations/supabase/client.ts`.

- **Tooling**
  - **Vitest** for tests (`src/test`).
  - **ESLint** + TypeScript for linting and type safety.
  - Vite build with path alias `@` → `src`.

---

## Project structure (high level)

- `src/main.tsx` – React entry, renders `<App />`.
- `src/App.tsx` – Wraps the app with:
  - `ThemeProvider`, `AuthProvider`, `EditModeProvider`
  - `QueryClientProvider` (React Query)
  - `TooltipProvider`
  - Global `Toaster` + `Sonner` toasts
  - `BrowserRouter` with:
    - `/` → `pages/Index`
    - `*` → `pages/NotFound`
- `src/pages/Index.tsx` – Main one-page portfolio composed of:
  - `Navbar`, `HeroSection`, `AboutSection`, `SkillsSection`, `ExperienceSection`,
    `ProjectsSection`, `CertificationsSection`, `AchievementsSection`,
    `ExploreMoreSection`, `ContactSection`
  - `Footer`, `BackToTop`, `AdminBar`, `EditModeToggle`, `AdminInbox`, `AIChatbot`
- `src/context/ThemeContext.tsx` – Dark/light theme logic with `localStorage`.
- `src/context/AuthContext.tsx` – Admin auth with email/password and `localStorage`.
- `src/context/EditModeContext.tsx` – Edit mode toggle and `localStorage`-backed content store.
- `src/data/portfolio.ts` – Data models and sample content for projects, experience, education, achievements, certifications.
- `src/integrations/supabase/client.ts` – Supabase client configured from Vite env vars.
- `supabase/functions/chat/index.ts` – Deno Edge Function implementing the AI chatbot backend.

---

## Prerequisites

- **Node.js**: v18+ (recommended).
- **npm**: comes with Node.js.

Make sure you have Git installed if you plan to clone and push to GitHub.

---

## Getting started (local development)

1. **Clone the repository**

   ```sh
   git clone <YOUR_GITHUB_REPO_URL>
   cd <YOUR_REPO_FOLDER_NAME>
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Create `.env` file (if not present)**

   The project currently expects these Vite env vars (already present in `.env` in this repo):

   ```sh
   VITE_SUPABASE_PROJECT_ID=<your-supabase-project-id>
   VITE_SUPABASE_PUBLISHABLE_KEY=<your-supabase-anon-key>
   VITE_SUPABASE_URL=<your-supabase-url>
   ```

   - If you fork/duplicate this project, create your own Supabase project and replace these values.
   - For simple **front-end-only hosting** (GitHub Pages) the site will still build and run with these values, but you should treat them as public client-side secrets and rotate keys if needed.

4. **Run the development server**

   ```sh
   npm run dev
   ```

   Then open the printed `http://localhost:xxxx` URL in your browser.

---

## Testing and building

- **Run tests**

  ```sh
  npm test
  ```

- **Create a production build**

  ```sh
  npm run build
  ```

  This outputs static assets to the `dist` folder, which is what you’ll deploy (e.g. to GitHub Pages).

- **Preview the production build locally**

  ```sh
  npm run preview
  ```

---

## GitHub Pages hosting (frontend only)

Yes, you **can host this directly from GitHub** as a static frontend, because this is a Vite React SPA.

There are two common options:

### 1. GitHub Pages via `dist` (simple)

1. **Push the code to GitHub**

   ```sh
   git add .
   git commit -m "Initial portfolio"
   git push origin main
   ```

2. **Build locally**

   ```sh
   npm run build
   ```

3. **Use a GitHub Pages action or `gh-pages` branch**

   The simplest non-automated approach:

   - Create a new **orphan** branch for static files:

     ```sh
     git checkout --orphan gh-pages
     git reset --hard
     git clean -fd
     ```

   - Copy the `dist` contents to this branch:

     ```sh
     npm run build
     cp -r dist/* .
     git add .
     git commit -m "Deploy"
     git push origin gh-pages --force
     ```

   - In **GitHub → Settings → Pages**:
     - Set **Source** to `Deploy from a branch`.
     - Select branch: `gh-pages`, folder: `/ (root)`.

4. After a few minutes, your site will be available at:

   - `https://<your-username>.github.io/<your-repo-name>/`

5. **Important: Vite `base` setting**

   - If your repository is **not** served at the root username domain and instead at `/your-repo-name/`, you should set `base` in `vite.config.ts`:

     ```ts
     // vite.config.ts
     export default defineConfig(({ mode }) => ({
       base: mode === "production" ? "/<your-repo-name>/" : "/",
       // ...rest of config
     }));
     ```

   - Replace `<your-repo-name>` with your actual GitHub repo name.

### 2. GitHub Pages via GitHub Actions (recommended)

You can also use the official **Vite + GitHub Pages** workflow:

1. In GitHub, go to **Actions → New workflow** and choose a “Deploy static site” or similar action.
2. Configure it to:
   - Run `npm install`
   - Run `npm run build`
   - Upload `dist` as an artifact
   - Deploy that artifact to GitHub Pages
3. Ensure your `vite.config.ts` `base` is set correctly as mentioned above.

---

## Supabase & AI chatbot configuration

The AI chatbot uses a Supabase Edge Function that is already implemented in:

- `supabase/functions/chat/index.ts`

Key points:

- It reads `{ messages }` from the request body.
- Uses `LOVABLE_API_KEY` (configured on the Supabase side) to call the lovable AI gateway:
  - `https://ai.gateway.lovable.dev/v1/chat/completions`
- Adds a **system prompt** that includes:
  - Personal info: name, email, phone, location, education.
  - Skills, projects, experience, and achievements.
- Streams responses back as Server-Sent Events (`text/event-stream`).

On the frontend, `AIChatbot.tsx`:

- Builds the Supabase function URL from:

  ```ts
  const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
  ```

- Sends all previous messages plus the current one.
- Reads events line-by-line and updates the assistant message progressively.

If you duplicate this project and create a new Supabase project:

1. Deploy the `chat` function from `supabase/functions/chat`.
2. Configure the `LOVABLE_API_KEY` secret in Supabase.
3. Update your `.env` `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.

---

## Customization guidelines

You can safely customize:

- **Content**:
  - Edit text and data in:
    - `src/components/*Section.tsx` (Hero, About, Skills, etc.).
    - `src/data/portfolio.ts` for structured data (projects, experience, etc.).
- **Styling**:
  - `src/index.css` for theme colors, glassmorphism, gradients, and utilities.
  - `tailwind.config.ts` for fonts, animations, and design tokens.
- **Layout**:
  - `src/pages/Index.tsx` to reorder or add/remove sections.

Be careful not to break:

- Context provider setup in `App.tsx` (`ThemeProvider`, `AuthProvider`, `EditModeProvider`).
- Environment variable names (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`).
- Supabase function route (`/functions/v1/chat`) and streaming protocol.

---

## Can this be hosted as frontend-only on GitHub?

**Yes.**

- The React + Vite app is a **static frontend** and can be hosted on **GitHub Pages**.
- The AI chatbot backend runs on **Supabase Edge Functions**, not on GitHub, and is accessed via HTTPS.
- As long as your Supabase project and function are deployed and your `.env` values are valid, the chatbot will work from the GitHub-hosted frontend.

In short: **you can host this repo on GitHub Pages as a frontend-only site**, and everything (including the AI chatbot) will work as long as your Supabase and Lovable configurations remain valid.

---

## License

If you plan to make this public, choose and add a license (e.g. MIT) here.
