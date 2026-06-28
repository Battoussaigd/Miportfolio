import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { fadeUp } from '../utils/animations';

const content = {
  es: {
    label: 'Perfil', title: 'Sobre ', titleEm: 'mí',
    sub: 'Autodidacta, técnico y relator. 13 años optimizando procesos, 2 años construyendo con IA.',
    cards: {
      profile: { title: 'Perfil profesional', desc: 'Técnico en Programación con sólida experiencia en logística y rutas. Especializado en IA Generativa aplicada, desarrollo de PWAs y automatización. Foco en democratizar la tecnología en comunidades rurales y municipios.' },
      certs: { title: 'Certificaciones IA' },
      tech: { title: 'Tecnologías' },
      teaching: { title: 'Experiencia como relator' },
    },
    seeMore: 'Ver detalle completo',
    certs: [
      { name: 'CENIA — Hazlo con IA', desc: '7 cursos · IA Generativa para mipymes · 2026' },
      { name: 'Google Skills Boost', desc: 'Líder IA Generativa · 30 hrs · 2025' },
      { name: 'Alura Latam — Inmersión IA', desc: 'Gemini · Prompt Engineering · 2025' },
      { name: 'BIG school — IA Workflow', desc: '6 horas · 2025' },
      { name: 'Udemy — Microsoft Excel Completo', desc: '12 horas · 2025' },
      { name: 'Santander Open Academy', desc: 'Google: IA y productividad · 2024' },
    ],
    teaching: [
      { name: 'CCU', desc: 'Formación tecnológica para nuevos ingresos' },
      { name: 'AXXON Chile', desc: 'Windows · Office · 15 alumnos · 2007' },
      { name: 'Centro E-MEC', desc: 'Ofimática · Armado PCs · 16 alumnos · 2001–03' },
      { name: 'Hogar Aldea Mis Amigos', desc: 'Relatoría voluntaria · 2003' },
    ],
  },
  en: {
    label: 'Profile', title: 'About ', titleEm: 'me',
    sub: 'Self-taught, technical and instructor. 13 years optimizing, 2 years building with AI.',
    cards: {
      profile: { title: 'Professional profile', desc: 'Programming Technician with solid logistics and route planning experience. Specialized in applied Generative AI, PWA development and automation. Focus on democratizing technology in rural communities and municipalities.' },
      certs: { title: 'AI Certifications' },
      tech: { title: 'Technologies' },
      teaching: { title: 'Instructor experience' },
    },
    seeMore: 'View full details',
    certs: [
      { name: 'CENIA — Do it with AI', desc: '7 courses · Generative AI for SMBs · 2026' },
      { name: 'Google Skills Boost', desc: 'Generative AI Leader · 30 hrs · 2025' },
      { name: 'Alura Latam — AI Immersion', desc: 'Gemini · Prompt Engineering · 2025' },
      { name: 'BIG school — AI Workflow', desc: '6 hours · 2025' },
      { name: 'Udemy — Complete Microsoft Excel', desc: '12 hours · 2025' },
      { name: 'Santander Open Academy', desc: 'Google: AI and productivity · 2024' },
    ],
    teaching: [
      { name: 'CCU', desc: 'Tech onboarding for new hires' },
      { name: 'AXXON Chile', desc: 'Windows · Office · 15 students · 2007' },
      { name: 'Centro E-MEC', desc: 'Office · PC Assembly · 16 students · 2001–03' },
      { name: 'Aldea Mis Amigos Home', desc: 'Volunteer instructor · 2003' },
    ],
  },
};

const techs = ['Google AI Studio', 'Gemini API', 'Claude', 'NotebookLM', 'RAG', 'Prompt Engineering', 'HTML/CSS/JS', 'PWA', 'Apps Script', 'Web Crypto API', 'Firebase', 'SAP R/3', 'Roadnet'];

export default function SobreMi() {
  const { isDark, lang } = useApp();
  const t = content[lang];

  return (
    <section className="py-32 px-6 max-w-6xl mx-auto">
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <div className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">{t.label}</div>
        <h2 className="font-heading font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
          {t.title}<em className="font-serif font-normal italic text-gradient">{t.titleEm}</em>
        </h2>
        <p className="text-neutral-400 text-lg max-w-2xl mb-12 leading-relaxed">{t.sub}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="glass-panel p-8 rounded-[2rem]">
          <h3 className="font-heading font-bold text-xl mb-4">{t.cards.profile.title}</h3>
          <p className="text-neutral-400 leading-relaxed text-sm">{t.cards.profile.desc}</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}
          className="glass-panel p-8 rounded-[2rem]">
          <h3 className="font-heading font-bold text-xl mb-4">{t.cards.certs.title}</h3>
          <div className="space-y-4">
            {t.certs.map((c, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                <div>
                  <div className="font-medium text-sm">{c.name}</div>
                  <div className="text-xs text-neutral-400 mt-1">{c.desc}</div>
                </div>
              </div>
            ))}
            <div className="pt-2">
              <a href="/certificaciones" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                {t.seeMore} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="glass-panel p-8 rounded-[2rem]">
          <h3 className="font-heading font-bold text-xl mb-4">{t.cards.tech.title}</h3>
          <div className="flex flex-wrap gap-2">
            {techs.map(tag => (
              <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">{tag}</span>
            ))}
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}
          className="glass-panel p-8 rounded-[2rem]">
          <h3 className="font-heading font-bold text-xl mb-4">{t.cards.teaching.title}</h3>
          <div className="space-y-4">
            {t.teaching.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                <div>
                  <div className="font-medium text-sm">{item.name}</div>
                  <div className="text-xs text-neutral-400 mt-1">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
