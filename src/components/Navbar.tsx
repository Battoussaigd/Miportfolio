import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

const navLinks = {
  es: [
    { label: 'Servicios', href: '/' },
    { label: 'Sobre mí', href: '/sobre-mi' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Propósito', href: '/proposito' },
    { label: 'Contacto', href: '/contacto' },
  ],
  en: [
    { label: 'Services', href: '/' },
    { label: 'About', href: '/sobre-mi' },
    { label: 'Projects', href: '/proyectos' },
    { label: 'Purpose', href: '/proposito' },
    { label: 'Contact', href: '/contacto' },
  ],
};

export default function Navbar() {
  const { isDark, lang, toggleTheme, toggleLang } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Desktop: blur background on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile: hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current < 10) {
        setMobileVisible(true);
      } else if (current > lastScrollY.current + 8) {
        setMobileVisible(false);
      } else if (current < lastScrollY.current - 8) {
        setMobileVisible(true);
      }
      lastScrollY.current = current;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Always show mobile bar when route changes
  useEffect(() => { setMobileVisible(true); }, [location.pathname]);

  const links = navLinks[lang];
  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname === href;

  const handleMunicipal = () => navigate('/?acceso=1');

  return (
    <>
      {/* ── DESKTOP NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-12 hidden md:flex items-center justify-between ${
        isScrolled
          ? isDark ? 'bg-black/80 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl shadow-sm'
          : 'bg-transparent'
      }`}>
        <div className={`flex items-center gap-6 px-6 py-3 rounded-full transition-all duration-300 ${
          isDark ? 'bg-white/5 backdrop-blur-xl border border-white/10' : 'bg-white/80 backdrop-blur-xl border border-neutral-200 shadow-md'
        }`}>
          {links.map(link => (
            <Link key={link.href} to={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'text-cyan-400'
                  : isDark ? 'text-neutral-400 hover:text-neutral-50' : 'text-neutral-600 hover:text-neutral-900'
              }`}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleLang}
            className="glass-panel w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium hover:text-cyan-400 transition-colors">
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button onClick={toggleTheme}
            className="glass-panel w-10 h-10 rounded-full flex items-center justify-center hover:text-cyan-400 transition-colors">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={handleMunicipal}
            className="flex items-center gap-2 bg-cyan-400 text-neutral-950 px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform">
            <Lock className="w-4 h-4" />
            <span>{lang === 'es' ? 'Acceso Municipal' : 'Municipal Access'}</span>
          </button>
        </div>
      </nav>

      {/* ── MOBILE TAB BAR ── */}
      <AnimatePresence>
        {mobileVisible && (
          <motion.div
            key="mobile-bar"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`fixed top-0 left-0 right-0 z-50 md:hidden ${
              isDark ? 'bg-black/85 border-b border-white/10' : 'bg-white/90 border-b border-neutral-200'
            } backdrop-blur-xl`}
          >
            {/* Top row: controls */}
            <div className="flex items-center justify-between px-4 pt-3 pb-1">
              <span className={`text-xs font-bold tracking-widest uppercase ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Claudio G.D.
              </span>
              <div className="flex items-center gap-2">
                <button onClick={toggleLang}
                  className={`text-xs font-bold px-2.5 py-1 rounded-full border transition-colors ${
                    isDark ? 'border-white/20 text-neutral-300 hover:text-cyan-400' : 'border-neutral-300 text-neutral-600 hover:text-cyan-600'
                  }`}>
                  {lang === 'es' ? 'EN' : 'ES'}
                </button>
                <button onClick={toggleTheme}
                  className={`p-1.5 rounded-full transition-colors ${isDark ? 'text-neutral-400 hover:text-cyan-400' : 'text-neutral-500 hover:text-cyan-600'}`}>
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <button onClick={handleMunicipal}
                  className="flex items-center gap-1 bg-cyan-400 text-neutral-950 px-2.5 py-1 rounded-full text-xs font-bold">
                  <Lock className="w-3 h-3" />
                  {lang === 'es' ? 'Municipal' : 'Access'}
                </button>
              </div>
            </div>

            {/* Bottom row: scrollable tab links */}
            <div className="flex overflow-x-auto scrollbar-hide px-3 pb-3 pt-1 gap-1">
              {links.map(link => (
                <Link key={link.href} to={link.href}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive(link.href)
                      ? 'bg-cyan-400 text-neutral-950 shadow-md shadow-cyan-400/30'
                      : isDark
                        ? 'text-neutral-400 hover:text-white hover:bg-white/10'
                        : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}>
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
