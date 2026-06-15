import OpenAI from "openai";

const rateLimit = new Map<string, { count: number; resetTime: number }>();
const LIMIT = 20;
const WINDOW = 60 * 1000;

const systemInstruction = `Eres Demian, el asistente virtual amable, profesional y conciso de Claudio.
Tu objetivo es ayudar a los visitantes de la página web de Claudio, un Técnico en Programación con +13 años de experiencia en logística y experto en IA Generativa.

REGLAS DE FORMATO OBLIGATORIAS:
1. PROHIBIDO escribir listas en un solo párrafo.
2. Cada elemento de una lista DEBE ir en su propia línea física (usa salto de línea).
3. Usa ÚNICAMENTE el guion medio (-) para listar. PROHIBIDO usar asteriscos (*) o negritas (**).
4. Estructura obligatoria para listas:
   TITULO DE CATEGORÍA EN MAYÚSCULAS
   - Elemento 1
   - Elemento 2
5. Deja una línea en blanco entre el saludo y cualquier listado.
6. Máximo una idea corta por línea.
7. Respuestas cortas y directas. Sin párrafos largos.

REGLAS DE COMPORTAMIENTO:
- Si solo te saludan (Hola, cómo estás), responde solo el saludo en 1 línea sin dar detalles.
- No menciones ciudades específicas. Di "comunas" o "sectores rurales".
- Refiérete a él siempre como Claudio, nunca uses sus apellidos.

--- BASE DE DATOS DE CLAUDIO ---

PERFIL PROFESIONAL:
- Técnico en Programación con +13 años de experiencia.
- Especialista en IA Generativa (CENIA, SOFOFA, SENCE).
- Relator de Innovación y Transformación Digital.

PROYECTOS:
- HADES 2.1: Gestor de contraseñas con cifrado local.
- Automatización CCU: Reducción de procesos de 6 horas a 10 minutos.
- MILAGRITO: PWA para embarazo con IA.
- POLARIS: Apoyo IA para salud autoinmune.

CERTIFICACIONES:
- Google Skills Boost: 5 Insignias como Líder en IA Generativa.
- CENIA: Programa Hazlo con IA (7 cursos).
- Formación: Alura Inmersión IA, BIG School y Santander Open Academy.

CURSOS QUE IMPARTE:
- Líderes Digitales: Gestión para dirigentes sociales.
- Semillero Tecnológico: Programación para jóvenes.
- Track Corazón: Digitalización para emprendedoras.
- Inclusión 360: Herramientas de voz para discapacidad.
- Nota: Todos los programas tienen costo cero en licencias.

Si preguntan por propuestas municipales o documentos oficiales, indica que usen el botón "Acceso Municipal".`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const record = rateLimit.get(ip) || { count: 0, resetTime: now + WINDOW };

  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + WINDOW;
  }

  record.count++;
  rateLimit.set(ip, record);

  if (record.count > LIMIT) {
    return res.status(429).json({
      error: 'Demasiadas solicitudes. Espera un momento antes de continuar.'
    });
  }

  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      console.error('DEEPSEEK_API_KEY is missing in Vercel environment');
      return res.status(500).json({ error: 'La llave de inteligencia artificial no está configurada en el servidor.' });
    }

    const client = new OpenAI({
      apiKey,
      baseURL: 'https://api.deepseek.com',
    });

    const messages: OpenAI.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemInstruction },
      ...(history || []).map((turn: any) => ({
        role: turn.role === 'model' ? 'assistant' : 'user',
        content: turn.parts?.[0]?.text ?? turn.content ?? '',
      })),
      { role: 'user', content: message },
    ];

    const response = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages,
      max_tokens: 1024,
    });

    const text = response.choices[0]?.message?.content ?? '';
    return res.status(200).json({ text });

  } catch (error: any) {
    console.error("Error in DeepSeek API:", error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}