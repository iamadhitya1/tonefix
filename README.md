# ToneFix

**Fix your tone before you hit send.**

[![Live App](https://img.shields.io/badge/Live%20App-tonefix--rwl.vercel.app-39FF14?style=for-the-badge)](https://tonefix-rwl.vercel.app)
[![Free to Start](https://img.shields.io/badge/Free%20Tier-1%2C000%20chars-39FF14?style=for-the-badge)]()
[![Pro](https://img.shields.io/badge/Pro-₹199%2Fmo-gold?style=for-the-badge)]()
[![Part of Rewrite Labs](https://img.shields.io/badge/Part%20of-Rewrite%20Labs-0a0a0a?style=for-the-badge)](https://rewritelabs.vercel.app)

---

## What Is ToneFix?

ToneFix is an AI tone checker for engineers and professionals. Paste any email, Slack message, or text — it detects what's landing wrong and rewrites it for you.

A tone-deaf message costs you relationships, offers, and opportunities you never even find out you lost. ToneFix fixes that before you send.

🌐 **[tonefix-rwl.vercel.app](https://tonefix-rwl.vercel.app)**

---

## How It Works

1. Sign in with Google or email (via Clerk)
2. Paste your message
3. ToneFix detects the tone problem and explains exactly why it reads that way
4. Get a full rewrite — or on Pro, get rewrites tailored to your specific audience

---

## Tone Problems Detected

| Tone | What It Means |
|---|---|
| 🟠 Passive-aggressive | Backhanded phrasing, implied blame, sarcasm |
| 🔴 Rude or blunt | Abrasive, dismissive, or unnecessarily harsh |
| 🔵 Overly formal | Stiff bureaucratic language that creates distance |
| 🟡 Unclear or confusing | Ambiguous wording that could be misread badly |
| 🟣 Needy or desperate | Over-apologetic, anxious, or people-pleasing |
| 🟢 No issues | Professional, warm, and clear — nothing to fix |

---

## Free vs Pro

| Feature | Free | Pro |
|---|---|---|
| Character limit | 1,000 | 8,000 |
| Tone detection | ✅ | ✅ |
| Full rewrite | ✅ | ✅ |
| Audience-aware rewrites | ❌ | ✅ |
| Audience options | — | Boss · Client · HR · Colleague · Friend |
| Price | ₹0 | ₹199/month · ₹1,499/year |

Pro is billed via Razorpay. Cancel anytime. 7-day money-back guarantee.

---

## Audience-Aware Rewrites (Pro)

On Pro, you select who you're writing to — and ToneFix tailors the rewrite accordingly:

- **My manager / boss** — Concise, accountable, direct
- **A client / customer** — Warm, professional, solution-focused
- **A colleague / teammate** — Casual, collaborative, human
- **HR / recruiter** — Confident, clear, appropriate formality
- **A friend / peer** — Direct and honest without the corporate filter

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Vanilla HTML · CSS · JavaScript |
| Auth | Clerk (Google + email sign-in) |
| Payments | Razorpay (monthly + yearly subscriptions) |
| AI Inference | Groq API |
| Deployment | Vercel (serverless functions) |

### API Routes (Vercel Serverless)

| Route | Purpose |
|---|---|
| `POST /api/analyze` | Tone analysis + rewrite generation |
| `POST /api/create-subscription` | Creates a Razorpay subscription |
| `POST /api/verify-payment` | Verifies HMAC signature post-payment |
| `POST /api/verify-subscription` | Checks active subscription status |

---

## Privacy

- Messages are processed in real-time and **never stored or logged**
- Auth is handled by Clerk — only your name and email are stored
- Payment data is handled by Razorpay — we never touch your card details
- Subscription status is stored as a Razorpay subscription ID in your browser's localStorage

---

## Part of Rewrite Labs

ToneFix is one of six AI tools built under [Rewrite Labs](https://rewritelabs.vercel.app) — an AI tool studio for engineers and builders.

| Tool | What It Solves |
|---|---|
| [Unclause](https://unclause-rwl.vercel.app) | Understand contracts before you sign |
| [FocusVision](https://focusvision-rwl.vercel.app) | Real-time distraction detection |
| [Lectura.AI](https://lectura-rwl.vercel.app) | AI lecture transcription + study tools |
| [DataPulse](https://datapulse-rwl.vercel.app) | Upload data, get instant insights |
| [Rewrite OS](https://rewriteos-rwl.vercel.app) | Personal OS for engineers |

---

## The Builder

**M. Adhitya** — CS Engineer · AI Researcher · Published Author · Solo Founder

[![LinkedIn](https://img.shields.io/badge/LinkedIn-M.%20Adhitya-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/loveadhitya/)
[![Rewrite Labs](https://img.shields.io/badge/Studio-rewritelabs.vercel.app-39FF14?style=flat-square)](https://rewritelabs.vercel.app)

---

© 2026 Rewrite Labs · All rights reserved.
