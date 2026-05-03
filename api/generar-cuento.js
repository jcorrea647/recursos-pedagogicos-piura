export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method === "GET") return res.status(200).json({ status: "ok" });
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { area, competencia, capacidad, desempeno, edad, nivel, tema } = req.body || {};
    const temaFinal = tema || `${area} en Piura`;

    const prompt = `Responde SOLO con un objeto JSON valido. Sin texto antes ni despues. Sin markdown.

Genera contenido de cuento ilustrado para ninos de ${edad} anos sobre: "${temaFinal}"
Area: ${area} | Competencia: ${competencia} | Capacidad: ${capacidad}
Desempeno: ${desempeno} | Nivel: ${nivel}
Contexto: Piura Peru. Usa rio Piura, algarrobos, chiroque, mango, familia piurana.

JSON exacto:
{
  "titulo": "titulo creativo del cuento",
  "personaje": "nombre del personaje principal piurano",
  "valor": "valor pedagogico en una oracion",
  "paginas": [
    { "titulo": "titulo p1", "texto": "2-3 oraciones simples para ${edad} anos", "consigna": "pregunta corta para el nino", "dialogo": "frase corta del personaje max 10 palabras", "escena": "descripcion escena para imagen: personaje + accion + lugar piurano" },
    { "titulo": "titulo p2", "texto": "...", "consigna": "...", "dialogo": "...", "escena": "..." },
    { "titulo": "titulo p3", "texto": "...", "consigna": "...", "dialogo": "...", "escena": "..." },
    { "titulo": "titulo p4", "texto": "...", "consigna": "...", "dialogo": "...", "escena": "..." },
    { "titulo": "titulo p5", "texto": "...", "consigna": "...", "dialogo": "...", "escena": "..." },
    { "titulo": "titulo p6", "texto": "...", "consigna": "...", "dialogo": "...", "escena": "..." }
  ],
  "preguntas": ["pregunta 1?
