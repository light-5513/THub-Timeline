# Technical Hub — 4-Year Transformation Timeline & 8-Semester Industry Roadmap

[![React](https://img.shields.io/badge/React-19-064e3b?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-047857?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Design System](https://img.shields.io/badge/UI-Soft%20Neumorphic%20White%20%26%20Green-0a5830)](https://github.com)
[![License](https://img.shields.io/badge/License-Proprietary-022c22)](https://technicalhub.io)

An interactive, cinematic presentation platform crafted for **Technical Hub** presenting a comprehensive **4-Year Strategic Industry Capability & Global Certification Roadmap** from Day 1 algorithmic foundations to enterprise deployment and Generative AI engineering.

---

## 🌟 Executive Overview

The **Next-Gen Transformation Timeline** proposal replaces fragmented workshops with a coherent, progressive multi-year developmental curriculum. Engineering students journey from competitive coding discipline in Year 1 to production AI deployment and Fortune 500 credentialing by graduation.

---

## 🎨 Design Philosophy: Soft Neumorphic Architecture

The entire user interface is designed in a **Soft Neumorphic White & Dark Green** design system:
- **Pillowy Dual Shadows**: Ambient dark-green drop shadows paired with crisp pure white rim highlights (`#ffffff` and `rgba(10, 88, 48, 0.08)`).
- **Tactile Sculpted Surfaces**: Soft convex cards (`--bg-convex`), recessed inset wells (`--bg-well`, `--nm-inset-sm`), and pill-shaped interactive elements.
- **Strict Color Harmony**: Pure White surfaces with high-contrast Dark Green typography (`#064e3b`, `#0a5830`, `#047857`, `#022c22`).
- **Partner Logo Integrity**: Official partner logos and mascot graphics (Bamboo Coder, AI Ready Engineer, Owl Coder, Myna, Red Hat, Cisco, Pega, Automation Anywhere, ServiceNow, Mile2, Anthropic Claude, OpenAI, GitHub Copilot) are cleanly framed within soft neumorphic tiles.

---

## 🚀 Key Features

### 1. Six Interactive Presentation Slides
- **Slide 00 • Executive Proposal (Hero)**: Academic span, flagship tracks, and institution partnership metrics.
- **Slide 01 • Centre of Excellence (COE)**: Frontier AI lab featuring Anthropic Claude and OpenAI advanced engineering tracks.
- **Slide 02 • Academic MoUs**: Partner logos for Red Hat Academy, Cisco Networking Academy, Mile2, AWS Academy, Automation Anywhere, Splunk, MongoDB University, and Oracle Academy.
- **Slide 03 • 8-Semester Evolution Roadmap**: The flagship animated interactive timeline board and semester deep dives.
- **Slide 04 • Student Progress, Connected**: Animated pipelines connect learning platforms with placement, faculty, corporate, and parent stakeholders.
- **Slide 05 • Achievements**: A scrolling gallery of placement and student achievement images.

### 2. 95% Viewport Deep-Dive Popup Modal
Clicking on any semester on the timeline board expands a focused **95% Viewport Modal** with a frosted dark-green backdrop blur:
- **Sub-Slide 01 — Entrance Assessment Selection**: Diagnostic screening, logical aptitude battery, baseline typing velocity, and tiered cohort stratification.
- **Sub-Slide 02 — Monthly Coding Contests**: Progressive challenge sets (Easy → Hard), automated cloud code judging, and real-time leaderboards.
- **Sub-Slide 03 — Monthly Typing Contests**: Touch-typing ergonomics, weekly speed drills, WPM milestones (35 → 65+ WPM), and tournament leaderboards.
- **4-Pillar Deep-Dive Grid**: Comprehensive structured breakdown for each development area.

### 3. Stepped Multi-Track Timeline Conduit
The 8-Semester Roadmap slide features multi-track animated cables:
- **Track 1 • Owl Coder**: Continuous across all 8 Semesters.
- **Track 2 • Myna Platform**: Activates from Semester 2-1 (II-I) through IV-II.
- **Track 3 • J-Path Platform**: Activates from Semester 3-1 (III-I) through IV-II.
- **Track 4 • mPod Platform**: Activates from Semester 3-1 (III-I) through IV-II.

### 4. Panoramic Timeline Architecture View
Switch at any time between cinematic slide-by-slide mode and a full panoramic canvas with year-by-year filtering.

### 5. Presenter Talking Notes Drawer
Built-in presenter helper drawer with slide-by-slide speaking prompts, time management tips, and topic overviews.

### 6. Synthesized Tactile Sound FX
Lightweight zero-dependency sound synthesizer built with the Web Audio API providing realistic tactile clicks and success chimes.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visual FX**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Audio**: Web Audio API (Synthesized clicks & chimes)
- **Styling**: Vanilla CSS Neumorphic Design System (zero heavy framework overhead)
- **Typography**: Outfit, Plus Jakarta Sans, JetBrains Mono (via Google Fonts)

---

## 📁 Project Structure

```
Thub-New-Timeline/
├── public/
│   ├── assets/                 # Partner logos, mascots, badges & graphics
│   ├── favicon.svg             # App favicon
│   └── icons.svg
├── src/
│   ├── assets/                 # App bundle assets
│   ├── components/
│   │   ├── HeaderNav.jsx       # Top navigation bar, indicators & controls
│   │   ├── TimelineScrubber.jsx# Bottom scrubber & slide advancement controls
│   │   ├── PanoramaView.jsx    # Complete bird's-eye canvas view
│   │   ├── PresenterNotesModal.jsx # Presenter speaking notes drawer
│   │   └── slides/
│   │       ├── HeroSlide.jsx   # Slide 00: Executive Proposal
│   │       ├── CoeSlide.jsx    # Slide 01: Centre of Excellence (Claude & OpenAI)
│   │       ├── MousSlide.jsx   # Slide 02: Academic MoUs (7 Global Partners)
│   │       ├── TimelineSemestersSlide.jsx # Slide 03: 8-Semester Evolution Roadmap & 95% Modal
│   │       ├── OverviewSlide.jsx # Slide 04: Master Blueprint Arc
│   │       ├── PhaseSlide.jsx  # Slides 05–08: Phase 01–04 Deep Dives
│   │       ├── EcosystemSlide.jsx # Slide 09: Skilling Matrix
│   │       └── OutcomesSlide.jsx  # Slide 10: Transformational Outcomes & ROI
│   ├── data/
│   │   ├── timelineData.js     # Master proposal slide contents & curriculum
│   │   └── semesterDetailsData.js # Detailed semester sub-slide & contest data
│   ├── utils/
│   │   └── soundEffects.js     # Web Audio API tactile sound generator
│   ├── App.jsx                 # Master application controller & slide orchestration
│   ├── index.css               # Neumorphic CSS tokens, layout & design system
│   └── main.jsx                # Application root entry point
├── index.html                  # HTML entry point with Google Fonts
├── package.json                # Project dependencies & scripts
├── vite.config.js              # Vite configuration
└── README.md                   # Project documentation
```

---

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- `npm` or `pnpm` or `yarn`

### Installation
Clone the repository and install dependencies:
```bash
git clone <your-github-repo-url>
cd Thub-New-Timeline
npm install
```

### Running Locally
Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Building for Production
Create an optimized production bundle:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 📤 Pushing to GitHub

To push this repository to your GitHub account:

```bash
# 1. Initialize git (if not already initialized) and verify status
git status

# 2. Stage all files
git add .

# 3. Create initial commit
git commit -m "feat: complete soft neumorphic white and dark green presentation roadmap"

# 4. Set branch to main
git branch -M main

# 5. Link your GitHub remote repository
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY_NAME>.git

# 6. Push to GitHub
git push -u origin main
```

---

## 📄 License & Credits

Developed for **Technical Hub** in collaboration with academic partner institutions. All brand logos and partner trademarks belong to their respective organizations.
