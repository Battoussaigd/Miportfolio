import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Loader } from 'lucide-react';

interface EmprendedoresFormData {
  nombre: string;
  email: string;
  emprendimiento: string;
  servicio: string;
  desafio: string;
}

interface MujeresFormData {
  nombre: string;
  email: string;
  hijos: string;
  aprender: string;
}

interface CoursesSectionProps {
  isDark: boolean;
}

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzzD9gEFi30QfTcdqc5VVsZmL0UsSXyLeOP6kAYK3X2SWMskMHUdHv7MlDRnOMPtyF6oA/exec';

const CourseCard = ({
  title,
  isMainCourse,
  onEnroll,
  isDark
}: {
  title: string,
  isMainCourse: boolean,
  onEnroll: () => void,
  isDark: boolean
}) => (
  <motion.div
    whileHover={{ y: isMainCourse ? -5 : 0 }}
    className={`rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center transition-all ${
      isMainCourse
        ? `cursor-pointer bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 hover:border-cyan-500/70`
        : `${isDark ? 'bg-neutral-800/40 border border-neutral-700/40' : 'bg-neutral-100/60 border border-neutral-200/60'}`
    }`}
    onClick={isMainCourse ? onEnroll : undefined}
  >
    {isMainCourse && (
      <div className="mb-4">
        <span className="inline-block bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 px-3 py-1 rounded-full text-xs font-semibold">
          ✓ DISPONIBLE AHORA
        </span>
      </div>
    )}

    <h3 className={`font-heading font-bold text-base leading-snug ${
      isMainCourse ? 'text-cyan-400' : isDark ? 'text-neutral-500' : 'text-neutral-400'
    }`}>
      {title}
    </h3>

    {isMainCourse && (
      <p className="text-xs text-neutral-400 mt-3">
        Haz clic para inscribirte →
      </p>
    )}

    {!isMainCourse && (
      <p className={`text-xs mt-2 ${isDark ? 'text-neutral-600' : 'text-neutral-400'}`}>
        Próximamente
      </p>
    )}
  </motion.div>
);

