const BASE_SYSTEM_PROMPT = `You are a communication tone analyst. Your job is to analyze the tone of messages and help people communicate more effectively.

Analyze the given message and identify which tone categories apply. Return ONLY valid JSON — no markdown, no explanation outside the JSON.

Tone categories (use ONLY these exact labels):
- "Passive-aggressive"
- "Rude or blunt"
- "Overly formal"
- "Unclear or confusing"
- "Needy or desperate"
- "Fine — no issues"

Rules:
1. If the message is genuinely fine, return only "Fine — no issues" with a brief reason why it works.
2. If there are issues, do NOT include "Fine — no issues" — only return the problem tones.
3. For each problem tone: provide a 1-sentence reason (specific, not generic) and a complete rewrite of the full message that sounds professional, warm, and clear.
4. The rewrite should be a full replacement of the original message — not a fragment.
5. Be precise. Don't flag issues that aren't clearly there.

Response format:
{
  "tones": [
    {
      "label": "Passive-aggressive",
      "reason": "One specific sentence explaining exactly why this reads as passive-aggressive.",
      "rewrite": "The complete rewritten message here."
    }
  ]
}`;

// Verify Pro subscription status via Razorpay
async function isProUser(subscriptionId) {
  if (!subscriptionId) return false;
  try {
    const auth = 'Basic ' + Buffer.from(
      `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
    ).toString('base64');
    const r = await fetch(`https://api.razorpay.com/v1/subscriptions/${subscriptionId}`, {
      headers: { 'Authorization': auth },
    });
    const data = await r.json();
    return ['active', 'authenticated'].includes(data.status);
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, audience, subscriptionId } = req.body || {};
  if (!message?.trim()) return res.status(400).json({ error: 'Message is required.' });

  // Enforce free-tier character limit (1,000 chars)
  const FREE_LIMIT = 1000;
  const PRO_LIMIT  = 8000;

  if (message.length > FREE_LIMIT) {
    const pro = await isProUser(subscriptionId);
    if (!pro) {
      return res.status(402).json({
        error: `Free tier is limited to ${FREE_LIMIT.toLocaleString()} characters. Upgrade to Pro for up to 8,000 characters.`,
      });
    }
  }

  if (message.length > PRO_LIMIT) {
    return res.status(400).json({ error: 'Message too long (max 8,000 characters).' });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) return res.status(500).json({ error: 'Server configuration error.' });

  // Build system prompt — inject audience context for Pro users
  let systemPrompt = BASE_SYSTEM_PROMPT;
  if (audience?.trim()) {
    systemPrompt += `\n\nIMPORTANT: The message is being sent to ${audience.trim()}. Tailor all rewrites to be appropriate for that specific relationship and context.`;
  }

  try {
    const apiRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: `Analyze this message:\n\n${message.trim()}` },
        ],
        max_tokens: 2048,
        temperature: 0.3,
      }),
    });

    if (!apiRes.ok) {
      const err = await apiRes.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Groq API error ${apiRes.status}`);
    }

    const data    = await apiRes.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error('Empty response from AI. Please try again.');
    return res.status(200).json({ content });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Analysis failed. Please try again.' });
  }
}
