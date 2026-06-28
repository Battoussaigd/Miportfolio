import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { fadeUp } from '../utils/animations';

const content = {
  es: {
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
  en: {
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
};

export default function Proposito() {
  const { isDark, lang } = useApp();
  const t = content[lang];

  return (
    <section className="py-32 px-6 max-w-6xl mx-auto">
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <div className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">{t.label}</div>
        <h2 className="font-heading font-extrabold text-4xl md:text-5xl tracking-tight mb-16 max-w-3xl leading-tight">
          {t.title}<em className="font-serif font-normal italic text-gradient">{t.titleEm}</em>
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-start">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className={`space-y-6 text-lg leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
          <p>{t.p1}</p>
          <p>{t.p2}</p>
          <p>{t.p3}</p>
          <p>{t.p4}</p>
          <p className={`mt-8 pl-6 border-l-4 border-cyan-400 font-serif italic ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>{t.p5}</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {t.cards.map((c, i) => (
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
  );
}
