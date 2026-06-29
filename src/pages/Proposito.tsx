import { motion } from 'motion/react';
import { Shield, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { fadeUp } from '../utils/animations';

const content = {
  es: {
    purpose: {
      label: 'Propósito',
      title: 'Ayudando a las personas a hacer del mundo un lugar mejor a través de ',
      titleEm: 'software de calidad',
      p1: 'Creo firmemente que la tecnología debe ser un igualador de oportunidades. Mi objetivo es crear herramientas que resuelvan problemas reales, empoderen a las personas y generen un impacto positivo en su día a día.',
      p2: 'Ya sea para una iniciativa comunitaria, una PYME en crecimiento, una gran empresa o el sector público, diseño y construyo soluciones tecnológicas estables, escalables y seguras.',
      p3: 'No entrego solo código o presentaciones bonitas. Entrego sistemas que la gente realmente usa: simples, accesibles y construidos para durar, aprovechando el poder de la Inteligencia Artificial.',
      p4: 'Además de desarrollar, me apasiona profundamente enseñar. Mi misión personal es desmitificar la IA y hacer que la tecnología avanzada sea comprensible y alcanzable para todos, sin importar su origen o nivel técnico.',
      p5: 'Soy Claudio González Díaz — llevo más de 13 años resolviendo problemas con tecnología. Si tienes una visión para mejorar tu entorno o tu organización, te ayudo a hacerla realidad.',
      cards: [
        { icon: '🛡️', title: 'Arquitectura', val: 'Segura y Escalable' },
        { icon: '⚡', title: 'Tecnología', val: 'IA & Desarrollo Web' },
        { icon: '🤝', title: 'Enfoque', val: 'Centrado en las personas' },
        { icon: '🏢', title: 'Alcance', val: 'Público y Privado' },
      ],
    },
    security: {
      label: 'Seguridad', title: 'Seguridad ', titleEm: 'Digital',
      sub: 'Herramientas gratuitas para proteger tus datos y analizar archivos. Porque la seguridad es responsabilidad de todos.',
      tools: [
        { title: 'Analiza tus Archivos', desc: 'Magika usa IA para identificar si un archivo es realmente lo que aparenta ser. Detecta malware disfrazado en extensiones falsas.', icon: '🔍', note: 'Desarrollado por Google • 99% precisión • Gratis' },
        { title: '¿Han Expuesto tus Datos?', desc: 'Verifica si tu correo o datos aparecen en breaches públicos conocidos. Actúa rápido si tu información fue comprometida.', icon: '🔐', note: 'Have I Been Pwned • Búsqueda instantánea • Completamente seguro' },
      ],
      openMagika: 'Abrir Magika',
      checkNow: 'Verificar ahora',
      openSite: 'Abre el sitio en una nueva pestaña para verificar tu información',
      magikaDesc: 'La herramienta se abre en una nueva pestaña. Una vez ahí, elige:',
      textInput: 'Pega contenido de texto (código, configuraciones, datos) para identificar su tipo.',
      fileUpload: 'Sube un archivo directamente para detectar si su contenido real coincide con su extensión.',
      bestPractices: 'Buenas prácticas de seguridad',
      tips: ['Usa contraseñas únicas y fuertes para cada sitio', 'Habilita autenticación de dos factores (2FA) siempre que puedas', 'Mantén tu navegador y SO actualizados constantemente'],
    },
  },
  en: {
    purpose: {
      label: 'Purpose',
      title: 'Helping people make the world a better place through ',
      titleEm: 'quality software',
      p1: 'I firmly believe that technology should be an equalizer of opportunities. My goal is to create tools that solve real problems, empower people, and generate a positive impact on their daily lives.',
      p2: 'Whether for a community initiative, a growing SME, a large enterprise, or the public sector, I design and build stable, scalable, and secure technological solutions.',
      p3: "I don't just deliver code or pretty presentations. I deliver systems that people actually use: simple, accessible, and built to last, leveraging the power of Artificial Intelligence.",
      p4: 'Beyond building software, I am deeply passionate about teaching. My personal mission is to demystify AI and make advanced technology understandable and accessible to everyone, regardless of their background or technical level.',
      p5: "I'm Claudio González Díaz — I've spent over 13 years solving problems with technology. If you have a vision to improve your environment or your organization, I'll help you make it a reality.",
      cards: [
        { icon: '🛡️', title: 'Architecture', val: 'Secure & Scalable' },
        { icon: '⚡', title: 'Technology', val: 'AI & Web Dev' },
        { icon: '🤝', title: 'Focus', val: 'People-centered' },
        { icon: '🏢', title: 'Scope', val: 'Public & Private' },
      ],
    },
    security: {
      label: 'Security', title: 'Digital ', titleEm: 'Safety',
      sub: "Free tools to protect your data and analyze files. Because security is everyone's responsibility.",
      tools: [
        { title: 'Analyze Your Files', desc: 'Magika uses AI to identify if a file is really what it appears to be. Detects malware disguised with fake extensions.', icon: '🔍', note: 'Built by Google • 99% accuracy • Free' },
        { title: 'Have You Been Pwned?', desc: 'Check if your email or data appears in known public breaches. Act fast if your information was compromised.', icon: '🔐', note: 'Have I Been Pwned • Instant search • Completely safe' },
      ],
      openMagika: 'Open Magika',
      checkNow: 'Check now',
      openSite: 'Open the site in a new tab to check your information',
      magikaDesc: 'The tool opens in a new tab. Once there, choose:',
      textInput: 'Paste text content (code, configs, data) to identify its type.',
      fileUpload: 'Upload a file to detect if its real content matches its extension.',
      bestPractices: 'Security Best Practices',
      tips: ['Use unique and strong passwords for each site', 'Enable two-factor authentication (2FA) whenever possible', 'Keep your browser and OS updated constantly'],
    },
  },
};

export default function Proposito() {
  const { isDark, lang } = useApp();
  const { purpose: p, security: s } = content[lang];

  return (
    <div className="py-32 px-6 max-w-6xl mx-auto space-y-32">

      {/* — Propósito — */}
      <section>
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">{p.label}</div>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl tracking-tight mb-16 max-w-3xl leading-tight">
            {p.title}<em className="font-serif font-normal italic text-gradient">{p.titleEm}</em>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className={`space-y-6 text-lg leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            <p>{p.p1}</p>
            <p>{p.p2}</p>
            <p>{p.p3}</p>
            <p>{p.p4}</p>
            <p className={`mt-8 pl-6 border-l-4 border-cyan-400 font-serif italic ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>{p.p5}</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {p.cards.map((c, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 rounded-[2rem] text-center">
                <div className="text-3xl mb-3">{c.icon}</div>
                <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">{c.title}</div>
                <div className="font-heading font-extrabold text-xl text-cyan-400">{c.val}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* — Seguridad — */}
      <section>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">{s.label}</div>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight mb-8 flex flex-col sm:flex-row sm:items-baseline gap-2">
            <span>{s.title}</span>
            <span className="text-5xl md:text-6xl text-gradient uppercase tracking-tighter">{s.titleEm}</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-3xl mb-16 leading-relaxed">{s.sub}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {s.tools.map((tool, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
              className={`rounded-[2rem] overflow-hidden ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-neutral-200'}`}>
              <div className={`p-8 pb-6 ${isDark ? 'bg-gradient-to-r from-cyan-950/30 to-blue-950/30 border-b border-white/10' : 'bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-neutral-200'}`}>
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className={`font-heading font-bold text-2xl mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>{tool.title}</h3>
                <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{tool.note}</p>
              </div>
              <div className="p-8">
                <p className={`leading-relaxed mb-8 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>{tool.desc}</p>
                <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-neutral-900/50 border border-neutral-800' : 'bg-neutral-50 border border-neutral-200'}`}>
                  {i === 0 ? (
                    <div className="p-8 flex flex-col items-center justify-center text-center space-y-6">
                      <div className="text-5xl">🔍</div>
                      <div className="space-y-4 max-w-sm">
                        <h4 className={`font-heading font-bold text-xl ${isDark ? 'text-white' : 'text-neutral-900'}`}>Magika by Google</h4>
                        <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{s.magikaDesc}</p>
                        <div className={`text-left text-sm space-y-3 p-4 rounded-xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-neutral-100 border border-neutral-200'}`}>
                          <div className="flex items-start gap-3">
                            <span className={`font-bold px-2 py-0.5 rounded text-xs shrink-0 ${isDark ? 'bg-cyan-500/20 text-cyan-300' : 'bg-cyan-100 text-cyan-700'}`}>Text input</span>
                            <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>{s.textInput}</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className={`font-bold px-2 py-0.5 rounded text-xs shrink-0 ${isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>File upload</span>
                            <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>{s.fileUpload}</span>
                          </div>
                        </div>
                        <a href="https://securityresearch.google/magika/demo/magika-demo/" target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition-all duration-200">
                          {s.openMagika} <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 flex flex-col items-center justify-center h-full text-center space-y-6">
                      <div className="text-5xl">🔐</div>
                      <h4 className={`font-heading font-bold text-xl ${isDark ? 'text-white' : 'text-neutral-900'}`}>Have I Been Pwned</h4>
                      <p className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>{s.openSite}</p>
                      <a href="https://haveibeenpwned.com/" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition-all duration-200">
                        {s.checkNow} <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className={`mt-16 p-8 rounded-[2rem] border ${isDark ? 'bg-gradient-to-r from-cyan-950/20 to-blue-950/20 border-cyan-500/30' : 'bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200'}`}>
          <h3 className={`font-heading font-bold text-xl mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            <Shield className="w-5 h-5 text-cyan-400" />{s.bestPractices}
          </h3>
          <div className={`grid md:grid-cols-3 gap-6 text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            {s.tips.map((tip, i) => <div key={i}>✓ {tip}</div>)}
          </div>
        </motion.div>
      </section>

    </div>
  );
}