export const CoursesSection = ({ isDark }: CoursesSectionProps) => {
  const [activeForm, setActiveForm] = useState<'emprendedores' | 'mujeres' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const [emprendedoresData, setEmprendedoresData] = useState<EmprendedoresFormData>({
    nombre: '', email: '', emprendimiento: '', servicio: '', desafio: ''
  });

  const [mujeresData, setMujeresData] = useState<MujeresFormData>({
    nombre: '', email: '', hijos: '', aprender: ''
  });

  const handleEmprendedoresChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmprendedoresData(prev => ({ ...prev, [name]: value }));
    setFormError('');
  };

  const handleMujeresChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMujeresData(prev => ({ ...prev, [name]: value }));
    setFormError('');
  };

  const closeForm = () => {
    if (isSubmitting) return;
    setActiveForm(null);
    setSubmitSuccess(false);
    setFormError('');
  };

  const handleEmprendedoresSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!emprendedoresData.nombre.trim() || !emprendedoresData.email.trim()) {
      setFormError('Nombre y correo electrónico son requeridos.');
      return;
    }
    setIsSubmitting(true);
    setFormError('');
    try {
      const params = new URLSearchParams();
      params.append('sheet', 'Taller_emp_Pilla');
      params.append('nombre', emprendedoresData.nombre);
      params.append('email', emprendedoresData.email);
      params.append('emprendimiento', emprendedoresData.emprendimiento);
      params.append('servicio', emprendedoresData.servicio);
      params.append('desafio', emprendedoresData.desafio);

      await fetch(`${SCRIPT_URL}?${params.toString()}`, { method: 'GET', mode: 'no-cors' });

      setSubmitSuccess(true);
      setEmprendedoresData({ nombre: '', email: '', emprendimiento: '', servicio: '', desafio: '' });
      setTimeout(closeForm, 2500);
    } catch (error) {
      setFormError('Error al enviar el formulario. Por favor intenta de nuevo.');
      console.error('Form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMujeresSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!mujeresData.nombre.trim() || !mujeresData.email.trim()) {
      setFormError('Nombre y correo electrónico son requeridos.');
      return;
    }
    setIsSubmitting(true);
    setFormError('');
    try {
      const params = new URLSearchParams();
      params.append('sheet', 'Taller_Mujeres_Pilla');
      params.append('nombre', mujeresData.nombre);
      params.append('email', mujeresData.email);
      params.append('hijos', mujeresData.hijos);
      params.append('aprender', mujeresData.aprender);

      await fetch(`${SCRIPT_URL}?${params.toString()}`, { method: 'GET', mode: 'no-cors' });

      setSubmitSuccess(true);
      setMujeresData({ nombre: '', email: '', hijos: '', aprender: '' });
      setTimeout(closeForm, 2500);
    } catch (error) {
      setFormError('Error al enviar el formulario. Por favor intenta de nuevo.');
      console.error('Form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const courses = [
    { id: 1, title: 'Taller IA Emprendedores Pillanlelbún', isMain: true, form: 'emprendedores' as const },
    { id: 2, title: 'Taller IAgen Mujeres Pillanlelbún', isMain: true, form: 'mujeres' as const },
    { id: 3, title: 'Próximamente', isMain: false, form: null },
    { id: 4, title: 'Próximamente', isMain: false, form: null },
    { id: 5, title: 'Próximamente', isMain: false, form: null }
  ];

  const inputClass = `w-full px-4 py-2.5 rounded-lg outline-none transition-all text-sm ${
    isDark
      ? 'bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:border-cyan-500/60'
      : 'bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-cyan-500/60'
  } disabled:opacity-50`;

  const labelClass = `block text-xs font-semibold mb-1.5 uppercase tracking-wide ${
    isDark ? 'text-neutral-400' : 'text-neutral-500'
  }`;

  return (
    <>
      <section id="cursos" className={`py-20 px-4 md:px-8 ${isDark ? 'bg-black/40' : 'bg-neutral-50/40'}`}>
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <span className={`font-mono text-xs font-bold tracking-wider uppercase ${
              isDark ? 'text-cyan-400/60' : 'text-cyan-600/60'
            }`}>
              📚 Formación
            </span>

            <h2 className="font-heading font-extrabold text-4xl md:text-5xl mt-3 mb-4">
              Mis <span className="text-cyan-400">Cursos</span>
            </h2>

            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Talleres prácticos para que emprendedores y comunidades incorporen IA con criterio y resultados reales.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {courses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="min-h-[160px]"
              >
                <CourseCard
                  title={course.title}
                  isMainCourse={course.isMain}
                  onEnroll={() => course.form && setActiveForm(course.form)}
                  isDark={isDark}
                />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Modal Taller IA Emprendedores */}
      <AnimatePresence>
        {activeForm === 'emprendedores' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeForm}
          >
            <motion.div
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 24 }}
              className={`w-full max-w-lg p-8 rounded-2xl relative overflow-y-auto max-h-[90vh] ${
                isDark ? 'bg-neutral-900 border border-neutral-800' : 'bg-white border border-neutral-200'
              }`}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={closeForm} disabled={isSubmitting}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-300 transition-colors disabled:opacity-40">
                <X className="w-5 h-5" />
              </button>

              {submitSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className={`font-heading font-bold text-xl mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    ¡Inscripción recibida!
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Gracias por tu interés. Nos pondremos en contacto pronto con los detalles del taller.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-6">
                    <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Inscripción</span>
                    <h3 className={`font-heading font-bold text-2xl mt-1 mb-1 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      Taller IA Emprendedores
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      Pillanlelbún · Completa tus datos para reservar tu cupo
                    </p>
                  </div>

                  <form onSubmit={handleEmprendedoresSubmit} className="space-y-4">
                    <div>
                      <label className={labelClass}>Nombre completo *</label>
                      <input type="text" name="nombre" value={emprendedoresData.nombre}
                        onChange={handleEmprendedoresChange} disabled={isSubmitting}
                        placeholder="Tu nombre completo" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Correo electrónico *</label>
                      <input type="email" name="email" value={emprendedoresData.email}
                        onChange={handleEmprendedoresChange} disabled={isSubmitting}
                        placeholder="tu@correo.com" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Nombre de su emprendimiento o idea</label>
                      <input type="text" name="emprendimiento" value={emprendedoresData.emprendimiento}
                        onChange={handleEmprendedoresChange} disabled={isSubmitting}
                        placeholder="Ej: Panadería La Esperanza" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>¿Qué vende o qué servicio ofrece?</label>
                      <input type="text" name="servicio" value={emprendedoresData.servicio}
                        onChange={handleEmprendedoresChange} disabled={isSubmitting}
                        placeholder="Ej: Vendo pan artesanal y tortas" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>¿Cuál es su mayor desafío o qué le gustaría automatizar/diseñar?</label>
                      <textarea name="desafio" value={emprendedoresData.desafio}
                        onChange={handleEmprendedoresChange} disabled={isSubmitting}
                        placeholder="Cuéntanos qué te cuesta más o qué te gustaría mejorar..."
                        rows={3} className={`${inputClass} resize-none`} />
                    </div>

                    {formError && (
                      <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm">
                        {formError}
                      </div>
                    )}

                    <button type="submit" disabled={isSubmitting}
                      className="w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                      {isSubmitting ? <><Loader className="w-4 h-4 animate-spin" />Enviando...</> : 'Enviar'}
                    </button>
                  </form>

                  <p className={`text-xs text-center mt-4 ${isDark ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    Tus datos serán tratados con confidencialidad
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Taller IAgen Mujeres */}
      <AnimatePresence>
        {activeForm === 'mujeres' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeForm}
          >
            <motion.div
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 24 }}
              className={`w-full max-w-lg p-8 rounded-2xl relative overflow-y-auto max-h-[90vh] ${
                isDark ? 'bg-neutral-900 border border-neutral-800' : 'bg-white border border-neutral-200'
              }`}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={closeForm} disabled={isSubmitting}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-300 transition-colors disabled:opacity-40">
                <X className="w-5 h-5" />
              </button>

              {submitSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className={`font-heading font-bold text-xl mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    ¡Inscripción recibida!
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Gracias por tu interés. Nos pondremos en contacto pronto con los detalles del taller.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-6">
                    <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Inscripción</span>
                    <h3 className={`font-heading font-bold text-2xl mt-1 mb-1 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      Taller IAgen Mujeres
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      Pillanlelbún · Completa tus datos para reservar tu cupo
                    </p>
                  </div>

                  <form onSubmit={handleMujeresSubmit} className="space-y-4">
                    <div>
                      <label className={labelClass}>Nombre completo *</label>
                      <input type="text" name="nombre" value={mujeresData.nombre}
                        onChange={handleMujeresChange} disabled={isSubmitting}
                        placeholder="Tu nombre completo" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Correo electrónico *</label>
                      <input type="email" name="email" value={mujeresData.email}
                        onChange={handleMujeresChange} disabled={isSubmitting}
                        placeholder="tu@correo.com" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>¿Tienes hijos? ¿Cuántos?</label>
                      <input type="text" name="hijos" value={mujeresData.hijos}
                        onChange={handleMujeresChange} disabled={isSubmitting}
                        placeholder="Ej: Sí, 2 hijos" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>¿Qué te gustaría aprender en este taller?</label>
                      <textarea name="aprender" value={mujeresData.aprender}
                        onChange={handleMujeresChange} disabled={isSubmitting}
                        placeholder="Cuéntanos qué esperas aprender..."
                        rows={3} className={`${inputClass} resize-none`} />
                    </div>

                    {formError && (
                      <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm">
                        {formError}
                      </div>
                    )}

                    <button type="submit" disabled={isSubmitting}
                      className="w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                      {isSubmitting ? <><Loader className="w-4 h-4 animate-spin" />Enviando...</> : 'Enviar'}
                    </button>
                  </form>

                  <p className={`text-xs text-center mt-4 ${isDark ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    Tus datos serán tratados con confidencialidad
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CoursesSection;
