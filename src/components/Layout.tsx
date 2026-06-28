import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import Navbar from './Navbar';
import AdminPanel from './AdminPanel';
import { useApp } from '../context/AppContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isDark, lang } = useApp();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans selection:bg-cyan-500/30 relative">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-600/30 blur-[100px] animate-float-1" />
          <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-600/20 blur-[100px] animate-float-2" />
          <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-teal-600/20 blur-[100px] animate-float-3" />
        </div>
      </div>

      <Navbar />

      <main>{children}</main>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-white/10 text-sm text-neutral-500 relative">
        <p>
          © 2026 <span className="text-cyan-400 font-medium">Claudio González Díaz</span> · Pillanlelbún, La Araucanía ·{' '}
          <span className="text-cyan-400">claudioegdiaz@gmail.com</span> · +56 9 5105 6018
        </p>
        <button
          onClick={() => setIsAdminOpen(true)}
          className="absolute bottom-4 left-6 text-xs text-neutral-600 hover:text-cyan-400 transition-colors"
        >
          {lang === 'es' ? 'Admin' : 'Admin'}
        </button>
      </footer>

      {/* WhatsApp */}
      <a
        href="https://wa.me/56951056018"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[160] w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:scale-110 hover:shadow-[0_6px_30px_rgba(37,211,102,0.7)] transition-all duration-300"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
      </a>

      {/* Admin Panel */}
      <AnimatePresence>
        {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
