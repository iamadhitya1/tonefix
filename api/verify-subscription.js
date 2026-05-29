function auth() {
  return 'Basic ' + Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { subscriptionId } = req.body || {};
  if (!subscriptionId) return res.status(400).json({ error: 'subscriptionId required' });

  try {
    const r = await fetch(`https://api.razorpay.com/v1/subscriptions/${subscriptionId}`, {
      headers: { 'Authorization': auth() },
    });
    const data = await r.json();
    const active = ['active', 'authenticated'].includes(data.status);
    return res.status(200).json({ active });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
