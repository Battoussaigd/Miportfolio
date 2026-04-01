/**
 * PrivateView — Landing personalizada para autoridades municipales y educativas
 * Digitales 2026 · Claudio González Díaz
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Download, ChevronDown, GraduationCap, Zap, Heart, Clock, CheckCircle, Shield, Award, Cpu } from 'lucide-react';

interface DocItem { name: string; url: string; }
interface PrivateData {
  authorityName: string;
  commune: string;
  type?: 'municipio' | 'liceo';
  docs?: DocItem[];
  painPointText?: string;
}

// ─── Datos de los tracks ──────────────────────────────────────────────────────
const TRACKS = {
  escolar: {
    id: 'escolar',
    emoji: '🎓',
    color: 'cyan' as const,
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
        descripcion: 'Desarrollo web con HTML, CSS y JavaScript más integración de un chatbot inteligente con Gemini AI. El proyecto final es una PWA escolar real publicada en línea.',
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
        descripcion: 'PWA de Emprendimiento Juvenil con backend en la nube y agente de IA vía protocolo MCP que analiza datos de ventas e inventario en tiempo real, generando recomendaciones automáticas.',
        logros: [
          'Construyen un sistema completo con base de datos en la nube',
          'Integran un agente de IA que analiza datos del negocio',
          'Implementan autenticación de usuarios y seguridad avanzada',
          'Detectan tendencias con IA para hacer crecer su negocio',
        ],
        tecnologias: ['Antigravity Framework', 'Tailwind CSS', 'Firebase', 'MCP · Gemini'],
      },
    ],
  },
  impulso: {
    id: 'impulso',
    emoji: '⚡',
    color: 'violet' as const,
    icon: Zap,
    title: 'Track Impulso',
    subtitle: 'Adultos al Siguiente Nivel',
    audience: 'Adultos de 18 a 30 años',
    description: 'Para adultos sin conocimientos previos de programación. En 12 sesiones construyen una aplicación web real con IA integrada, lista para usar y publicada en línea con enfoque profesional.',
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
        descripcion: 'PWA Maternal Inteligente para acompañar a madres gestantes: seguimiento del embarazo, transcripción de citas médicas por voz y resúmenes con IA. Funciona sin señal permanente.',
        logros: [
          'Crean una solución tecnológica con impacto social real',
          'Implementan Speech-to-Text para transcribir citas médicas',
          'Diseñan para funcionar en zonas rurales sin señal estable',
          'Protegen datos de salud con seguridad en Firebase',
        ],
        tecnologias: ['Antigravity Framework', 'Speech-to-Text API', 'Firebase', 'MCP · Gemini'],
      },
    ],
  },
  corazon: {
    id: 'corazon',
    emoji: '💖',
    color: 'rose' as const,
    icon: Heart,
    title: 'Track Corazón',
    subtitle: 'Mujeres con Superpoderes Digitales',
    audience: 'Mujeres adultas desde 18 años',
    description: 'Un programa que nace de una realidad concreta: muchas mujeres nunca han tenido la oportunidad de aprender tecnología de forma guiada y sin presión. Track Corazón cambia eso desde cero.',
    niveles: [
      {
        nombre: 'Curso 0 — Fundamentos Digitales',
        duracion: '12 sesiones · 75 min c/u',
        requisito: 'Sin requisitos previos — desde cero absoluto',
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
        descripcion: 'La IA como aliada concreta para el hogar, la salud y el emprendimiento. Herramientas cuidadosamente seleccionadas para entregar resultados reales desde la primera sesión.',
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

// ─── Colores por track ────────────────────────────────────────────────────────
const COLORS = {
  cyan: {
    text: 'text-cyan-300',
    textBright: 'text-cyan-200',
    bg: 'bg-cyan-500/15',
    bgHover: 'bg-cyan-500/25',
    border: 'border-cyan-500/40',
    borderBright: 'border-cyan-400/60',
    badge: 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30',
    glow: 'rgba(6,182,212,0.2)',
    glowBright: 'rgba(6,182,212,0.4)',
    check: 'text-cyan-400',
    dot: 'bg-cyan-400',
  },
  violet: {
    text: 'text-violet-300',
    textBright: 'text-violet-200',
    bg: 'bg-violet-500/15',
    bgHover: 'bg-violet-500/25',
    border: 'border-violet-500/40',
    borderBright: 'border-violet-400/60',
    badge: 'bg-violet-500/20 text-violet-200 border border-violet-500/30',
    glow: 'rgba(139,92,246,0.2)',
    glowBright: 'rgba(139,92,246,0.4)',
    check: 'text-violet-400',
    dot: 'bg-violet-400',
  },
  rose: {
    text: 'text-rose-300',
    textBright: 'text-rose-200',
    bg: 'bg-rose-500/15',
    bgHover: 'bg-rose-500/25',
    border: 'border-rose-500/40',
    borderBright: 'border-rose-400/60',
    badge: 'bg-rose-500/20 text-rose-200 border border-rose-500/30',
    glow: 'rgba(244,63,94,0.2)',
    glowBright: 'rgba(244,63,94,0.4)',
    check: 'text-rose-400',
    dot: 'bg-rose-400',
  },
};

// ─── Tarjeta de Track ─────────────────────────────────────────────────────────
function TrackCard({ track, index }: { track: typeof TRACKS.escolar; index: number }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const c = COLORS[track.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-3xl border overflow-hidden transition-all duration-300 ${
        hovered ? `${c.border} bg-neutral-800` : 'border-white/15 bg-neutral-850'
      }`}
      style={{
        background: hovered ? `linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)` : '#111827',
        boxShadow: hovered
          ? `0 24px 64px ${c.glow}, 0 0 0 1px ${c.glowBright}`
          : '0 2px 16px rgba(0,0,0,0.5)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      {/* Glow superior */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${c.glowBright}, transparent)`,
          opacity: hovered ? 1 : 0.3,
        }}
      />

      {/* Header */}
      <div className="p-7 pb-5">
        <div className="flex items-start justify-between mb-5">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${c.bg} border ${c.border}`}
          >
            {track.emoji}
          </div>
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${c.badge}`}>
            {track.audience}
          </span>
        </div>

        <h3 className={`font-heading font-extrabold text-2xl mb-1 ${c.textBright}`}>
          {track.title}
        </h3>
        <p className="text-sm font-medium text-neutral-300 mb-3">{track.subtitle}</p>
        <p className="text-sm text-neutral-400 leading-relaxed">{track.description}</p>
      </div>

      {/* Separador */}
      <div className={`mx-7 h-px ${c.bg} mb-4`} />

      {/* Niveles */}
      <div className="px-7 pb-7 space-y-3">
        {track.niveles.map((nivel, i) => (
          <div
            key={i}
            className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
              expanded === i
                ? `${c.bg} ${c.border}`
                : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
            }`}
          >
            <button
              type="button"
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer group"
            >
              <div className="flex-1 min-w-0">
                <div className={`font-bold text-sm mb-1 ${expanded === i ? c.textBright : 'text-white'}`}>
                  {nivel.nombre}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <Clock className="w-3 h-3" />
                  {nivel.duracion}
                </div>
              </div>
              <div
                className={`ml-3 shrink-0 transition-all duration-200 ${expanded === i ? c.text : 'text-neutral-500 group-hover:text-neutral-300'}`}
                style={{ transform: expanded === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>

            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-5 space-y-4">
                    {/* Requisito */}
                    <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full ${c.badge}`}>
                      {nivel.requisito}
                    </span>

                    {/* Descripción */}
                    <p className="text-sm text-neutral-200 leading-relaxed">{nivel.descripcion}</p>

                    {/* Logros */}
                    <div>
                      <p className="text-xs font-bold text-neutral-300 uppercase tracking-widest mb-3">
                        Al finalizar, los participantes:
                      </p>
                      <div className="space-y-2">
                        {nivel.logros.map((logro, j) => (
                          <div key={j} className="flex items-start gap-2.5">
                            <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${c.check}`} />
                            <span className="text-sm text-neutral-200">{logro}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tecnologías */}
                    <div>
                      <p className="text-xs font-bold text-neutral-300 uppercase tracking-widest mb-2">
                        Tecnologías
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {nivel.tecnologias.map((tech, j) => (
                          <span
                            key={j}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/8 border border-white/15 text-neutral-200"
                          >
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

  const stats = [
    { n: tracksToShow.length.toString(), l: 'Tracks disponibles', icon: '🎯' },
    { n: (tracksToShow.length * 2).toString(), l: 'Niveles formativos', icon: '📚' },
    { n: '75 min', l: 'Por sesión', icon: '⏱️' },
    { n: '$0', l: 'En licencias', icon: '✅' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className="fixed inset-0 z-[150] overflow-y-auto"
      style={{ background: '#080c14' }}
    >
      {/* Fondos ambientales */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[5%] w-[500px] h-[500px] rounded-full blur-[140px]" style={{ background: 'rgba(6,182,212,0.08)' }} />
        <div className="absolute top-[30%] right-[-5%] w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: 'rgba(139,92,246,0.07)' }} />
        <div className="absolute bottom-[10%] left-[30%] w-[300px] h-[300px] rounded-full blur-[100px]" style={{ background: 'rgba(244,63,94,0.06)' }} />
        {/* Grid sutil */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-8 pb-28">

        {/* Botón volver */}
        <motion.button
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          onClick={onClose}
          className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-14 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Volver al portafolio
        </motion.button>

        {/* ── HERO ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/25 px-4 py-2 rounded-full mb-8">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold text-cyan-300 uppercase tracking-widest">
              {isMunicipio ? '🏛️ Municipio' : '🎓 Establecimiento Educacional'} · {privateData.commune}
            </span>
          </div>

          <h1 className="font-heading font-extrabold leading-none tracking-tight text-white mb-6"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
          >
            Bienvenido/a,
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #22d3ee, #a78bfa, #fb7185)' }}
            >
              {privateData.authorityName}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed">
            Esta es la propuesta de <strong className="text-white">{privateData.commune} Digital 2026</strong> —{' '}
            - un programa de formación tecnológica diseñado para transformar{' '}
            <strong className="text-white font-bold">{privateData.commune}</strong>{' '}
            desde adentro.
          </p>
        </motion.div>

        {/* ── PAIN POINT ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16"
        >
          <div
            className="p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(139,92,246,0.08), rgba(244,63,94,0.08))' }}
          >
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.5), rgba(139,92,246,0.5), transparent)' }} />
            <div className="text-4xl mb-5">💡</div>
            <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
              "{painPoint}"
            </p>
          </div>
        </motion.div>

        {/* ── STATS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="rounded-2xl border border-white/12 p-5 text-center relative overflow-hidden"
              style={{ background: '#111827' }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="font-heading font-extrabold text-3xl text-white mb-1">{stat.n}</div>
              <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider">{stat.l}</div>
            </motion.div>
          ))}
        </div>

        {/* ── TRACKS ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="text-xs font-bold tracking-widest uppercase text-cyan-400 mb-3">
            Programa formativo
          </div>
          <h2 className="font-heading font-extrabold text-4xl text-white mb-3">
            Los Tracks
          </h2>
          <p className="text-neutral-300 text-lg">
            Presiona cada nivel para ver su contenido completo.
          </p>
        </motion.div>

        <div className={`grid gap-6 mb-16 ${
          tracksToShow.length === 1 ? 'max-w-2xl mx-auto' :
          tracksToShow.length === 2 ? 'md:grid-cols-2' :
          'md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {tracksToShow.map((track, i) => (
            <TrackCard key={track.id} track={track} index={i} />
          ))}
        </div>

        {/* ── RESPALDO INSTITUCIONAL ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="text-xs font-bold tracking-widest uppercase text-cyan-400 mb-6">
            Respaldo y credenciales
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: <Award className="w-6 h-6 text-amber-400" />,
                bg: 'rgba(251,191,36,0.1)',
                border: 'rgba(251,191,36,0.25)',
                title: 'CCHIA',
                desc: 'Colaborador de la Cámara Chilena de Inteligencia Artificial — organismo rector del ecosistema IA en Chile.',
              },
              {
                icon: <Shield className="w-6 h-6 text-cyan-400" />,
                bg: 'rgba(6,182,212,0.1)',
                border: 'rgba(6,182,212,0.25)',
                title: 'CENIA · SOFOFA · SENCE',
                desc: 'Certificaciones avaladas por los principales organismos nacionales de IA, empresa y trabajo.',
              },
              {
                icon: <Cpu className="w-6 h-6 text-violet-400" />,
                bg: 'rgba(139,92,246,0.1)',
                border: 'rgba(139,92,246,0.25)',
                title: 'Infraestructura Google',
                desc: 'Todas las herramientas son profesionales y de uso libre. Sin costos de licencias para la institución.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border p-6 flex items-start gap-4"
                style={{ background: item.bg, borderColor: item.border }}
              >
                <div className="shrink-0 mt-0.5">{item.icon}</div>
                <div>
                  <div className="font-bold text-white text-sm mb-2">{item.title}</div>
                  <div className="text-sm text-neutral-300 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── DOCUMENTOS ── */}
        {(privateData.docs || []).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <div className="text-xs font-bold tracking-widest uppercase text-cyan-400 mb-3">
              Documentos oficiales
            </div>
            <h2 className="font-heading font-extrabold text-3xl text-white mb-3">
              Propuesta Técnica
            </h2>
            <p className="text-neutral-300 mb-8">
              Documentación preparada específicamente para {privateData.commune}.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {privateData.docs.map((d, i) => (
                <a
                  key={i}
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-neutral-950 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]"
                  style={{
                    background: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
                    boxShadow: '0 0 30px rgba(6,182,212,0.35)',
                  }}
                >
                  <Download className="w-5 h-5" />
                  {d.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── CONTACTO ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center border-t border-white/10 pt-12"
        >
          <p className="text-neutral-400 text-sm mb-3">
            ¿Tiene preguntas sobre la propuesta?
          </p>
          <p className="font-bold text-white text-lg">
            claudioegdiaz@gmail.com{' '}
            <span className="text-neutral-500 font-normal mx-2">·</span>{' '}
            <span className="text-cyan-300">+56 9 5105 6018</span>
          </p>
          <p className="text-xs text-neutral-500 mt-3">
            Claudio González Díaz · Especialista en IA Generativa Aplicada · Relator
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}
