// src/services/geminiService.ts
// ✅ Versi khusus untuk Vite + React + GitHub Pages
// Gunakan REST API Gemini, bukan library server-side

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const translateText = async (text: string): Promise<string> => {
  if (!text) return "Tidak ada sinopsis.";
  if (!API_KEY) return "❌ API key belum diatur di file .env";

  try {
    const prompt = `Translate the following anime synopsis to Indonesian. 
Keep the tone natural, engaging, and anime-style. 
Don't add introductions like "Berikut terjemahannya". Just translate it directly.

Text:
${text}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const translated =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!translated) throw new Error("Tidak ada hasil dari Gemini.");
    return translated;
  } catch (error) {
    console.error("Error translating text with Gemini:", error);
    return "Gagal menerjemahkan