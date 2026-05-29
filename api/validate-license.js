export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body || {};
  if (!email?.trim()) return res.status(400).json({ error: 'Email address is required.' });

  const PADDLE_API_KEY   = process.env.PADDLE_API_KEY;
  const PRODUCT_ID       = process.env.TONEFIX_PRODUCT_ID;

  if (!PADDLE_API_KEY || !PRODUCT_ID) {
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    const custRes = await fetch(
      `https://api.paddle.com/customers?email=${encodeURIComponent(email.trim())}`,
      { headers: { Authorization: `Bearer ${PADDLE_API_KEY}` } }
    );
    const custData = await custRes.json();
    if (!custData.data?.length) {
      return res.status(400).json({ error: 'No purchase found for this email address.' });
    }

    const customerId = custData.data[0].id;

    const subRes = await fetch(
      `https://api.paddle.com/subscriptions?customer_id=${customerId}&status=active`,
      { headers: { Authorization: `Bearer ${PADDLE_API_KEY}` } }
    );
    const subData = await subRes.json();

    const validSub = subData.data?.find(sub =>
      sub.items?.some(item => item.product?.id === PRODUCT_ID)
    );

    if (!validSub) {
      return res.status(400).json({ error: 'No active ToneFix Pro subscription found for this email.' });
    }

    return res.status(200).json({ valid: true, customerId });
  } catch {
    return res.status(500).json({ error: 'Verification failed. Please try again.' });
  }
}
