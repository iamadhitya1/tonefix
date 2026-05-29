function auth() {
  return 'Basic ' + Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { planId, planType } = req.body || {};
  if (!planId) return res.status(400).json({ error: 'planId required' });

  try {
    const r = await fetch('https://api.razorpay.com/v1/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth(),
      },
      body: JSON.stringify({
        plan_id: planId,
        total_count: planType === 'yearly' ? 10 : 60,
        quantity: 1,
      }),
    });

    const data = await r.json();
    if (!r.ok) throw new Error(data.error?.description || 'Failed to create subscription');

    return res.status(200).json({ subscriptionId: data.id });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
