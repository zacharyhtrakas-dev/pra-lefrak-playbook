export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({error: 'Method not allowed'});

  // Enforce max_tokens cap to prevent timeouts
  const body = {...req.body};
  if (!body.max_tokens || body.max_tokens > 1500) body.max_tokens = 1500;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55000); // 55s hard abort

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });
    clearTimeout(timeout);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch(e) {
    clearTimeout(timeout);
    if (e.name === 'AbortError') {
      return res.status(504).json({error: 'Request timed out — try again or reduce content length'});
    }
    return res.status(500).json({error: e.message});
  }
}
