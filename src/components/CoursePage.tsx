import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Clock, Users, Calendar } from 'lucide-react';
import type { CourseData } from '../data/courses.data';

interface CoursePageProps {
  course: CourseData;
  isDark: boolean;
}

export default function CoursePage({ course, isDark }: CoursePageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className={`min-h-screen font-sans ${isDark ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900'}`}>

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${course.imagen})` }}
        />
        <div className="absolute inset-0 bg-neutral-950/60" />

        {/* Botón volver */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Cursos
        </button>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pb-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-[#7d1e1e] text-xs font-bold tracking-[0.2em] uppercase mb-3">
              {course.subtitulo}
            </p>
            <h1
              className="font-sans font-extrabold text-white leading-[1.1] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
            >
              {course.titulo}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Info del curso */}
      <section className="py-16 px-6 md:px-12 max-w-5xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className={`grid grid-cols-2 md:grid-cols-4 gap-px ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'} rounded-2xl overflow-hidden`}
        >
          {[
            { icon: <Calendar className="w-5 h-5" />, label: 'Fecha', value: course.fecha },
            { icon: <Clock className="w-5 h-5" />, label: 'Duración', value: course.duracion },
            { icon: <Users className="w-5 h-5" />, label: 'Participantes', value: course.participantes },
            { icon: <MapPin className="w-5 h-5" />, label: 'Ubicación', value: course.ubicacion },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center text-center p-8 gap-3 ${isDark ? 'bg-neutral-900' : 'bg-white'}`}
            >
              <div className="text-[#7d1e1e]">{item.icon}</div>
              <p className={`text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                {item.label}
              </p>
              <p className={`text-sm font-medium ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                {item.value}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ¿Qué fue este taller? */}
      <section className="py-8 px-6 md:px-12 max-w-5xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2
            className={`font-sans font-extrabold mb-10 tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}
          >
            ¿De qué se trata este taller?
          </h2>
          <div className="space-y-6 max-w-3xl">
            {course.descripcion.map((parrafo, i) => (
              <p
                key={i}
                className={`text-lg leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}
              >
                {parrafo}
              </p>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contenido técnico */}
      <section className={`py-16 px-6 md:px-12 mt-8 ${isDark ? 'bg-neutral-900/60' : 'bg-neutral-50'}`}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2
              className={`font-sans font-extrabold mb-10 tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}
            >
              Contenidos del taller
            </h2>
            <ul className="space-y-4 max-w-2xl">
              {course.contenidos.map((item, i) => (
                <motion.li
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  transition={{ delay: i * 0.06 }}
                  className={`flex items-start gap-4 text-base ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7d1e1e] shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Testimonio */}
      {course.testimonio && (
        <section className="py-16 px-6 md:px-12 max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <blockquote
              className={`text-2xl md:text-3xl font-serif italic font-normal leading-relaxed max-w-3xl border-l-4 border-[#7d1e1e] pl-8 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}
              style={{ letterSpacing: '-0.01em' }}
            >
              "{course.testimonio}"
            </blockquote>
            {course.testimonioAutor && (
              <p className={`mt-4 pl-8 text-sm font-medium ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                — {course.testimonioAutor}
              </p>
            )}
          </motion.div>
        </section>
      )}

      {/* Footer de navegación */}
      <footer className={`py-12 px-6 md:px-12 border-t ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-900'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Cursos
          </button>
          <div className="flex items-center gap-6">
            <a
              href="/#contacto"
              className={`text-sm font-medium transition-colors ${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              Contactar
            </a>
            <a
              href="/"
              className={`text-sm font-medium transition-colors ${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              Inicio
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
