# ⚡ Baddi Bhanu Prasad – Cybersecurity Portfolio

A stunning **cyberpunk-themed single-page portfolio** for a cybersecurity student.  
Built with plain HTML, Vanilla CSS, and Vanilla JS. Zero build step, deploy anywhere.

---

## 🚀 Run Locally

Since it's pure HTML/CSS/JS, any static server works:

### Option 1 – Node.js (included one-liner)
```bash
node -e "require('http').createServer((req,res)=>{const fs=require('fs'),path=require('path');let p=req.url==='/'?'/index.html':req.url;const fp=path.join(__dirname,p);fs.stat(fp,err=>{if(err){res.writeHead(404);res.end();}else{res.writeHead(200);fs.createReadStream(fp).pipe(res);}});}).listen(3000,()=>console.log('http://localhost:3000'))"
```
Then open **http://localhost:3000**

### Option 2 – Python
```bash
python -m http.server 3000
```

### Option 3 – VS Code Live Server  
Install the **Live Server** extension and click "Go Live".

---

## 🌐 Deploy (Free Hosting)

### GitHub Pages
1. Push this folder to a GitHub repo
2. Go to **Settings → Pages → Branch: main → Root**
3. Done — live at `https://yourusername.github.io/repo-name/`

### Netlify (Drag & Drop)
1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag the entire **Resume** folder onto the deploy zone
3. Instant live URL ✅

### Vercel
```bash
npx vercel --prod
```

---

## 📁 File Structure

```
Resume/
├── index.html                        ← Main HTML (single page)
├── css/
│   └── style.css                     ← All styles (Vanilla CSS)
├── js/
│   └── main.js                       ← Animations, typing, form
├── assets/
│   ├── video/
│   │   ├── hero-video.mp4            ← Hero section background (video 1)
│   │   └── about-video.mp4           ← About section background (video 2)
│   └── img/
│       ├── hero_bg_poster_*.png      ← Poster/fallback for hero video
│       ├── profile_avatar_*.png      ← Cyberpunk avatar image
│       ├── project_ransomware_*.png  ← Anti-Ransomware project thumbnail
│       ├── project_cyberguard_*.png  ← CyberGuard AI project thumbnail
│       ├── project_jarvis_*.png      ← JARVIS project thumbnail
│       ├── project_smarthome_*.png   ← SmartHome project thumbnail
│       └── favicon.svg               ← Site favicon
└── BADDI_BHANU_PRASAD_FlowCV_Resume_2026-11-03.pdf  ← Resume download
```

---

## 🎨 What Was Built

| Feature | Detail |
|---|---|
| **Theme** | Cyberpunk – near-black navy, electric blue (#1E6BFF), neon red (#FF2A2A) |
| **Fonts** | Orbitron (headings), Rajdhani (sub-headings), Inter (body), JetBrains Mono (code/labels) |
| **Animations** | GSAP hero entrance, scroll-triggered reveal, glitch text, typing effect, count-up stats |
| **Loader** | Terminal-style boot sequence with progress bar |
| **Cursor** | Neon blue cursor trail (desktop only, respects reduced-motion) |
| **Videos** | Hero background = `gemini_generated_video_68e0d33d.mp4` (`assets/video/about-video.mp4`); About background = `gemini_generated_video_68e0d33d.mp4` (`assets/video/about-video.mp4`) |
| **Generated images** | 6 AI-generated: hero poster, profile avatar, 4 project thumbnails |
| **Contact form** | Formspree + mailto fallback |
| **SEO** | Full meta tags, Open Graph, semantic HTML, aria labels |
| **Accessibility** | ARIA roles, labels, skip links, reduced-motion support, 95+ target |
| **Responsive** | Mobile-first, tested at 375 / 768 / 1440px breakpoints |

---

## 🔧 Customisation

| What to change | Where |
|---|---|
| **Formspree endpoint** | In `index.html`, find `form action="https://formspree.io/f/..."` — replace with your Formspree ID |
| **Profile photo** | Replace `assets/img/profile_avatar_*.png` with your real photo; update `src` in `index.html` |
| **New project** | Copy a `.project-card` block in `index.html`, update text, image, and GitHub link |
| **Colour palette** | Edit CSS variables at the top of `css/style.css` (`:root { ... }`) |
| **Skills** | Add/remove `.chip` elements in the Skills section |
| **Certificates** | Clone a `.cert-card` block in `index.html` |

---

## 📧 Contact Form Setup (Formspree)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form → copy the form endpoint (e.g. `https://formspree.io/f/abcdefgh`)
3. Replace the `action` attribute on `#contact-form` in `index.html`

> Without Formspree, the form automatically falls back to opening your mail client with a `mailto:` link.

---

## 🏆 Sections

- **Home** – Full-screen video hero, glitch name animation, typing roles, CTA buttons
- **About** – Video background, avatar with glow, stats counters, platform badges
- **Skills** – 4 categories with animated chips (Offensive, Programming, Defense, IoT)
- **Projects** – 4 project cards with hover effects and GitHub links
- **Achievements** – Clickable photo cards linking to LinkedIn posts (NSRIT, VIET x2, Lendi + 2 more)
- **Education** – Animated timeline (B.Tech VIET + Diploma TPC)
- **Certificates** – Cisco Ethical Hacker + Networking Basics
- **Contact** – Contact info, working form with validation, resume download

---

Built with ♥ and lots of neon lights.
