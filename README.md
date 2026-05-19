# ToneFix

> **Know how your words land.**

ToneFix is a zero-install, single-file web app that reads your message the way a stranger would — and tells you exactly what tone is landing wrong, and how to fix it.

Paste an email, Slack message, WhatsApp text, or any written communication. ToneFix sends it to the Claude API, identifies problem tones, and gives you a complete rewrite for each one.

---

## Quick Start

No installation, no npm, no build step needed.

1. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
2. Enter your [Anthropic API key](https://console.anthropic.com/settings/keys) in the bar at the top.
3. Paste your message and click **Analyze tone →** (or press `Ctrl+Enter` / `Cmd+Enter`).

That's it.

---

## How to Get an API Key

1. Go to [console.anthropic.com](https://console.anthropic.com) and create a free account.
2. Navigate to **Settings → API Keys**.
3. Click **Create Key**, copy it, and paste it into ToneFix.

Your key is only used in that browser tab and is never sent anywhere except directly to Anthropic's API.

---

## Tone Categories Detected

| Badge | What it means |
|---|---|
| 🟠 **Passive-aggressive** | Backhanded phrasing, sarcasm, or implied blame |
| 🔴 **Rude or blunt** | Abrasive, dismissive, or harsh wording |
| 🔵 **Overly formal** | Stiff, bureaucratic language that creates distance |
| 🟡 **Unclear or confusing** | Ambiguous wording that could be misread |
| 🟣 **Needy or desperate** | Over-apologetic, anxious, or people-pleasing framing |
| 🟢 **Fine — no issues** | Your message reads as professional, warm, and clear |

For each problem tone, ToneFix explains *exactly* why it reads that way and gives you a full replacement rewrite you can copy with one click.

---

## How It Works

ToneFix calls the [Anthropic Messages API](https://docs.anthropic.com/en/api/messages) directly from the browser using the `anthropic-dangerous-direct-browser-access` header (intended for personal/local tools like this). The model used is **claude-sonnet-4-20250514**.

The system prompt instructs Claude to return structured JSON containing tone labels, one-sentence reasons, and full rewrites. ToneFix then renders those results as cards.

No server. No backend. No database. Nothing is stored.

---

## Privacy

- Your API key stays in the browser tab only — it is never stored in `localStorage`, cookies, or sent anywhere except Anthropic's API endpoint.
- Your messages are sent to Anthropic for analysis per their [usage policy](https://www.anthropic.com/legal/usage-policy), but ToneFix itself does not log, store, or transmit your text to any other party.
- Closing or refreshing the tab clears everything.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI | Vanilla HTML + CSS + JavaScript (ES2020+) |
| Fonts | [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) + [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) via Google Fonts |
| AI | [Anthropic Claude API](https://docs.anthropic.com) — `claude-sonnet-4-20250514` |
| Build | None — zero dependencies, zero tooling |

---

## Do I Need a `dist` Folder or npm?

**No.** ToneFix is a single self-contained HTML file with no dependencies, no bundler, and no build process. `index.html` is already the final production artifact.

- ✅ Open directly in a browser: `file:///C:/Users/adhit/tonefix/index.html`
- ✅ Serve with any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages)
- ✅ Drop it on any web server as-is

---

## Deployment Options

### Local (already works)
Just open `index.html` in your browser.

### GitHub Pages
```bash
git init
git add index.html README.md
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/tonefix.git
git push -u origin main
# Then enable Pages in repo Settings → Pages → Deploy from branch: main
```

### Netlify / Vercel (drag-and-drop)
Drag the `tonefix` folder onto [netlify.com/drop](https://netlify.com/drop) or [vercel.com/new](https://vercel.com/new). Done.

### Simple local server (optional, for testing)
```bash
# Python 3
python -m http.server 8080
# Then open http://localhost:8080
```

---

## Browser Compatibility

Works in all evergreen browsers that support the Fetch API and `navigator.clipboard`:

- Chrome / Edge 80+
- Firefox 75+
- Safari 13.1+

---

## License

MIT — do whatever you want with it.
