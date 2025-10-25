// src/services/geminiService.ts
// Aman untuk React & GitHub (pakai REST API Gemini, bukan SDK Node)

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// 🔹 Fungsi untuk menerjemahkan teks sinopsis
export async function translateText(text: string): Promise<string> {
  if (!API_KEY) {
    return "❌ API key belum diatur di file .env";
  }

  if (!text) return "Tidak ada sinopsis.";

  try {
    const prompt = `Terjemahkan teks berikut ke Bahasa Indonesia. Gunakan gaya penulisan yang menarik seperti sinopsis anime profesional. Jangan tambahkan kalimat tambahan seperti 'berikut terjemahannya'. 
Teks:
"""
${text}
"""`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Gagal menerjemahkan teks.";
  } catch (err) {
    console.error("Error translateText:", err);
    return "❌ Terjadi kesalahan saat menerjemahkan.";
  }
}

// 🔹 (Opsional) Fungsi untuk menerjemahkan subtitle
export async function translateSubtitles(vttContent: string): Promise<string> {
  if (!API_KEY) {
    return "❌ API key belum diatur di file .env";
  }

  if (!vttContent) return "";

  try {
    const prompt = `Translate this WebVTT subtitle from English to Indonesian.
Rules:
1. Only translate dialogue lines.
2. Do NOT change timestamps or formatting.
3. Do NOT add explanations.
Original content:
"""
${vttContent}
"""`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const translated = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    return translated;
  } catch (err) {
    console.error("Error translateSubtitles:", err);
    return vttContent;
  }
}