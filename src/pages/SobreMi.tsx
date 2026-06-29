import { motion } from 'motion/react';
import { BadgeCheck, Award, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { fadeUp } from '../utils/animations';

const techs = ['Google AI Studio', 'Gemini API', 'Claude', 'NotebookLM', 'RAG', 'Prompt Engineering', 'HTML/CSS/JS', 'PWA', 'Apps Script', 'Web Crypto API', 'Firebase', 'SAP R/3', 'Roadnet'];

const content = {
  es: {
    about: {
      label: 'Perfil', title: 'Sobre ', titleEm: 'mí',
      sub: 'Autodidacta, técnico y relator. 13 años optimizando procesos, 2 años construyendo con IA.',
      profile: { title: 'Perfil profesional', desc: 'Técnico en Programación con sólida experiencia en logística y rutas. Especializado en IA Generativa aplicada, desarrollo de PWAs y automatización. Foco en democratizar la tecnología en comunidades rurales y municipios.' },
      certsTitle: 'Certificaciones IA',
      techTitle: 'Tecnologías',
      teachingTitle: 'Experiencia como relator',
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
    certs: {
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
      googleCareer: {
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
  },
  en: {
    about: {
      label: 'Profile', title: 'About ', titleEm: 'me',
      sub: 'Self-taught, technical and instructor. 13 years optimizing, 2 years building with AI.',
      profile: { title: 'Professional profile', desc: 'Programming Technician with solid logistics and route planning experience. Specialized in applied Generative AI, PWA development and automation. Focus on democratizing technology in rural communities and municipalities.' },
      certsTitle: 'AI Certifications',
      techTitle: 'Technologies',
      teachingTitle: 'Instructor experience',
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
    certs: {
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
      googleCareer: {
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
  },
};

export default function SobreMi() {
  const { isDark, lang } = useApp();
  const { about, certs } = content[lang];

  const certCard = (cert: any, accent: string) => (
    <motion.div key={cert.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
      className={`p-6 rounded-2xl transition-all duration-300 ${
        accent === 'blue'  ? isDark ? 'bg-blue-950/20 border border-blue-500/30 hover:bg-blue-950/30' : 'bg-blue-50 border border-blue-200 hover:border-blue-400'
        : accent === 'amber' ? isDark ? 'bg-amber-950/20 border border-amber-500/30 hover:bg-amber-950/30' : 'bg-amber-50 border border-amber-200 hover:border-amber-400'
        : isDark ? 'bg-white/5 border border-white/10 hover:bg-white/10' : 'bg-white border border-neutral-200 hover:border-cyan-400/30 hover:shadow-md'
      }`}>
      <div className="flex justify-between items-start mb-2">
        <div className={`text-sm font-bold px-3 py-1 rounded-full inline-block ${
          accent === 'blue' ? 'text-blue-400 bg-blue-400/10' : accent === 'amber' ? 'text-amber-400 bg-amber-400/10' : 'text-cyan-400 bg-cyan-400/10'
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
    <div className="py-32 px-6 max-w-6xl mx-auto space-y-24">

      {/* — Sobre mí — */}
      <div>
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">{about.label}</div>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
            {about.title}<em className="font-serif font-normal italic text-gradient">{about.titleEm}</em>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mb-12 leading-relaxed">{about.sub}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="glass-panel p-8 rounded-[2rem]">
            <h3 className="font-heading font-bold text-xl mb-4">{about.profile.title}</h3>
            <p className="text-neutral-400 leading-relaxed text-sm">{about.profile.desc}</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }} className="glass-panel p-8 rounded-[2rem]">
            <h3 className="font-heading font-bold text-xl mb-4">{about.certsTitle}</h3>
            <div className="space-y-4">
              {about.certs.map((c, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <div><div className="font-medium text-sm">{c.name}</div><div className="text-xs text-neutral-400 mt-1">{c.desc}</div></div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="glass-panel p-8 rounded-[2rem]">
            <h3 className="font-heading font-bold text-xl mb-4">{about.techTitle}</h3>
            <div className="flex flex-wrap gap-2">
              {techs.map(tag => (
                <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">{tag}</span>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }} className="glass-panel p-8 rounded-[2rem]">
            <h3 className="font-heading font-bold text-xl mb-4">{about.teachingTitle}</h3>
            <div className="space-y-4">
              {about.teaching.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <div><div className="font-medium text-sm">{item.name}</div><div className="text-xs text-neutral-400 mt-1">{item.desc}</div></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* — Certificaciones — */}
      <div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">{certs.label}</div>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight mb-4 flex flex-col sm:flex-row sm:items-baseline gap-2">
            <span>{certs.title}</span>
            <span className="text-5xl md:text-7xl text-gradient uppercase tracking-tighter">{certs.titleEm}</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mb-16 leading-relaxed">{certs.sub}</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className={`font-heading font-bold text-2xl mb-6 flex items-center gap-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                <BadgeCheck className="w-6 h-6 text-blue-400" />{certs.googleEducation.title}
              </h3>
              {certs.googleEducation.items.map(c => certCard(c, 'blue'))}
            </div>
            <div className="space-y-4">
              <h3 className={`font-heading font-bold text-2xl mb-6 flex items-center gap-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                <BadgeCheck className="w-6 h-6 text-amber-400" />{certs.googleCareer.title}
              </h3>
              {certs.googleCareer.items.map(c => certCard(c, 'amber'))}
            </div>
            <div className="space-y-4">
              <h3 className={`font-heading font-bold text-2xl mb-6 flex items-center gap-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                <BadgeCheck className="w-6 h-6 text-cyan-400" />{certs.ai.title}
              </h3>
              {certs.ai.items.map(c => certCard(c, 'cyan'))}
            </div>
          </div>

          {/* Kibernum */}
          <div className="mt-16 space-y-6">
            <h3 className={`font-heading font-bold text-2xl flex items-center gap-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              <Award className="w-6 h-6 text-cyan-400" />{certs.kibernum.title}
            </h3>
            <div className={`p-8 rounded-[2rem] ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-neutral-200'}`}>
              <div className={`space-y-6 relative before:absolute before:inset-0 before:ml-1.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent ${isDark ? 'before:via-neutral-800' : 'before:via-neutral-200'} before:to-transparent`}>
                {certs.kibernum.items.map((cert, i) => (
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
      </div>
    </div>
  );
}
