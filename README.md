# MD. Dulal Hossin — Portfolio

![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwind-css&logoColor=white)
![EmailJS](https://img.shields.io/badge/EmailJS-4.x-FF6B35)
![Playwright](https://img.shields.io/badge/Playwright-1.x-2EAD33?logo=playwright&logoColor=white)

A modern, fully responsive developer portfolio built with Vue 3, Tailwind CSS v4, and Vite. Features dark/light theme switching, smooth scroll-reveal animations, a typewriter effect, and a working contact form powered by EmailJS.

---

## Features

- **Dark / Light Mode** — class-based theme toggle with `localStorage` persistence and zero flash on reload
- **Typewriter Animation** — cycling role titles in the hero section
- **Scroll Reveal** — `IntersectionObserver`-driven fade-in animations as sections enter the viewport
- **Filterable Skills & Projects** — category filters with smooth `TransitionGroup` animations
- **Working Contact Form** — sends real emails via EmailJS (no backend required)
- **Glassmorphism UI** — backdrop-blur cards, animated gradient backgrounds, floating badges
- **Fully Responsive** — tested at 5 viewport sizes from 375 px to 1536 px
- **E2E Test Suite** — 50+ Playwright tests covering theme, responsiveness, and UI correctness

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 (Vite plugin) |
| Email | EmailJS (`@emailjs/browser` v4) |
| Utilities | VueUse |
| Testing | Playwright |

---

## Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── profile-nobg.png        # Profile photo (transparent background)
│   └── profile.jpg             # Original profile photo
├── src/
│   ├── main.js                 # Vue app entry point
│   ├── App.vue                 # Root component — mounts all sections
│   ├── style.css               # Tailwind v4 import + custom animations & utilities
│   ├── components/
│   │   ├── NavBar.vue          # Sticky navbar, hamburger menu, theme toggle
│   │   ├── HeroSection.vue     # Landing hero with typewriter & particle effects
│   │   ├── AboutSection.vue    # Bio, contact cards, resume download
│   │   ├── SkillsSection.vue   # Filterable skill bars + tech stack grid
│   │   ├── ExperienceSection.vue  # Vertical work timeline + education card
│   │   ├── ProjectsSection.vue    # Filterable project cards grid
│   │   ├── AchievementsSection.vue # Achievement cards + stats banner
│   │   ├── ContactSection.vue  # Contact form with EmailJS + validation
│   │   └── FooterSection.vue   # Links, socials, copyright
│   ├── composables/
│   │   ├── useTheme.js         # Singleton dark/light theme state
│   │   ├── useTypewriter.js    # Typewriter animation composable
│   │   └── useScrollReveal.js  # IntersectionObserver scroll-reveal
│   └── data/
│       └── portfolio.js        # All portfolio content (single source of truth)
├── tests/
│   ├── theme.spec.js           # Dark/light mode Playwright tests (20 tests)
│   └── ui-fixes.spec.js        # Navbar, achievements, responsiveness (30+ tests)
├── .env.example                # Environment variable template
├── vite.config.js
└── playwright.config.js
```

---

## Installation

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/DulalDh/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Fill in your EmailJS credentials (see "Email Configuration" below)

# 4. Start the development server
npm run dev
```

The dev server runs at `http://localhost:5173` by default.

---

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Production build → dist/
npm run preview   # Preview the production build locally
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

All variables must be prefixed with `VITE_` to be exposed to the Vite client bundle.

---

## Email Configuration (EmailJS)

The contact form sends emails directly from the browser using [EmailJS](https://www.emailjs.com) — no backend or server required. Free tier allows 200 emails/month.

### Setup steps

1. Create a free account at [emailjs.com](https://www.emailjs.com)
2. **Add a Gmail service**
   Email Services → Add New Service → Gmail → connect your Gmail account → copy the **Service ID**
3. **Create an email template**
   Email Templates → Create New Template → use these exact variable names in the template body:

   ```
   From: {{from_name}} <{{from_email}}>
   Subject: {{subject}}

   {{message}}
   ```

   Set the **Reply To** field to `{{reply_to}}` → Save → copy the **Template ID**

4. **Copy your Public Key**
   Account → General → Public Key

5. Paste all three values into your `.env` file and restart the dev server

### Template variables sent by the form

| Variable | Description |
|---|---|
| `from_name` | Sender's name |
| `from_email` | Sender's email address |
| `subject` | Message subject |
| `message` | Message body |
| `reply_to` | Sender's email (sets Reply-To header) |

> **Note:** If you see a `Gmail_API: Request had insufficient authentication scopes` error, reconnect your Gmail service in the EmailJS dashboard (Email Services → your service → Reconnect Account) and ensure all OAuth permissions are granted.

---

## Build & Deployment

### Production build

```bash
npm run build
```

Output is written to `dist/`. The build is a standard static site — deploy to any static host.

### Deployment options

| Platform | Steps |
|---|---|
| **Vercel** | Import repo → framework preset: Vite → add env vars → deploy |
| **Netlify** | Drag & drop `dist/` folder, or connect repo → build command: `npm run build`, publish dir: `dist` → add env vars |
| **GitHub Pages** | Use `gh-pages` package or GitHub Actions to publish `dist/` |

> Remember to add your `VITE_EMAILJS_*` environment variables in the hosting platform's dashboard, not just locally in `.env`.

---

## Running Tests

The test suite uses [Playwright](https://playwright.dev) for end-to-end testing.

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all tests (dev server must be running on localhost:5174)
npm run dev &
npx playwright test

# Run with UI
npx playwright test --ui

# Run a specific test file
npx playwright test tests/theme.spec.js
```

### Test coverage

| File | Tests | What it covers |
|---|---|---|
| `theme.spec.js` | 20 | Dark/light toggle, localStorage persistence, no-flash on reload, profile image |
| `ui-fixes.spec.js` | 30+ | Navbar light mode, achievements banner, 5 responsive viewports |

---

## Customization

All portfolio content lives in a single file — **`src/data/portfolio.js`**. Edit it to update:

- Personal info (name, email, phone, GitHub, LinkedIn, bio)
- Typing phrases in the hero section
- Skills (name, level, category, icon)
- Work experience entries
- Projects
- Education details
- Achievements
- Stats banner values

No other files need to be changed for content updates.

---

## Known Issues

- **EmailJS OAuth scope error** — Reconnect your Gmail service in the EmailJS dashboard if submissions fail with a `412` status. This happens when Google revokes the OAuth token or the service is connected without granting `gmail.send` scope.
- **Playwright port** — Tests are configured for `localhost:5174`. If your dev server runs on a different port, update `playwright.config.js`.

---

## License

This project is for personal portfolio use. Feel free to fork and adapt it for your own portfolio.
