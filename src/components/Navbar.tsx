import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, Lock, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const navLinks = {
  es: [
    { label: 'Servicios', href: '/' },
    { label: 'Sobre mí', href: '/sobre-mi' },
    { label: 'Certificaciones', href: '/certificaciones' },
    { label: 'Cursos', href: '/cursos' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Propósito', href: '/proposito' },
    { label: 'Seguridad', href: '/seguridad' },
    { label: 'Contacto', href: '/contacto' },
  ],
  en: [
    { label: 'Services', href: '/' },
    { label: 'About', href: '/sobre-mi' },
    { label: 'Certifications', href: '/certificaciones' },
    { label: 'Courses', href: '/cursos' },
    { label: 'Projects', href: '/proyectos' },
    { label: 'Purpose', href: '/proposito' },
    { label: 'Security', href: '/seguridad' },
    { label: 'Contact', href: '/contacto' },
  ],
};

export default function Navbar() {
  const { isDark, lang, toggleTheme, toggleLang } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMobileMenuOpen(false); }, [location.pathname]);

  const links = navLinks[lang];

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname === href;

  const handleMunicipal = () => {
    navigate('/?acceso=1');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-12 flex items-center justify-between ${
      isScrolled
        ? isDark ? 'bg-black/80 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl shadow-sm'
        : 'bg-transparent'
    }`}>
      {/* Mobile hamburger */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`p-2 -ml-2 rounded-lg transition-colors ${isDark ? 'text-neutral-300 hover:bg-white/10' : 'text-neutral-700 hover:bg-neutral-200'}`}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop nav */}
      <div className={`hidden md:flex items-center gap-6 px-6 py-3 rounded-full transition-all duration-300 ${
        isDark ? 'bg-white/5 backdrop-blur-xl border border-white/10' : 'bg-white/80 backdrop-blur-xl border border-neutral-200 shadow-md'
      }`}>
        {links.map(link => (
          <Link
            key={link.href}
            to={link.href}
            className={`text-sm font-medium transition-colors ${
              isActive(link.href)
                ? 'text-cyan-400'
                : isDark ? 'text-neutral-400 hover:text-neutral-50' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleLang}
          className="glass-panel w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium hover:text-cyan-400 transition-colors"
        >
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
        <button
          onClick={toggleTheme}
          className="glass-panel w-10 h-10 rounded-full flex items-center justify-center hover:text-cyan-400 transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button
          onClick={handleMunicipal}
          className="flex items-center gap-2 bg-cyan-400 text-neutral-950 px-3 sm:px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
        >
          <Lock className="w-4 h-4" />
          <span className="hidden sm:inline">{lang === 'es' ? 'Acceso Municipal' : 'Municipal Access'}</span>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 md:hidden bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`absolute top-full left-6 w-64 mt-2 p-6 rounded-2xl border shadow-2xl flex flex-col gap-5 md:hidden z-50 ${
                isDark ? 'bg-neutral-900/95 border-white/10' : 'bg-white/95 border-neutral-200'
              } backdrop-blur-xl`}
            >
              {links.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-lg font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-cyan-400'
                      : isDark ? 'text-neutral-200 hover:text-cyan-400' : 'text-neutral-800 hover:text-cyan-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className={`h-px w-full ${isDark ? 'bg-neutral-700' : 'bg-neutral-200'}`} />
              <button
                onClick={handleMunicipal}
                className="text-lg font-medium text-cyan-500 flex items-center gap-2"
              >
                <Lock className="w-5 h-5" />
                {lang === 'es' ? 'Acceso Municipal' : 'Municipal Access'}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
