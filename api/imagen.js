export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { prompt, width = 768, height = 768, steps = 4 } = req.body;
    if (!prompt) return res.status(400).json({ error: "prompt requerido" });

    const response = await fetch("https://api.together.xyz/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.TOGETHER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "black-forest-labs/FLUX.1-schnell-Free",
        prompt,
        width,
        height,
        steps,
        n: 1,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return res.status(response.status).json({ error: "Together AI error", detail: err });
    }

    const data = await response.json();
    const item = data.data?.[0];

    return res.status(200).json({
      url: item?.url || null,
      b64: item?.b64_json || null,
      success: true,
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
