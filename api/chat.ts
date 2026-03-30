import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  // Solo permitir peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // En Vercel, esta variable se lee de forma segura desde el entorno del servidor
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('GEMINI_API_KEY is missing in Vercel environment');
      return res.status(500).json({ error: 'La llave de inteligencia artificial no está configurada en el servidor.' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `Eres Demian, el asistente virtual amable, profesional y conciso de Claudio.
Claudio es un profesional de Pillanlelbún, La Araucanía, Chile.
Tu objetivo es ayudar a los visitantes de la página web de Claudio.
Regla importante: Refiérete a él SIEMPRE simplemente como "Claudio", nunca uses sus apellidos.
Si te preguntan por el currículum detallado de Claudio, sus talleres, o información específica para municipalidades o liceos, debes invitar al usuario a solicitar acceso mediante el botón "Acceso Municipal" en la página principal, o a usar el formulario de contacto para comunicarse directamente con él.
Mantén tus respuestas breves y directas. No inventes información sobre Claudio que no se te haya proporcionado.`;

    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      history: history || [],
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const response = await chat.sendMessage({ message });

    return res.status(200).json({ text: response.text });
  } catch (error: any) {
    console.error("Error in Gemini API:", error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
