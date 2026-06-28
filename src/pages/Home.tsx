import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MapPin, Lock } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import PrivateView from '../components/PrivateView';
import { useApp } from '../context/AppContext';
import { fadeUp } from '../utils/animations';

const content = {
  es: {
    hero: {
      badge: 'Google Certified Educator',
      role: 'Colaborador CCHIA · La Araucanía',
      headline1: 'Haz que la tecnología',
      headline2: 'juegue a tu favor.',
      sub: 'Diseño sitios web, automatizaciones y talleres de IA para empresas, municipios y comunidades en Chile.',
      cta1: 'Solicita un diagnóstico',
      cta2: 'Ver casos reales',
    },
    services: {
      label: 'Servicios', title: 'Servicios para ', titleEm: 'avanzar con claridad',
      sub: 'Diseñados para que tu organización se vea mejor, funcione mejor y transmita más confianza desde el primer contacto.',
      items: [
        { icon: '📱', title: 'Sitios web y experiencias digitales', desc: 'Sitios y aplicaciones web pensados para verse profesionales, cargar rápido y dar una mejor experiencia a quienes confían en tu organización.', tags: ['React', 'Firebase', 'Netlify / Vercel'], cta: 'Consultar', color: 'cyan' },
        { icon: '⚡', title: 'Automatización de procesos', desc: 'Convierto tareas repetitivas y desordenadas en flujos más simples, rápidos y sostenibles, para que tu tiempo se use donde realmente importa.', tags: ['Apps Script', 'Gemini API', 'Google Sheets'], cta: 'Consultar', color: 'amber' },
        { icon: '🤖', title: 'Chatbots con Gemini y Claude', desc: 'Asistentes digitales que orientan, responden y acompañan mejor a tus usuarios, sin hacer que la experiencia se sienta fría o impersonal.', tags: ['Gemini', 'Claude', 'RAG'], cta: 'Consultar', color: 'purple' },
        { icon: '🎓', title: 'Talleres de IA aplicados', desc: 'Capacitaciones claras, cercanas y útiles para que equipos, municipios y comunidades incorporen IA con criterio y aplicaciones reales.', tags: ['IA Generativa', 'Google Workspace', 'Capacitación'], cta: 'Consultar', color: 'green' },
        { icon: '🏛️', title: 'Diagnóstico y acompañamiento', desc: 'Analizo tu contexto, detecto oportunidades y te ayudo a tomar decisiones tecnológicas con más seguridad, sin presión ni tecnicismos innecesarios.', tags: ['Diagnóstico', 'Hoja de ruta', 'Acompañamiento'], cta: 'Agendar llamada', color: 'blue' },
      ],
    },
    stats: [
      { n: '13+', l: 'años experiencia' }, { n: '6h→10m', l: 'caso real automatizado' },
      { n: 'PWAs + IA', l: 'soluciones aplicadas' }, { n: 'Lautaro · Vilcún', l: 'foco territorial' },
    ],
    modal: { title1: 'Acceso ', title2: 'Municipal', desc: 'Ingresa tu nombre y la clave de tu comuna para ver tu propuesta personalizada.', name: 'Nombre completo', key: 'Clave de acceso', err: 'Datos incorrectos. Verifica tu nombre y clave.', cancel: 'Cancelar', enter: 'Ingresar' },
    private: { back: 'Volver', welcome: 'Bienvenida/o, ', prog: 'Programa: ', cost: 'Diseñado específicamente para su institución. Costo de licencias: $0 CLP.', docs: 'Documentos disponibles', dl: 'Descargar' },
    cta: 'Hablar de mi caso',
  },
  en: {
    hero: {
      badge: 'CCHIA Collaborator · Google Certified Educator · La Araucanía',
      role: 'AI-Powered Apps · Automation · Workshops · Consulting',
      headline1: 'I solve real problems',
      headline2: 'with Artificial Intelligence.',
      sub: "I'm Claudio González Díaz — Programming Technician with 13+ years of experience. I build PWAs, chatbots, automations and run AI workshops for businesses, municipalities and communities in Chile.",
      cta1: 'See my services',
      cta2: 'Contact now',
    },
    services: {
      label: 'Services', title: 'How can I ', titleEm: 'help you?',
      sub: 'Concrete AI solutions for companies, municipalities, SMEs and organizations. No jargon, measurable results.',
      items: [
        { icon: '📱', title: 'PWA & Web App Development', desc: 'Progressive Web Apps that work on any device, no App Store needed. Full design, development and deployment.', tags: ['React', 'Firebase', 'Netlify / Vercel'], cta: 'Inquire', color: 'cyan' },
        { icon: '⚡', title: 'AI-Powered Automation', desc: 'I transform repetitive manual processes into automated flows using Google Apps Script, Gemini and APIs.', tags: ['Apps Script', 'Gemini API', 'Google Sheets'], cta: 'Inquire', color: 'amber' },
        { icon: '🤖', title: 'Chatbots with Gemini & Claude', desc: 'Intelligent virtual assistants for your website, business or municipality. Custom context, natural language responses.', tags: ['Gemini', 'Claude', 'RAG'], cta: 'Inquire', color: 'purple' },
        { icon: '🎓', title: 'AI Workshops & Training', desc: 'Practical Generative AI workshops for work teams, municipalities and communities.', tags: ['Generative AI', 'Google Workspace', 'Training'], cta: 'Inquire', color: 'green' },
        { icon: '🏛️', title: 'AI Consulting for Business & Government', desc: 'Process diagnosis, AI adoption roadmap and implementation support.', tags: ['Diagnosis', 'Roadmap', 'Support'], cta: 'Schedule a call', color: 'blue' },
      ],
    },
    stats: [
      { n: '13+', l: 'years experience' }, { n: '95%', l: 'time reduction' },
      { n: '4', l: 'active projects' }, { n: '2+', l: 'municipalities' },
    ],
    modal: { title1: 'Municipal ', title2: 'Access', desc: 'Enter your name and municipality key to see your personalized proposal.', name: 'Full name', key: 'Access key', err: 'Incorrect data. Check your name and key.', cancel: 'Cancel', enter: 'Enter' },
    private: { back: 'Back', welcome: 'Welcome, ', prog: 'Program: ', cost: 'Designed specifically for your institution. License cost: $0 CLP.', docs: 'Available documents', dl: 'Download' },
    cta: 'Discuss my case',
  },
};

