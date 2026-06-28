export interface CourseData {
  id: string;
  slug: string;
  titulo: string;
  subtitulo: string;
  imagen: string;
  fecha: string;
  duracion: string;
  participantes: string;
  ubicacion: string;
  descripcion: string[];
  contenidos: string[];
  testimonio?: string;
  testimonioAutor?: string;
}

export const coursesData: Record<string, CourseData> = {
  emprendedores: {
    id: 'emprendedores',
    slug: 'emprendedores',
    titulo: 'Taller IA Emprendedores Pillanlelbún',
    subtitulo: 'Educación IA para emprendimiento local',
    imagen: 'https://res.cloudinary.com/dyejf2wmt/image/upload/v1/talleres/emprendedores-hero.jpg',
    fecha: 'Por confirmar',
    duracion: '4 horas',
    participantes: 'Cupos limitados',
    ubicacion: 'Pillanlelbún, Lautaro, La Araucanía',
    descripcion: [
      'Un taller práctico diseñado para emprendedores y pequeños empresarios de la comunidad de Pillanlelbún que quieren incorporar herramientas de Inteligencia Artificial en su día a día.',
      'Aprenderás a usar IA generativa para mejorar la comunicación con tus clientes, crear contenido para redes sociales, automatizar tareas repetitivas y tomar mejores decisiones para tu negocio.',
      'Sin tecnicismos innecesarios. Todo con ejemplos reales, adaptados al contexto rural y local de nuestra comunidad.',
    ],
    contenidos: [
      'Introducción a la Inteligencia Artificial aplicada al emprendimiento',
      'Herramientas gratuitas de IA para crear contenido visual y escrito',
      'Cómo usar ChatGPT y Gemini para responder clientes y redactar mensajes',
      'Automatización básica con Google Workspace',
      'IA para gestión de inventario y ventas simples',
      'Casos reales de emprendedores que ya usan IA en Chile',
    ],
    testimonio: 'Nunca pensé que podía usar inteligencia artificial en mi negocio. Ahora ahorro horas cada semana.',
    testimonioAutor: 'Participante del taller',
  },
  mujeres: {
    id: 'mujeres',
    slug: 'mujeres',
    titulo: 'Taller IAgen Mujeres Pillanlelbún',
    subtitulo: 'Tecnología con propósito para mujeres de nuestra comunidad',
    imagen: 'https://res.cloudinary.com/dyejf2wmt/image/upload/v1/talleres/mujeres-hero.jpg',
    fecha: 'Por confirmar',
    duracion: '4 horas',
    participantes: 'Cupos limitados',
    ubicacion: 'Pillanlelbún, Lautaro, La Araucanía',
    descripcion: [
      'Un espacio seguro, inclusivo y práctico donde mujeres de la comunidad de Pillanlelbún aprenden a usar la Inteligencia Artificial como herramienta para su vida cotidiana, su emprendimiento o su desarrollo personal.',
      'Diseñado especialmente para mujeres que quieren dar sus primeros pasos en tecnología sin sentirse abrumadas. No necesitas saber nada de computadores para participar.',
      'Juntas exploraremos cómo la IA puede ayudarnos a ahorrar tiempo, comunicarnos mejor y abrir nuevas oportunidades.',
    ],
    contenidos: [
      'Qué es la Inteligencia Artificial y cómo nos afecta en el día a día',
      'Herramientas de IA gratuitas para organizar el hogar y el trabajo',
      'Cómo crear contenido para redes sociales con ayuda de IA',
      'IA para aprender, estudiar y capacitarse desde casa',
      'Seguridad digital básica para mujeres',
      'Casos de mujeres emprendedoras que usan IA en Chile',
    ],
    testimonio: 'Me di cuenta que la tecnología no es solo para los jóvenes. Ahora me siento más segura usando el celular para mi negocio.',
    testimonioAutor: 'Participante del taller',
  },
};
