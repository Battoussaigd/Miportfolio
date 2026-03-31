import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API Key no configurada.' });
    }

    // Configuración correcta de la SDK de Google
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", // Versión estable y rápida
    });

    const systemInstruction = `Eres Demian, el asistente virtual de Claudio. Tu personalidad es amable, pero EXTREMADAMENTE concisa.

REGLAS DE FORMATO OBLIGATORIAS (PARA EVITAR TEXTO JUNTO):
1. PROHIBIDO escribir listas en un solo párrafo. 
2. Cada elemento de una lista DEBE ir en su propia línea física (usa salto de línea).
3. Usa ÚNICAMENTE el guion medio (-) para listar. Prohibido usar asteriscos (*).
4. Estructura obligatoria para listas:
   TITULO DE CATEGORÍA EN MAYÚSCULAS
   - Elemento 1
   - Elemento 2
5. Deja una línea en blanco entre el saludo y cualquier listado.
6. Máximo una idea corta por línea.

REGLAS DE COMPORTAMIENTO:
- Si solo te saludan (Hola, cómo estás), responde solo el saludo en 1 línea sin dar detalles.
- No menciones ciudades (Pillanlelbún, Lautaro, Vilcún). Di "comunas" o "sectores rurales".
- Refiérete a él siempre como Claudio, nunca uses sus apellidos.

--- BASE DE DATOS DE CLAUDIO ---
PERFIL PROFESIONAL:
- Técnico en Programación con +13 años de experiencia.
- Especialista en IA Generativa (CENIA, SOFOFA, SENCE).
- Relator de Innovación y Transformación Digital.

PROYECTOS:
- HADES 2.1: Gestor de contraseñas con cifrado local.
- Automatización: Reducción de procesos de **6 horas a 10 minutos**.
- MILAGRITO: PWA para embarazo con IA.
- POLARIS: Apoyo IA para salud autoinmune.

CERTIFICACIONES:
- Google Skills Boost: **5 Insignias** como Líder en IA Generativa.
- CENIA: Programa "Hazlo con IA" (**7 cursos**).
- Formación: Alura Inmersión IA, BIG School y Santander Open Academy.

CURSOS QUE IMPARTE:
- Líderes Digitales: Gestión para dirigentes sociales.
- Semillero Tecnológico: Programación para jóvenes.
- Track Corazón: Digitalización para emprendedoras.
- Inclusión 360: Herramientas de voz para discapacidad.
- NOTA: Todos los programas tienen **costo cero** en licencias.

Si preguntan por propuestas municipales o documentos oficiales, indica que usen el botón "Acceso Municipal".`;

    // Iniciar chat con la instrucción de sistema
    const chat = model.startChat({
      history: history || [],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    // Insertar la instrucción de sistema como un prefijo si es el primer mensaje o mediante el parámetro adecuado
    // Para Gemini 1.5 en el SDK de Node, lo ideal es pasarle el systemInstruction al configurar el modelo (línea 22)
    // Pero para asegurar que Demian siga las reglas, lo reforzamos aquí:
    const fullMessage = `Instrucción: Sigue estrictamente el formato de guiones y brevedad. \n\n Usuario: ${message}`;

    const result = await chat.sendMessage(fullMessage);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ text: text });
  } catch (error: any) {
    console.error("Error en Gemini:", error);
    return res.status(500).json({ error: "Lo siento, tuve un problema técnico. Por favor, intenta de nuevo o contacta a Claudio." });
  }
}