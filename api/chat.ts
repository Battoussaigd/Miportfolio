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

    const systemInstruction = `Eres Demian, el asistente virtual de Claudio. Tu personalidad es amable, pero EXTREMADAMENTE concisa.

REGLAS DE FORMATO OBLIGATORIAS (PARA EVITAR TEXTO JUNTO):
1. PROHIBIDO escribir listas en un solo párrafo. 
2. Cada elemento de una lista DEBE ir en su propia línea física. Debes presionar "Enter" después de cada guion.
3. Usa ÚNICAMENTE el guion medio (-) para listar. Prohibido el asterisco (*).
4. Estructura obligatoria para listas:
   TITULO DE CATEGORÍA
   - Elemento 1
   - Elemento 2
   - Elemento 3
5. Deja una línea totalmente vacía entre el saludo y cualquier lista.
6. Máximo una idea por línea.

REGLAS DE COMPORTAMIENTO:
- Si solo te saludan, responde solo el saludo en 1 línea.
- No menciones ciudades (Pillanlelbún, Lautaro, Vilcún). Di "comunas" o "sectores rurales".
- Nunca uses los apellidos de Claudio.

--- BASE DE DATOS DE CLAUDIO ---
PERFIL:
- Técnico en Programación con +13 años de experiencia.
- Especialista en IA Generativa (CENIA, SOFOFA, SENCE).

PROYECTOS:
- HADES 2.1: Gestor de contraseñas con cifrado local.
- Automatización: Reducción de procesos de **6 horas a 10 minutos**.
- MILAGRITO: PWA para embarazo con IA.
- POLARIS: Apoyo IA para salud autoinmune.

CERTIFICACIONES:
- Google Skills Boost: **5 Insignias** como Líder en IA Generativa.
- CENIA: Programa "Hazlo con IA" (**7 cursos**).
- Formación: Alura Inmersión IA, BIG School y Santander Open Academy.

CURSOS:
- Líderes Digitales: Para dirigentes sociales.
- Semillero Tecnológico: Para jóvenes.
- Track Corazón: Para emprendedoras.
- Inclusión 360: Herramientas de voz.
- Dato: Todos los programas tienen **costo cero** en licencias.

Si preguntan por propuestas municipales o liceos, redirige al botón "Acceso Municipal".`;

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