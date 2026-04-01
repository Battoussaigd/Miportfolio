/**
 * PrivateView — Landing personalizada para autoridades municipales y educativas
 * Lautaro Digital 2026 · Claudio González Díaz
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Download, ChevronDown, GraduationCap, Zap, Heart, Users, BookOpen, Star, Clock, CheckCircle } from 'lucide-react';

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface DocItem { name: string; url: string; }
interface PrivateData {
  authorityName: string;
  commune: string;
  type?: 'municipio' | 'liceo';
  docs?: DocItem[];
  painPointText?: string;
}

// ─── Datos reales de los tracks ───────────────────────────────────────────────
const TRACKS = {
  escolar: {
    id: 'escolar',
    emoji: '🎓',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    bgGlow: 'rgba(6,182,212,0.15)',
    borderColor: 'rgba(6,182,212,0.3)',
    icon: GraduationCap,
    title: 'Track Escolar',
    subtitle: 'Jóvenes Creadores de Tecnología',
    audience: 'Jóvenes de 10 a 17 años',
    description: 'Los jóvenes de la comuna dejan de ser consumidores de tecnología para convertirse en sus creadores. Cada participante diseña, programa y publica su propia aplicación web con inteligencia artificial integrada.',
    niveles: [
      {
        nombre: 'Nivel I — Fundamentos',
        duracion: '12 sesiones · 75 min c/u',
        requisito: 'Sin requisitos previos',
        descripcion: 'Desarrollo web con HTML/CSS/JS y creación de un chatbot inteligente con Gemini AI. El proyecto final es una PWA escolar real publicada en línea.',
        logros: [
          'Crean su primera aplicación web desde cero',
          'Integran un chatbot con IA real',
          'Publican su app accesible desde cualquier celular',
          'Presentan en Gala de Innovación ante la comunidad',
        ],
        tecnologias: ['HTML · CSS · JavaScript', 'Gemini AI Studio', 'Firebase', 'PWA'],
      },
      {
        nombre: 'Nivel II — Avanzado',
        duracion: '13 sesiones · 75 min c/u',
        requisito: 'Requiere Nivel I aprobado',
        descripcion: 'PWA de Emprendimiento Juvenil con backend en la nube y agente de IA vía protocolo MCP que analiza datos de ventas e inventario en tiempo real.',
        logros: [
          'Construyen un sistema completo con base de datos en la nube',
          'Integran un agente de IA que analiza datos del negocio',
          'Implementan autenticación de usuarios y seguridad',
          'Detectan tendencias con IA para hacer crecer su negocio',
        ],
        tecnologias: ['Antigravity Framework', 'Tailwind CSS', 'Firebase', 'MCP · Gemini'],
      },
    ],
  },
  impulso: {
    id: 'impulso',
    emoji: '⚡',
    color: 'violet',
    gradient: 'from-violet-500 to-purple-600',
    bgGlow: 'rgba(139,92,246,0.15)',
    borderColor: 'rgba(139,92,246,0.3)',
    icon: Zap,
    title: 'Track Impulso',
    subtitle: 'Jóvenes y Adultos al Siguiente Nivel',
    audience: 'Adultos de 18 a 30 años',
    description: 'Diseñado para adultos jóvenes sin conocimientos previos de programación. En 12 sesiones, construyen una aplicación web real con IA integrada, lista para usar y publicada en línea.',
    niveles: [
      {
        nombre: 'Nivel I — Fundamentos',
        duracion: '12 sesiones · 75 min c/u',
        requisito: 'Sin requisitos previos',
        descripcion: 'Desarrollo web aplicado al contexto adulto. Cada participante crea una aplicación funcional con chatbot inteligente, adaptada a su ritmo de aprendizaje profesional.',
        logros: [
          'Construyen una app real sin conocimientos previos',
          'Integran un chatbot con IA generativa',
          'Publican su proyecto en línea al finalizar',
          'Adquieren habilidades transferibles al mercado laboral',
        ],
        tecnologias: ['HTML · CSS · JavaScript', 'Gemini AI Studio', 'Firebase', 'PWA'],
      },
      {
        nombre: 'Nivel II — PWA Maternal',
        duracion: '13 sesiones · 75 min c/u',
        requisito: 'Requiere Nivel I aprobado',
        descripcion: 'PWA Maternal Inteligente: app para acompañar a madres gestantes con seguimiento del embarazo, transcripción de citas médicas por voz y resúmenes automáticos con IA. Funciona sin señal permanente.',
        logros: [
          'Crean una solución tecnológica con impacto social real',
          'Implementan Speech-to-Text para transcribir citas médicas',
          'Diseñan para funcionar en zonas rurales sin señal estable',
          'Protegen datos de salud con reglas de seguridad en Firebase',
        ],
        tecnologias: ['Antigravity Framework', 'Speech-to-Text API', 'Firebase', 'MCP · Gemini'],
      },
    ],
  },
  corazon: {
    id: 'corazon',
    emoji: '💖',
    color: 'rose',
    gradient: 'from-rose-500 to-pink-600',
    bgGlow: 'rgba(244,63,94,0.15)',
    borderColor: 'rgba(244,63,94,0.3)',
    icon: Heart,
    title: 'Track Corazón',
    subtitle: 'Mujeres con Superpoderes Digitales',
    audience: 'Mujeres adultas desde 18 años',
    description: 'Un programa que nace de una realidad concreta: muchas mujeres nunca han tenido la oportunidad de aprender tecnología de forma guiada y sin presión. Track Corazón cambia eso.',
    niveles: [
      {
        nombre: 'Curso 0 — Fundamentos Digitales',
        duracion: '12 sesiones · 75 min c/u',
        requisito: 'Sin requisitos previos · Desde cero absoluto',
        descripcion: 'Desde encender el computador hasta enviar correos y navegar con seguridad. Cada sesión produce un resultado concreto. La participante sale con algo aprendido y practicado, no solo escuchado.',
        logros: [
          'Manejan el computador con confianza desde la primera sesión',
          'Crean y organizan documentos y planillas',
          'Navegan de forma segura en internet',
          'Obtienen la base para acceder al Taller de Superpoderes',
        ],
        tecnologias: ['Windows', 'Microsoft Office', 'Google Drive', 'Navegación segura'],
      },
      {
        nombre: 'Nivel I — Taller de Superpoderes',
        duracion: '13 sesiones · 75 min c/u',
        requisito: 'Requiere Curso 0 aprobado',
        descripcion: 'La IA como aliada concreta para el hogar, la salud y el emprendimiento. Sin Google AI Studio — herramientas seleccionadas para entregar resultados reales desde la primera sesión.',
        logros: [
          'Crean su propio chatbot personal con Gemini Gems',
          'Diseñan material para su negocio con Canva e IA',
          'Instalan una app de compras en su celular',
          'Manejan un sistema de bodega digital completamente suyo',
        ],
        tecnologias: ['Gemini · Gemini Gems', 'Canva con IA', 'Nano Banana', 'Google Sheets · Apps Script'],
      },
    ],
  },
};

// ─── Tarjeta de Track con efecto 3D ──────────────────────────────────────────
function TrackCard({ track, index }: { track: typeof TRACKS.escolar; index: number }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);

  const colorMap: Record<string, string> = {
    cyan: 'text-cyan-400',
    violet: 'text-violet-400',
    rose: 'text-rose-400',
  };
  const bgMap: Record<string, string> = {
    cyan: 'bg-cyan-500/10 border-cyan-500/20',
    violet: 'bg-violet-500/10 border-violet-500/20',
    rose: 'bg-rose-500/10 border-rose-500/20',
  };
  const badgeMap: Record<string, string> = {
    cyan: 'bg-cyan-500/20 text-cyan-300',
    violet: 'bg-violet-500/20 text-violet-300',
    rose: 'bg-rose-500/20 text-rose-300',
  };
  const btnMap: Record<string, string> = {
    cyan: 'bg-cyan-500 hover:bg-cyan-400',
    violet: 'bg-violet-500 hover:bg-violet-400',
    rose: 'bg-rose-500 hover:bg-rose-400',
  };

  const Icon = track.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        animate={{
          rotateX: hovered ? -2 : 0,
          rotateY: hovered ? 2 : 0,
          scale: hovered ? 1.01 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900/80 backdrop-blur-xl"
        style={{
          boxShadow: hovered
            ? `0 20px 60px ${track.bgGlow}, 0 0 0 1px ${track.borderColor}`
            : '0 4px 24px rgba(0,0,0,0.4)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glow de fondo */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${track.bgGlow}, transparent 70%)`,
          }}
        />

        {/* Header del track */}
        <div className="p-8 pb-6 relative">
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl`}
              style={{ background: track.bgGlow, border: `1px solid ${track.borderColor}` }}
            >
              {track.emoji}
            </div>
            <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${badgeMap[track.color]}`}>
              {track.audience}
            </span>
          </div>

          <h3 className={`font-heading font-extrabold text-2xl mb-1 ${colorMap[track.color]}`}>
            {track.title}
          </h3>
          <p className="text-sm text-neutral-400 font-medium mb-4">{track.subtitle}</p>
          <p className="text-sm text-neutral-300 leading-relaxed">{track.description}</p>
        </div>

        {/* Niveles */}
        <div className="px-8 pb-8 space-y-3">
          {track.niveles.map((nivel, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                expanded === i
                  ? `${bgMap[track.color]} border-current`
                  : 'bg-white/5 border-white/10 hover:bg-white/8'
              }`}
            >
              {/* Cabecera del nivel */}
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className={`font-bold text-sm mb-0.5 ${expanded === i ? colorMap[track.color] : 'text-white'}`}>
                    {nivel.nombre}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {nivel.duracion}
                    </span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expanded === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`ml-3 shrink-0 ${expanded === i ? colorMap[track.color] : 'text-neutral-500'}`}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              {/* Contenido expandido */}
              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-4">
                      {/* Requisito */}
                      <div className={`text-xs px-3 py-1.5 rounded-full inline-block ${badgeMap[track.color]}`}>
                        {nivel.requisito}
                      </div>

                      {/* Descripción */}
                      <p className="text-sm text-neutral-300 leading-relaxed">{nivel.descripcion}</p>

                      {/* Logros */}
                      <div>
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Al finalizar</p>
                        <div className="space-y-1.5">
                          {nivel.logros.map((logro, j) => (
                            <div key={j} className="flex items-start gap-2 text-xs text-neutral-300">
                              <CheckCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${colorMap[track.color]}`} />
                              {logro}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tecnologías */}
                      <div>
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Tecnologías</p>
                        <div className="flex flex-wrap gap-1.5">
                          {nivel.tecnologias.map((tech, j) => (
                            <span key={j} className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function PrivateView({
  privateData,
  onClose,
  isDark,
}: {
  privateData: PrivateData;
  onClose: () => void;
  isDark: boolean;
}) {
  const isMunicipio = (privateData.type || 'municipio') === 'municipio';
  const tracksToShow = isMunicipio
    ? [TRACKS.escolar, TRACKS.impulso, TRACKS.corazon]
    : [TRACKS.escolar];

  const painPoint = privateData.painPointText ||
    (isMunicipio
      ? 'La tecnología ya no es el futuro — es el presente. Las comunas que actúan hoy forman a los profesionales, emprendedores y líderes que necesitan mañana.'
      : 'Preparar a los estudiantes para un mundo digital no es opcional. Es la responsabilidad más importante de la educación actual.');

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
      className="fixed inset-0 z-[150] overflow-y-auto bg-neutral-950"
    >
      {/* Fondo con ruido y gradiente */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-8 pb-24">

        {/* Botón volver */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={onClose}
          className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          Volver al portafolio
        </motion.button>

        {/* ── HERO ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16"
        >
          {/* Badge institución */}
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
              {isMunicipio ? '🏛️ Municipio' : '🎓 Establecimiento Educacional'} · {privateData.commune}
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-5xl md:text-7xl leading-none tracking-tight text-white mb-4">
            Bienvenido/a,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              {privateData.authorityName}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed mt-6">
            Esta es la propuesta de <strong className="text-white">Lautaro Digital 2026</strong> — 
            un programa de formación tecnológica diseñado para transformar{' '}
            <strong className="text-white">{privateData.commune}</strong> desde adentro.
          </p>
        </motion.div>

        {/* ── PAIN POINT ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16 relative"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-rose-500/10 border border-white/10 p-8 md:p-12 rounded-[2rem]">
            <div className="text-4xl mb-4">💡</div>
            <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
              "{painPoint}"
            </p>
          </div>
        </motion.div>

        {/* ── STATS RÁPIDOS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            { n: tracksToShow.length.toString(), l: 'Tracks disponibles' },
            { n: (tracksToShow.length * 2).toString(), l: 'Niveles en total' },
            { n: '75 min', l: 'Por sesión' },
            { n: '$0', l: 'En licencias de software' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center"
            >
              <div className="font-heading font-extrabold text-3xl text-cyan-400 mb-1">{stat.n}</div>
              <div className="text-xs text-neutral-400 uppercase tracking-wider">{stat.l}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── TRACKS ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-2">
            Programa formativo
          </div>
          <h2 className="font-heading font-extrabold text-4xl text-white mb-2">
            Los tracks
          </h2>
          <p className="text-neutral-400 text-lg mb-10">
            Haz clic en cada nivel para ver el contenido completo.
          </p>
        </motion.div>

        <div className={`grid gap-6 mb-16 ${
          tracksToShow.length === 1 ? 'max-w-2xl' :
          tracksToShow.length === 2 ? 'md:grid-cols-2' :
          'md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {tracksToShow.map((track, i) => (
            <TrackCard key={track.id} track={track} index={i} />
          ))}
        </div>

        {/* ── RESPALDO ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="grid md:grid-cols-3 gap-4 mb-16"
        >
          {[
            { emoji: '🏆', title: 'CCHIA', desc: 'Colaborador de la Cámara Chilena de Inteligencia Artificial' },
            { emoji: '📜', title: 'CENIA · SOFOFA · SENCE', desc: 'Certificaciones avaladas por organismos nacionales de IA' },
            { emoji: '⚙️', title: 'Infraestructura Google', desc: 'Herramientas profesionales gratuitas. Sin costos de licencias.' },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4">
              <div className="text-3xl shrink-0">{item.emoji}</div>
              <div>
                <div className="font-bold text-white text-sm mb-1">{item.title}</div>
                <div className="text-xs text-neutral-400 leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── DOCUMENTOS ── */}
        {(privateData.docs || []).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="text-center"
          >
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-2">
              Documentos
            </div>
            <h2 className="font-heading font-extrabold text-3xl text-white mb-3">
              Propuesta técnica
            </h2>
            <p className="text-neutral-400 mb-8">
              Documentación oficial preparada para {privateData.commune}.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {privateData.docs.map((d, i) => (
                <motion.a
                  key={i}
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 bg-cyan-400 text-neutral-950 px-8 py-4 rounded-full text-base font-bold shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-shadow"
                >
                  <Download className="w-5 h-5" />
                  {d.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── CONTACTO ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 text-center border-t border-white/10 pt-12"
        >
          <p className="text-neutral-400 text-sm mb-2">¿Tienes preguntas? Escríbeme directamente.</p>
          <p className="font-bold text-white">
            claudioegdiaz@gmail.com · <span className="text-cyan-400">+56 9 5105 6018</span>
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}
