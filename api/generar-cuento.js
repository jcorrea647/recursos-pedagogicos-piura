export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method === "GET") return res.status(200).json({ status: "ok" });
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { area, competencia, capacidad, desempeno, edad, nivel, tema, tipo } = req.body || {};
    const temaFinal = tema || `${area} en Piura`;
    const nivelDesc = nivel === "Inicial" ? "muy simple, visual, 1-2 pasos" : nivel === "Intermedio" ? "guiado, 2-3 pasos" : "desafiante, autonomo";

    const prompts = {
      rimas: `Genera 8 tarjetas de rimas imprimibles HTML completo sobre "${temaFinal}" para ${edad} anos nivel ${nivel}. Grid 2 columnas. Cada tarjeta: borde dashed, tijera, numero, SVG ilustracion rica, rima 4 versos en Fredoka One, espacio dibujar. Degradado pastel distinto cada tarjeta. Boton imprimir. Reflexion docente (class=no-print).`,
      lamina: `Genera 2 laminas para colorear HTML completo sobre "${temaFinal}" para ${edad} anos. SVG solo contornos neg
