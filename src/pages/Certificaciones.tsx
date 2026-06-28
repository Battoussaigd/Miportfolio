import { motion } from 'motion/react';
import { BadgeCheck, Award, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { fadeUp } from '../utils/animations';

const content = {
  es: {
    label: 'Formación', title: 'Mis ', titleEm: 'certificaciones',
    sub: 'Validación continua de habilidades técnicas y desarrollo profesional.',
    googleEducation: {
      title: 'Google Certified Educator',
      items: [
        { year: '2026', title: 'Educador Certificado de Gemini', issuer: 'Google for Education', desc: 'Certificación oficial en uso educativo de Gemini', link: 'https://edu.google.accredible.com/3ffc5bbf-f2b1-475d-b935-c8702911e5ff' },
        { year: '2026', title: 'Google Certified Educator Level 2', issuer: 'Google for Education', desc: 'Validado 05/09/2026 - 05/09/2029', link: 'https://edu.google.accredible.com/4b75ca09-f18a-4cc2-83af-199dc62f0e7e' },
        { year: '2026', title: 'Google Certified Educator Level 1', issuer: 'Google for Education', desc: 'Validado 04/26/2026 - 04/26/2029', link: 'https://edu.google.accredible.com/13749b47-7b15-43d0-b7f2-d34ea6ebfcfe' },
      ],
    },
    googleCareerCerts: {
      title: 'Google Career Certificates',
      items: [
        { year: '2026', title: 'AI for Brainstorming and Planning', issuer: 'Google Career Certificates - Coursera', desc: 'Certificación especializada en IA aplicada', link: 'https://coursera.org/share/c1532647f4c75bc7a6a69d172329f75e' },
        { year: '2026', title: 'AI for Data Analysis', issuer: 'Google Career Certificates - Coursera', desc: 'Análisis de datos potenciado con IA', link: 'https://coursera.org/share/fd03698f6ec1bc7cc74eb5e6eeb88dda' },
        { year: '2026', title: 'AI for App Building', issuer: 'Google Career Certificates - Coursera', desc: 'Desarrollo de aplicaciones con IA integrada', link: 'https://coursera.org/share/0619f7331d9cd15b39e1444cbb487f51' },
      ],
    },
    ai: {
      title: 'Inteligencia Artificial & Tecnología',
      items: [
        { year: '2026', title: 'Hazlo con IA', issuer: 'CENIA', desc: '7 cursos de uso de IA Generativa para mipymes' },
        { year: '2025', title: 'Líder en IA Generativa', issuer: 'Google Skills', desc: '30 horas de formación', link: 'https://www.skills.google/public_profiles/d9d54821-ff5f-4ec0-9b6a-0ffe57074454' },
        { year: '2025', title: 'Inmersión IA con Google Gemini', issuer: 'Alura', desc: 'Ingeniería de Prompts y aplicaciones reales con GEMS (3 horas)' },
        { year: '2025', title: 'IA Workflow', issuer: 'BIG school', desc: '6 horas' },
        { year: '2025', title: 'Microsoft Excel Completo', issuer: 'Udemy', desc: '12 horas' },
        { year: '2024', title: 'Inteligencia Artificial y productividad', issuer: 'Santander Open Academy - Google', desc: '' },
      ],
    },
    kibernum: {
      title: 'Desarrollo Profesional (Kibernum)',
      items: [
        { year: '2025', title: 'Gestión del Modelo de Prevención del Delito Digital', desc: '210 horas' },
        { year: '2024', title: 'Gestión de la Diversidad e Inclusión Laboral y Social', desc: '140 horas' },
        { year: '2023', title: 'Mindset Agile para Colaboración Efectiva', desc: '160 horas' },
        { year: '2022', title: 'Herramientas del lenguaje TI en reclutamiento', desc: '160 horas' },
        { year: '2020', title: 'Seguridad de la Información en Sistemas Informáticos', desc: '100 horas' },
        { year: '2020', title: 'Uso y Aplicación de Excel en Administración de Datos', desc: '100 horas' },
        { year: '2018', title: 'Técnicas para el Trabajo en Equipo', desc: '70 horas' },
        { year: '2011', title: 'Administración de Base de Datos Oracle 11g', desc: '210 horas' },
      ],
    },
  },
  en: {
    label: 'Education', title: 'My ', titleEm: 'certifications',
    sub: 'Continuous validation of technical skills and professional development.',
    googleEducation: {
      title: 'Google Certified Educator',
      items: [
        { year: '2026', title: 'Gemini Certified Educator', issuer: 'Google for Education', desc: 'Official certification for educational use of Gemini', link: 'https://edu.google.accredible.com/3ffc5bbf-f2b1-475d-b935-c8702911e5ff' },
        { year: '2026', title: 'Google Certified Educator Level 2', issuer: 'Google for Education', desc: 'Valid 05/09/2026 - 05/09/2029', link: 'https://edu.google.accredible.com/4b75ca09-f18a-4cc2-83af-199dc62f0e7e' },
        { year: '2026', title: 'Google Certified Educator Level 1', issuer: 'Google for Education', desc: 'Valid 04/26/2026 - 04/26/2029', link: 'https://edu.google.accredible.com/13749b47-7b15-43d0-b7f2-d34ea6ebfcfe' },
      ],
    },
    googleCareerCerts: {
      title: 'Google Career Certificates',
      items: [
        { year: '2026', title: 'AI for Brainstorming and Planning', issuer: 'Google Career Certificates - Coursera', desc: 'Specialized certification in applied AI', link: 'https://coursera.org/share/c1532647f4c75bc7a6a69d172329f75e' },
        { year: '2026', title: 'AI for Data Analysis', issuer: 'Google Career Certificates - Coursera', desc: 'Data analysis powered by AI', link: 'https://coursera.org/share/fd03698f6ec1bc7cc74eb5e6eeb88dda' },
        { year: '2026', title: 'AI for App Building', issuer: 'Google Career Certificates - Coursera', desc: 'App development with integrated AI', link: 'https://coursera.org/share/0619f7331d9cd15b39e1444cbb487f51' },
      ],
    },
    ai: {
      title: 'Artificial Intelligence & Technology',
      items: [
        { year: '2026', title: 'Do it with AI', issuer: 'CENIA', desc: '7 courses on Generative AI for SMBs' },
        { year: '2025', title: 'Generative AI Leader', issuer: 'Google Skills', desc: '30 hours of training', link: 'https://www.skills.google/public_profiles/d9d54821-ff5f-4ec0-9b6a-0ffe57074454' },
        { year: '2025', title: 'AI Immersion with Google Gemini', issuer: 'Alura', desc: 'Prompt Engineering and real applications with GEMS (3 hours)' },
        { year: '2025', title: 'AI Workflow', issuer: 'BIG school', desc: '6 hours' },
        { year: '2025', title: 'Complete Microsoft Excel', issuer: 'Udemy', desc: '12 hours' },
        { year: '2024', title: 'Artificial Intelligence and Productivity', issuer: 'Santander Open Academy - Google', desc: '' },
      ],
    },
    kibernum: {
      title: 'Professional Development (Kibernum)',
      items: [
        { year: '2025', title: 'Digital Crime Prevention Model Management', desc: '210 hours' },
        { year: '2024', title: 'Diversity and Social/Labor Inclusion Management', desc: '140 hours' },
        { year: '2023', title: 'Agile Mindset for Effective Collaboration', desc: '160 hours' },
        { year: '2022', title: 'IT Language Tools in Recruitment', desc: '160 hours' },
        { year: '2020', title: 'Information Security Protocols and Procedures', desc: '100 hours' },
        { year: '2020', title: 'Excel in Data Administration', desc: '100 hours' },
        { year: '2018', title: 'Teamwork Techniques', desc: '70 hours' },
        { year: '2011', title: 'Oracle 11g Database Administration', desc: '210 hours' },
      ],
    },
  },
};

export default function Certificaciones() {
  const { isDark, lang } = useApp();
  const t = content[lang];

  const certCard = (cert: any, accent: string) => (
    <motion.div key={cert.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
      className={`p-6 rounded-2xl transition-all duration-300 ${
        accent === 'blue'
          ? isDark ? 'bg-blue-950/20 border border-blue-500/30 hover:bg-blue-950/30' : 'bg-blue-50 border border-blue-200 hover:border-blue-400'
          : accent === 'amber'
          ? isDark ? 'bg-amber-950/20 border border-amber-500/30 hover:bg-amber-950/30' : 'bg-amber-50 border border-amber-200 hover:border-amber-400'
          : isDark ? 'bg-white/5 border border-white/10 hover:bg-white/10' : 'bg-white border border-neutral-200 hover:border-cyan-400/30 hover:shadow-md'
      }`}>
      <div className="flex justify-between items-start mb-2">
        <div className={`text-sm font-bold px-3 py-1 rounded-full inline-block ${
          accent === 'blue' ? 'text-blue-400 bg-blue-400/10'
          : accent === 'amber' ? 'text-amber-400 bg-amber-400/10'
          : 'text-cyan-400 bg-cyan-400/10'
        }`}>{cert.year}</div>
        {cert.link && (
          <a href={cert.link} target="_blank" rel="noopener noreferrer"
            className={`transition-colors ${accent === 'blue' ? 'text-neutral-400 hover:text-blue-400' : accent === 'amber' ? 'text-neutral-400 hover:text-amber-400' : 'text-neutral-400 hover:text-cyan-400'}`}>
            <ExternalLink className="w-5 h-5" />
          </a>
        )}
      </div>
      <h4 className={`font-bold text-lg mb-1 mt-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>{cert.title}</h4>
      <div className="text-sm font-medium text-neutral-500 mb-2">{cert.issuer}</div>
      {cert.desc && <p className="text-sm text-neutral-400 leading-relaxed">{cert.desc}</p>}
    </motion.div>
  );

  return (
    <section className="py-32 px-6 max-w-6xl mx-auto">
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <div className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">{t.label}</div>
        <h2 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight mb-4 flex flex-col sm:flex-row sm:items-baseline gap-2">
          <span>{t.title}</span>
          <span className="text-5xl md:text-7xl text-gradient uppercase tracking-tighter">{t.titleEm}</span>
        </h2>
        <p className="text-neutral-400 text-lg max-w-2xl mb-16 leading-relaxed">{t.sub}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <h3 className={`font-heading font-bold text-2xl mb-8 flex items-center gap-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              <BadgeCheck className="w-6 h-6 text-blue-400" />{t.googleEducation.title}
            </h3>
            <div className="space-y-4">{t.googleEducation.items.map(c => certCard(c, 'blue'))}</div>
          </div>

          <div className="space-y-6">
            <h3 className={`font-heading font-bold text-2xl mb-8 flex items-center gap-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              <BadgeCheck className="w-6 h-6 text-amber-400" />{t.googleCareerCerts.title}
            </h3>
            <div className="space-y-4">{t.googleCareerCerts.items.map(c => certCard(c, 'amber'))}</div>
          </div>

          <div className="space-y-6">
            <h3 className={`font-heading font-bold text-2xl mb-8 flex items-center gap-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              <BadgeCheck className="w-6 h-6 text-cyan-400" />{t.ai.title}
            </h3>
            <div className="space-y-4">{t.ai.items.map(c => certCard(c, 'cyan'))}</div>
          </div>
        </div>

        {/* Kibernum timeline */}
        <div className="mt-16 space-y-6">
          <h3 className={`font-heading font-bold text-2xl flex items-center gap-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            <Award className="w-6 h-6 text-cyan-400" />{t.kibernum.title}
          </h3>
          <div className={`p-8 rounded-[2rem] ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-neutral-200'}`}>
            <div className={`space-y-6 relative before:absolute before:inset-0 before:ml-1.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent ${isDark ? 'before:via-neutral-800' : 'before:via-neutral-200'} before:to-transparent`}>
              {t.kibernum.items.map((cert, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className={`flex items-center justify-center w-3 h-3 rounded-full border-2 border-cyan-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(34,211,238,0.5)] ${isDark ? 'bg-neutral-900' : 'bg-white'}`} />
                  <div className={`w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-neutral-50'}`}>
                    <span className="font-bold text-cyan-400 text-sm">{cert.year}</span>
                    <h4 className={`font-medium text-sm mb-1 mt-1 ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>{cert.title}</h4>
                    <p className="text-xs text-neutral-500">{cert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
