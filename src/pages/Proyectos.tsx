import { motion } from 'motion/react';
import { Shield, Zap, MessageCircle, Clock, BookOpen, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { fadeUp } from '../utils/animations';
import { CoursesSection } from '../components/CoursesSection';

const icons = [
  <Shield className="w-8 h-8 text-cyan-400" />,
  <Zap className="w-8 h-8 text-cyan-400" />,
  <MessageCircle className="w-8 h-8 text-cyan-400" />,
  <Clock className="w-8 h-8 text-cyan-400" />,
  <BookOpen className="w-8 h-8 text-cyan-400" />,
  <Users className="w-8 h-8 text-cyan-400" />,
];

const content = {
  es: {
    label: 'Trabajo', title: 'Mis ', titleEm: 'proyectos',
    sub: 'Soluciones reales para problemas reales. Construidas con IA, para personas.',
    items: [
      { name: 'HADES 2.1', desc: 'PWA local-first con cifrado AES-GCM. Sin servidores, sin nube. Los datos nunca salen del dispositivo.', tags: ['PWA', 'Web Crypto API', 'AES-GCM'], impact: '🔒 Seguridad máxima · Costo: $0' },
      { name: 'Automatización CCU', desc: 'Automatiza el alta de clientes en Roadnet con validación Google Maps API, organización por región y exportación al formato CCU.', tags: ['Apps Script', 'Maps API', 'Sheets'], impact: '📉 6 horas → 10 minutos · ROI +10%' },
      { name: 'Polaris', desc: 'Chatbot de texto y voz creado para brindar apoyo médico (consejos no diagnósticos) y moral a pacientes con enfermedades autoinmunes.', tags: ['Chatbot', 'IA de Voz', 'Salud'], impact: '💙 Apoyo 24/7 · Empatía IA' },
      { name: 'Milagrito', desc: 'PWA para embarazo. Graba, transcribe y resume citas médicas. Incluye chatbot de salud, calendario y consejos de bienestar.', tags: ['PWA', 'Speech-to-Text', 'Salud'], impact: '👶 Control total del embarazo' },
      { name: 'Pillanlelbún Digital 2026', desc: 'Formación tecnológica gratuita para comunidad rural: Track Escolar, Impulso y Corazón. PWAs, IA y RAG.', tags: ['IA Generativa', 'RAG', 'PWA'], impact: '🌱 IA para zonas rurales · $0' },
      { name: 'Líderes Digitales Lautaro', desc: '3 tracks para dirigentes sociales: gestión con IA, inteligencia comunitaria y app de voz para personas con discapacidad.', tags: ['IA de Voz', 'Accesibilidad', 'Gems'], impact: '🎙️ Inclusión digital radical · $0' },
    ],
    cchia: { title: 'Cámara Chilena de Inteligencia Artificial', desc: 'Colaborador activo de la CCHIA — construyendo el ecosistema de IA responsable en Chile y Latinoamérica.' },
  },
  en: {
    label: 'Work', title: 'My ', titleEm: 'projects',
    sub: 'Real solutions for real problems. Built with AI, for people.',
    items: [
      { name: 'HADES 2.1', desc: 'Local-first PWA with AES-GCM encryption. No servers, no cloud. Data never leaves the device.', tags: ['PWA', 'Web Crypto API', 'AES-GCM'], impact: '🔒 Maximum security · Cost: $0' },
      { name: 'CCU Automation', desc: 'Automates customer onboarding in Roadnet with Google Maps API validation, regional organization and CCU format export.', tags: ['Apps Script', 'Maps API', 'Sheets'], impact: '📉 6h → 10min · ROI +10%' },
      { name: 'Polaris', desc: 'Text and voice chatbot created to provide medical advice (non-diagnostic) and moral support to patients with autoimmune diseases.', tags: ['Chatbot', 'Voice AI', 'Health'], impact: '💙 24/7 Support · AI Empathy' },
      { name: 'Milagrito', desc: 'Pregnancy PWA. Records, transcribes and summarizes medical appointments. Includes health chatbot, calendar and wellness tips.', tags: ['PWA', 'Speech-to-Text', 'Health'], impact: '👶 Full pregnancy tracking' },
      { name: 'Pillanlelbún Digital 2026', desc: 'Free tech education for rural community: School, Impulse and Heart Tracks. PWAs, AI and RAG architectures.', tags: ['Generative AI', 'RAG', 'PWA'], impact: '🌱 AI for rural areas · $0' },
      { name: 'Digital Leaders Lautaro', desc: '3 tracks for community leaders: AI management, community intelligence and voice app for people with disabilities.', tags: ['Voice AI', 'Accessibility', 'Gems'], impact: '🎙️ Radical digital inclusion · $0' },
    ],
    cchia: { title: 'Chilean Chamber of Artificial Intelligence', desc: 'Active collaborator at CCHIA — building the responsible AI ecosystem in Chile and Latin America.' },
  },
};

export default function Proyectos() {
  const { isDark, lang } = useApp();
  const t = content[lang];

  return (
    <div className="pt-20">
      <CoursesSection isDark={isDark} />
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <div className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">{t.label}</div>
        <h2 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight mb-4 flex flex-col sm:flex-row sm:items-baseline gap-2">
          <span>{t.title}</span>
          <span className="text-5xl md:text-7xl text-gradient uppercase tracking-tighter">{t.titleEm}</span>
        </h2>
        <p className="text-neutral-400 text-lg max-w-2xl mb-12 leading-relaxed">{t.sub}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {t.items.map((p, i) => (
          <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
            className="glass-panel p-8 rounded-[2rem] flex flex-col group relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="mb-6">{icons[i]}</div>
              <h3 className="font-heading font-bold text-xl mb-3">{p.name}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6 flex-grow">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">{tag}</span>
                ))}
              </div>
              <div className="pt-4 border-t border-white/10 text-xs font-semibold text-cyan-400 mt-auto">{p.impact}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CCHIA */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="mt-16 glass-panel p-12 rounded-[2.5rem] text-center">
        <div className="flex justify-center mb-8">
          <img src="/cchia-logo.png" alt="Logo CCHIA"
            className="h-20 md:h-24 object-contain dark:brightness-0 dark:invert"
            onError={e => { e.currentTarget.style.display = 'none'; }} />
        </div>
        <h3 className="font-heading font-bold text-2xl md:text-3xl text-cyan-400 mb-4">{t.cchia.title}</h3>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">{t.cchia.desc}</p>
      </motion.div>
    </section>
    </div>
  );
}