export default function Home() {
  const { isDark, lang } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [privateData, setPrivateData] = useState<any>(null);
  const [accessForm, setAccessForm] = useState({ name: '', key: '' });
  const [modalErr, setModalErr] = useState(false);
  const [isLoadingAccess, setIsLoadingAccess] = useState(false);

  const t = content[lang];

  useEffect(() => {
    if (searchParams.get('acceso') === '1') {
      setIsModalOpen(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleAccess = async () => {
    const name = accessForm.name.trim().toLowerCase();
    const key = accessForm.key.trim();
    if (!name || !key) { setModalErr(true); return; }
    setIsLoadingAccess(true);
    setModalErr(false);
    try {
      const docRef = doc(db, 'municipalities', key);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.names && data.names.includes(name)) {
          setPrivateData(data);
          setIsModalOpen(false);
          setAccessForm({ name: '', key: '' });
          document.body.style.overflow = 'hidden';
        } else { setModalErr(true); }
      } else { setModalErr(true); }
    } catch { setModalErr(true); }
    setIsLoadingAccess(false);
  };

  const closePrivate = () => {
    setPrivateData(null);
    document.body.style.overflow = '';
  };

  const colorMap: Record<string, string> = {
    cyan:   isDark ? 'bg-cyan-950/20 border-cyan-500/30 hover:bg-cyan-950/35' : 'bg-cyan-50 border-cyan-200 hover:border-cyan-400',
    amber:  isDark ? 'bg-amber-950/20 border-amber-500/30 hover:bg-amber-950/35' : 'bg-amber-50 border-amber-200 hover:border-amber-400',
    purple: isDark ? 'bg-purple-950/20 border-purple-500/30 hover:bg-purple-950/35' : 'bg-purple-50 border-purple-200 hover:border-purple-400',
    green:  isDark ? 'bg-green-950/20 border-green-500/30 hover:bg-green-950/35' : 'bg-green-50 border-green-200 hover:border-green-400',
    blue:   isDark ? 'bg-blue-950/20 border-blue-500/30 hover:bg-blue-950/35' : 'bg-blue-50 border-blue-200 hover:border-blue-400',
  };
  const tagColorMap: Record<string, string> = {
    cyan: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20', amber: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
    purple: 'bg-purple-400/10 text-purple-400 border-purple-400/20', green: 'bg-green-400/10 text-green-400 border-green-400/20',
    blue: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
  };
  const btnColorMap: Record<string, string> = {
    cyan: 'bg-cyan-500 hover:bg-cyan-600', amber: 'bg-amber-500 hover:bg-amber-600',
    purple: 'bg-purple-500 hover:bg-purple-600', green: 'bg-green-500 hover:bg-green-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <video
          key={isDark ? 'dark' : 'light'}
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay muted loop playsInline preload="metadata"
        >
          <source src={isDark
            ? 'https://res.cloudinary.com/dyejf2wmt/video/upload/v1774651181/01_gfbhc6.mp4'
            : 'https://res.cloudinary.com/dyejf2wmt/video/upload/v1774679464/02_d%C3%ADa_final_zslffq.mp4'}
            type="video/mp4" />
        </video>
        <div className={`absolute inset-0 z-10 ${isDark ? 'bg-gradient-to-b from-neutral-950/40 via-neutral-950/50 to-neutral-950/80' : 'bg-gradient-to-b from-neutral-50/40 via-neutral-50/50 to-neutral-50/80'}`} />

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center pb-32">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-8">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-cyan-400 tracking-wide">{t.hero.badge}</span>
          </motion.div>

          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}
            className={`font-heading font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] mb-6 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            {t.hero.headline1}<br />
            <span className="text-gradient">{t.hero.headline2}</span>
          </motion.h1>

          <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.3 }}
            className={`text-lg md:text-xl font-light max-w-2xl mx-auto mb-4 leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            {t.hero.sub}
          </motion.p>

          <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.35 }}
            className="text-sm font-medium text-cyan-400/80 mb-4 tracking-wide">
            {t.hero.role}
          </motion.p>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 text-neutral-400 text-sm mb-10">
            <MapPin className="w-4 h-4 text-cyan-400" />
            Pillanlelbún, Lautaro · La Araucanía, Chile
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#servicios" className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center text-base px-8 py-3">
              {t.hero.cta1} <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contacto-quick" className="btn-secondary w-full sm:w-auto text-center text-base px-8 py-3">
              {t.hero.cta2}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">{t.services.label}</div>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl tracking-tight mb-4">
            {t.services.title}<em className="font-serif font-normal italic text-gradient">{t.services.titleEm}</em>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mb-16 leading-relaxed">{t.services.sub}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((s, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}
              className={`p-8 rounded-[2rem] border flex flex-col transition-all duration-300 ${colorMap[s.color]}`}>
              <div className="text-4xl mb-5">{s.icon}</div>
              <h3 className={`font-heading font-bold text-xl mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>{s.title}</h3>
              <p className={`text-sm leading-relaxed mb-6 flex-grow ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{s.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {s.tags.map(tag => (
                  <span key={tag} className={`text-[10px] font-medium px-2.5 py-1 rounded-md border ${tagColorMap[s.color]}`}>{tag}</span>
                ))}
              </div>
              <a href="/contacto" className={`inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:scale-[1.02] ${btnColorMap[s.color]}`}>
                {s.cta} <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className={`mt-16 p-6 rounded-[2rem] border flex flex-col md:flex-row items-center justify-between gap-6 ${isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-100 border-neutral-200'}`}>
          <p className={`text-sm text-center md:text-left ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            {lang === 'es'
              ? '¿Si aún no tienes claro qué necesitas, conversemos. Muchas veces el primer paso no es comprar algo, sino entender bien el problema.'
              : "If you're not sure what you need yet, let's talk."}
          </p>
          <a href="/contacto" className="btn-primary flex items-center gap-2 shrink-0 text-sm px-6 py-2.5">
            {t.cta} <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="px-6 max-w-6xl mx-auto pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {t.stats.map((s, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 rounded-3xl text-center">
              <div className="font-heading font-extrabold text-4xl text-cyan-400 mb-1">{s.n}</div>
              <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Municipal Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="glass-panel w-full max-w-md p-10 rounded-[2.5rem] relative"
              onClick={e => e.stopPropagation()}>
              <h2 className="font-heading font-extrabold text-3xl mb-2">
                {t.modal.title1}<span className="text-cyan-400">{t.modal.title2}</span>
              </h2>
              <p className="text-neutral-400 text-sm mb-8 leading-relaxed">{t.modal.desc}</p>
              <div className="space-y-4 mb-8">
                <input type="text" placeholder={t.modal.name} className="input-field py-3"
                  value={accessForm.name} onChange={e => setAccessForm({ ...accessForm, name: e.target.value })} />
                <input type="text" placeholder={t.modal.key} className="input-field py-3"
                  value={accessForm.key} onChange={e => setAccessForm({ ...accessForm, key: e.target.value })} />
                {modalErr && <div className="text-red-400 text-sm font-medium">{t.modal.err}</div>}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setIsModalOpen(false)} className="btn-secondary flex-1 text-sm py-3">{t.modal.cancel}</button>
                <button onClick={handleAccess} disabled={isLoadingAccess}
                  className="btn-primary flex-[2] text-sm py-3 disabled:opacity-50 flex items-center justify-center">
                  {isLoadingAccess
                    ? <div className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                    : t.modal.enter}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Private View */}
      <AnimatePresence>
        {privateData && <PrivateView privateData={privateData} onClose={closePrivate} isDark={isDark} />}
      </AnimatePresence>
    </>
  );
}
