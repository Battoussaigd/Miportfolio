/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, Lock, ArrowRight, Download, MessageCircle, CheckCircle2, MapPin, Clock, Shield, Zap, BookOpen, Users, GraduationCap, Heart, DollarSign, ShieldCheck, Menu, X, Send, Award, ExternalLink, BadgeCheck } from 'lucide-react';
import { db } from './firebase';
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import AdminPanel from './components/AdminPanel';
import PrivateView from './components/PrivateView';

const content = {
  es: {
    nav: { about: "Sobre mí", certs: "Certificaciones", projects: "Proyectos", purpose: "Propósito", contact: "Contacto", municipal: "Acceso Municipal" },
    hero: {
      badge: "Colaborador CCHIA · La Araucanía, Chile",
      role: "Técnico Programador · IA Generativa Aplicada · Relator",
      phrase: "El futuro también se construye desde La Araucanía.",
      viewProjects: "Ver proyectos",
      contact: "Contactar"
    },
    stats: [
      { n: "13+", l: "años experiencia" },
      { n: "95%", l: "reducción tiempos" },
      { n: "4", l: "proyectos activos" },
      { n: "2+", l: "comunas en gestión" }
    ],
    about: {
      label: "Perfil", title: "Sobre ", titleEm: "mí",
      sub: "Autodidacta, técnico y relator. 13 años optimizando procesos, 2 años construyendo con IA.",
      cards: {
        profile: { title: "Perfil profesional", desc: "Técnico en Programación con sólida experiencia en logística y rutas. Especializado en IA Generativa aplicada, desarrollo de PWAs y automatización. Foco en democratizar la tecnología en comunidades rurales y municipios." },
        certs: { title: "Certificaciones IA" },
        tech: { title: "Tecnologías" },
        teaching: { title: "Experiencia como relator" }
      }
    },
    certs: {
      label: "Formación", title: "Mis ", titleEm: "certificaciones",
      sub: "Validación continua de habilidades técnicas y desarrollo profesional.",
      ai: {
        title: "Inteligencia Artificial & Tecnología",
        items: [
          { year: "2026", title: "Hazlo con IA", issuer: "CENIA", desc: "7 cursos de uso de IA Generativa para mipymes" },
          { year: "2025", title: "Líder en IA Generativa", issuer: "Google Skills", desc: "30 horas de formación", link: "https://www.skills.google/public_profiles/d9d54821-ff5f-4ec0-9b6a-0ffe57074454" },
          { year: "2025", title: "Inmersión IA con Google Gemini", issuer: "Alura", desc: "Ingeniería de Prompts y aplicaciones reales con GEMS (3 horas)" },
          { year: "2025", title: "IA Workflow", issuer: "BIG school", desc: "6 horas" },
          { year: "2025", title: "Microsoft Excel Completo", issuer: "Udemy", desc: "12 horas" },
          { year: "2024", title: "Inteligencia Artificial y productividad", issuer: "Santander Open Academy - Google", desc: "" }
        ]
      },
      kibernum: {
        title: "Desarrollo Profesional (Kibernum)",
        items: [
          { year: "2025", title: "Gestión del Modelo de Prevención del Delito Digital", desc: "210 horas" },
          { year: "2024", title: "Gestión de la Diversidad e Inclusión Laboral y Social", desc: "140 horas" },
          { year: "2023", title: "Mindset Agile para Colaboración Efectiva", desc: "160 horas" },
          { year: "2022", title: "Herramientas del lenguaje TI en reclutamiento", desc: "160 horas" },
          { year: "2020", title: "Seguridad de la Información en Sistemas Informáticos", desc: "100 horas" },
          { year: "2020", title: "Uso y Aplicación de Excel en Administración de Datos", desc: "100 horas" },
          { year: "2018", title: "Técnicas para el Trabajo en Equipo", desc: "70 horas" },
          { year: "2011", title: "Administración de Base de Datos Oracle 11g", desc: "210 horas" }
        ]
      }
    },
    projects: {
      label: "Trabajo", title: "Mis ", titleEm: "proyectos",
      sub: "Soluciones reales para problemas reales. Construidas con IA, para personas.",
      items: [
        { icon: <Shield className="w-8 h-8 text-cyan-400" />, name: "HADES 2.1", desc: "PWA local-first con cifrado AES-GCM. Sin servidores, sin nube. Los datos nunca salen del dispositivo.", tags: ["PWA", "Web Crypto API", "AES-GCM"], impact: "🔒 Seguridad máxima" },
        { icon: <Zap className="w-8 h-8 text-cyan-400" />, name: "Automatización CCU", desc: "Automatiza el alta de clientes en Roadnet con validación Google Maps API, organización por región y exportación al formato CCU.", tags: ["Apps Script", "Maps API", "Sheets"], impact: "📉 6 horas → 10 minutos · ROI +10%" },
        { icon: <MessageCircle className="w-8 h-8 text-cyan-400" />, name: "Polaris", desc: "Chatbot de texto y voz creado para brindar apoyo médico (consejos no diagnósticos) y moral a pacientes con enfermedades autoinmunes.", tags: ["Chatbot", "IA de Voz", "Salud"], impact: "💙 Apoyo 24/7 · Empatía IA" },
        { icon: <Clock className="w-8 h-8 text-cyan-400" />, name: "Milagrito", desc: "PWA para embarazo. Graba, transcribe y resume citas médicas. Incluye chatbot de salud, calendario y consejos de bienestar.", tags: ["PWA", "Speech-to-Text", "Salud"], impact: "👶 Control total del embarazo" },
      ]
    },
    cchia: {
      title: "Cámara Chilena de Inteligencia Artificial",
      desc: "Colaborador activo de la CCHIA — construyendo el ecosistema de IA responsable en Chile y Latinoamérica."
    },
    purpose: {
      label: "Propósito", title: "Ayudando a las personas a hacer del mundo un lugar mejor a través de ", titleEm: "software de calidad",
      p1: "Creo firmemente que la tecnología debe ser un igualador de oportunidades. Mi objetivo es crear herramientas que resuelvan problemas reales, empoderen a las personas y generen un impacto positivo en su día a día.",
      p2: "Ya sea para una iniciativa comunitaria, una PYME en crecimiento, una gran empresa o el sector público, diseño y construyo soluciones tecnológicas estables, escalables y seguras.",
      p3: "No entrego solo código o presentaciones bonitas. Entrego sistemas que la gente realmente usa: simples, accesibles y construidos para durar, aprovechando el poder de la Inteligencia Artificial.",
      p4: "Además de desarrollar, me apasiona profundamente enseñar. Mi misión personal es desmitificar la IA y hacer que la tecnología avanzada sea comprensible y alcanzable para todos, sin importar su origen o nivel técnico.",
      p5: "Soy Claudio González Díaz — llevo más de 13 años resolviendo problemas con tecnología. Si tienes una visión para mejorar tu entorno o tu organización, te ayudo a hacerla realidad.",
      cards: [
        { icon: "🛡️", title: "Arquitectura", val: "Segura y Escalable" },
        { icon: "⚡", title: "Tecnología", val: "IA & Desarrollo Web" },
        { icon: "🤝", title: "Enfoque", val: "Centrado en las personas" },
        { icon: "🏢", title: "Alcance", val: "Público y Privado" }
      ]
    },
    contact: {
      label: "Contacto", title: "Hablemos", sub: "¿Tienes un proyecto o quieres saber más? Escríbeme.",
      name: "Tu nombre", email: "Tu correo", msg: "Tu mensaje", send: "Enviar mensaje"
    },
    modal: {
      title1: "Acceso ", title2: "Municipal",
      desc: "Ingresa tu nombre y la clave de tu comuna para ver tu propuesta personalizada.",
      name: "Nombre completo", key: "Clave de acceso",
      err: "Datos incorrectos. Verifica tu nombre y clave.",
      cancel: "Cancelar", enter: "Ingresar"
    },
    private: {
      back: "Volver", welcome: "Bienvenida/o, ",
      prog: "Programa: ", cost: "Diseñado específicamente para su institución.",
      docs: "Documentos disponibles", dl: "Descargar"
    }
  },
  en: {
    nav: { about: "About", certs: "Certifications", projects: "Projects", purpose: "Purpose", contact: "Contact", municipal: "Municipal Access" },
    hero: {
      badge: "CCHIA Collaborator · La Araucanía, Chile",
      role: "Programmer · Applied Generative AI · Instructor",
      phrase: "The future is also built from La Araucanía.",
      viewProjects: "View projects",
      contact: "Contact"
    },
    stats: [
      { n: "13+", l: "years experience" },
      { n: "95%", l: "time reduction" },
      { n: "4", l: "active projects" },
      { n: "2+", l: "municipalities" }
    ],
    about: {
      label: "Profile", title: "About ", titleEm: "me",
      sub: "Self-taught, technical and instructor. 13 years optimizing, 2 years building with AI.",
      cards: {
        profile: { title: "Professional profile", desc: "Programming Technician with solid logistics and route planning experience. Specialized in applied Generative AI, PWA development and automation. Focus on democratizing technology in rural communities and municipalities." },
        certs: { title: "AI Certifications" },
        tech: { title: "Technologies" },
        teaching: { title: "Instructor experience" }
      }
    },
    certs: {
      label: "Education", title: "My ", titleEm: "certifications",
      sub: "Continuous validation of technical skills and professional development.",
      ai: {
        title: "Artificial Intelligence & Technology",
        items: [
          { year: "2026", title: "Do it with AI", issuer: "CENIA", desc: "7 courses on Generative AI for SMBs" },
          { year: "2025", title: "Generative AI Leader", issuer: "Google Skills", desc: "30 hours of training", link: "https://www.skills.google/public_profiles/d9d54821-ff5f-4ec0-9b6a-0ffe57074454" },
          { year: "2025", title: "AI Immersion with Google Gemini", issuer: "Alura", desc: "Prompt Engineering and real applications with GEMS (3 hours)" },
          { year: "2025", title: "AI Workflow", issuer: "BIG school", desc: "6 hours" },
          { year: "2025", title: "Complete Microsoft Excel", issuer: "Udemy", desc: "12 hours" },
          { year: "2024", title: "Artificial Intelligence and Productivity", issuer: "Santander Open Academy - Google", desc: "" }
        ]
      },
      kibernum: {
        title: "Professional Development (Kibernum)",
        items: [
          { year: "2025", title: "Digital Crime Prevention Model Management", desc: "210 hours" },
          { year: "2024", title: "Diversity and Social/Labor Inclusion Management", desc: "140 hours" },
          { year: "2023", title: "Agile Mindset for Effective Collaboration", desc: "160 hours" },
          { year: "2022", title: "IT Language Tools in Recruitment", desc: "160 hours" },
          { year: "2020", title: "Information Security Protocols and Procedures", desc: "100 hours" },
          { year: "2020", title: "Excel in Data Administration", desc: "100 hours" },
          { year: "2018", title: "Teamwork Techniques", desc: "70 hours" },
          { year: "2011", title: "Oracle 11g Database Administration", desc: "210 hours" }
        ]
      }
    },
    projects: {
      label: "Work", title: "My ", titleEm: "projects",
      sub: "Real solutions for real problems. Built with AI, for people.",
      items: [
        { icon: <Shield className="w-8 h-8 text-cyan-400" />, name: "HADES 2.1", desc: "Local-first PWA with AES-GCM encryption. No servers, no cloud. Data never leaves the device.", tags: ["PWA", "Web Crypto API", "AES-GCM"], impact: "🔒 Maximum security" },
        { icon: <Zap className="w-8 h-8 text-cyan-400" />, name: "CCU Automation", desc: "Automates customer onboarding in Roadnet with Google Maps API validation, regional organization and CCU format export.", tags: ["Apps Script", "Maps API", "Sheets"], impact: "📉 6 hours → 10 minutes · ROI +10%" },
        { icon: <MessageCircle className="w-8 h-8 text-cyan-400" />, name: "Polaris", desc: "Text and voice chatbot created to provide medical advice (non-diagnostic) and moral support to patients with autoimmune diseases.", tags: ["Chatbot", "Voice AI", "Health"], impact: "💙 24/7 Support · AI Empathy" },
        { icon: <Clock className="w-8 h-8 text-cyan-400" />, name: "Milagrito", desc: "Pregnancy PWA. Records, transcribes and summarizes medical appointments. Includes health chatbot, calendar and wellness tips.", tags: ["PWA", "Speech-to-Text", "Health"], impact: "👶 Full pregnancy tracking" },
      ]
    },
    cchia: {
      title: "Chilean Chamber of Artificial Intelligence",
      desc: "Active collaborator at CCHIA — building the responsible AI ecosystem in Chile and Latin America."
    },
    purpose: {
      label: "Purpose", title: "Helping people make the world a better place through ", titleEm: "quality software",
      p1: "I firmly believe that technology should be an equalizer of opportunities. My goal is to create tools that solve real problems, empower people, and generate a positive impact on their daily lives.",
      p2: "Whether for a community initiative, a growing SME, a large enterprise, or the public sector, I design and build stable, scalable, and secure technological solutions.",
      p3: "I don't just deliver code or pretty presentations. I deliver systems that people actually use: simple, accessible, and built to last, leveraging the power of Artificial Intelligence.",
      p4: "Beyond building software, I am deeply passionate about teaching. My personal mission is to demystify AI and make advanced technology understandable and accessible to everyone, regardless of their background or technical level.",
      p5: "I'm Claudio González Díaz — I've spent over 13 years solving problems with technology. If you have a vision to improve your environment or your organization, I'll help you make it a reality.",
      cards: [
        { icon: "🛡️", title: "Architecture", val: "Secure & Scalable" },
        { icon: "⚡", title: "Technology", val: "AI & Web Dev" },
        { icon: "🤝", title: "Focus", val: "People-centered" },
        { icon: "🏢", title: "Scope", val: "Public & Private" }
      ]
    },
    contact: {
      label: "Contact", title: "Let's talk", sub: "Have a project or want to know more? Write to me.",
      name: "Your name", email: "Your email", msg: "Your message", send: "Send message"
    },
    modal: {
      title1: "Municipal ", title2: "Access",
      desc: "Enter your name and municipality key to see your personalized proposal.",
      name: "Full name", key: "Access key",
      err: "Incorrect data. Check your name and key.",
      cancel: "Cancel", enter: "Enter"
    },
    private: {
      back: "Back", welcome: "Welcome, ",
      prog: "Program: ", cost: "Designed specifically for your institution.",
      docs: "Available documents", dl: "Download"
    }
  }
};

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [privateData, setPrivateData] = useState<any>(null);
  const [modalErr, setModalErr] = useState(false);
  const [isLoadingAccess, setIsLoadingAccess] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [accessForm, setAccessForm] = useState({ name: '', key: '' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: '¡Hola! Soy Demian, el asistente virtual de Claudio. ¿En qué te puedo ayudar hoy?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 100);
    }
  }, [chatMessages, isBotTyping, isChatOpen]);

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (!chatInput.trim() || isBotTyping) return;
    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');
    setIsBotTyping(true);
    try {
      const history = chatMessages.map(msg => ({
        role: msg.role === 'bot' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history })
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error al comunicarse con el servidor');
      }
      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'bot', text: data.text || 'Lo siento, tuve un problema al procesar tu mensaje.' }]);
    } catch (error: any) {
      setChatMessages(prev => [...prev, { role: 'bot', text: 'Demian dice: "Lo siento, tuve un problema técnico. Por favor, intenta de nuevo o contacta a Claudio."' }]);
    } finally {
      setIsBotTyping(false);
    }
  };

  const t = content[lang];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) { document.body.classList.remove('light'); }
    else { document.body.classList.add('light'); }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleLang = () => setLang(lang === 'es' ? 'en' : 'es');

  const handleAccess = async () => {
    const name = accessForm.name.trim().toLowerCase();
    const key = accessForm.key.trim();
    if (!name || !key) { setModalErr(true); return; }
    setIsLoadingAccess(true);
    setModalErr(false);
    try {
      const docRef = doc(db, 'municipalities', key);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.names && data.names.includes(name)) {
  setPrivateData({ ...data, authorityName: accessForm.name.trim() });
  setIsModalOpen(false);
  setAccessForm({ name: '', key: '' });
  document.body.style.overflow = 'hidden';

  // Log de acceso — envía correo
  const now = new Date();
  const fecha = now.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const hora = now.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
  fetch("https://formsubmit.co/ajax/claudioegdiaz@gmail.com", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({
      _subject: `🔐 Acceso: ${accessForm.name.trim()} — ${data.commune}`,
      nombre: accessForm.name.trim(),
      comuna: data.commune,
      fecha: fecha,
      hora: hora,
      _template: "table"
    })
  }).catch(() => {});
} else { setModalErr(true); }
      } else { setModalErr(true); }
    } catch { setModalErr(true); }
    setIsLoadingAccess(false);
  };

  const closePrivate = () => {
    setPrivateData(null);
    document.body.style.overflow = '';
  };

  const sendContact = async () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setIsSending(true);
    try {
      addDoc(collection(db, 'messages'), {
        name: contactForm.name, email: contactForm.email,
        message: contactForm.message, createdAt: serverTimestamp()
      }).catch(err => console.error("Firestore backup failed:", err));
      const response = await fetch("https://formsubmit.co/ajax/claudioegdiaz@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: contactForm.name, email: contactForm.email, message: contactForm.message,
          _replyto: contactForm.email, _subject: `Nuevo mensaje de portfolio de ${contactForm.name}`
        })
      });
      if (!response.ok) throw new Error("Error sending email");
      setSendSuccess(true);
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setSendSuccess(false), 5000);
    } catch {
      alert(lang === 'es' ? "Hubo un error al enviar el mensaje. Por favor intenta nuevamente." : "There was an error sending the message. Please try again.");
    }
    setIsSending(false);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] } }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-cyan-500/30 relative">

      {/* Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-600/30 blur-[100px] animate-float-1" />
          <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-600/20 blur-[100px] animate-float-2" />
          <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-teal-600/20 blur-[100px] animate-float-3" />
        </div>
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-12 flex items-center justify-between ${isScrolled ? 'bg-black/80 backdrop-blur-xl' : 'bg-transparent'} ${!isDark && isScrolled ? '!bg-white/90 shadow-sm' : ''}`}>
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`p-2 -ml-2 rounded-lg transition-colors ${isDark ? 'text-neutral-300 hover:bg-white/10' : 'text-neutral-700 hover:bg-neutral-200'}`}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className={`hidden md:flex items-center gap-8 px-8 py-3 rounded-full transition-all duration-300 ${!isDark ? 'bg-white/90 backdrop-blur-xl border border-neutral-200 shadow-md' : 'bg-white/5 backdrop-blur-xl border border-white/10'}`}>
          {[['#sobre-mi', t.nav.about], ['#certificaciones', t.nav.certs], ['#proyectos', t.nav.projects], ['#tecnologia', t.nav.purpose], ['#contacto', t.nav.contact]].map(([href, label]) => (
            <a key={href} href={href} className={`text-sm font-medium transition-colors ${isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'}`}>{label}</a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleLang} className="glass-panel w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium hover:text-cyan-400 transition-colors">
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button onClick={toggleTheme} className="glass-panel w-10 h-10 rounded-full flex items-center justify-center hover:text-cyan-400 transition-colors">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-cyan-400 text-neutral-950 px-3 sm:px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform">
            <Lock className="w-4 h-4" />
            <span className="hidden sm:inline">{t.nav.municipal}</span>
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 z-40 md:hidden bg-black/20 backdrop-blur-sm" />
              <motion.div key="menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={`absolute top-full left-6 w-64 mt-2 p-6 rounded-2xl border shadow-2xl flex flex-col gap-6 md:hidden z-50 ${isDark ? 'bg-neutral-900/95 border-white/10' : 'bg-white border-neutral-200'} backdrop-blur-xl`}>
                {[['#sobre-mi', t.nav.about], ['#certificaciones', t.nav.certs], ['#proyectos', t.nav.projects], ['#tecnologia', t.nav.purpose], ['#contacto', t.nav.contact]].map(([href, label]) => (
                  <a key={href} href={href} onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium transition-colors ${isDark ? 'text-neutral-200 hover:text-cyan-400' : 'text-neutral-800 hover:text-cyan-600'}`}>{label}</a>
                ))}
                <div className={`h-px w-full ${isDark ? 'bg-neutral-700' : 'bg-neutral-200'}`} />
                <button onClick={() => { setIsMobileMenuOpen(false); setIsModalOpen(true); }} className="text-lg font-medium text-cyan-500 flex items-center gap-2">
                  <Lock className="w-5 h-5" /> {t.nav.municipal}
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <video key={isDark ? 'dark' : 'light'} className="absolute inset-0 w-full h-full object-cover z-0" autoPlay muted loop playsInline>
          <source src={isDark ? "https://res.cloudinary.com/dyejf2wmt/video/upload/v1774651181/01_gfbhc6.mp4" : "https://res.cloudinary.com/dyejf2wmt/video/upload/v1774679464/02_d%C3%ADa_final_zslffq.mp4"} type="video/mp4" />
        </video>
        <div className={`absolute inset-0 z-10 ${isDark ? 'bg-gradient-to-b from-neutral-950/20 via-neutral-950/40 to-neutral-950' : 'bg-gradient-to-b from-white/30 via-white/50 to-white'}`} />

        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center pb-32">
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }} className={`font-heading font-medium text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-6 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Claudio<br />González Díaz
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className={`text-lg md:text-xl font-light max-w-2xl mx-auto mb-4 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            {t.hero.role}
          </motion.p>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.3 }} className={`font-serif italic text-xl md:text-2xl mb-8 ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
            {t.hero.phrase}
          </motion.p>

          {/* Badge CCHIA — destacado */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-4 border border-cyan-400/50"
            style={{ background: isDark ? 'rgba(0,212,255,0.12)' : 'rgba(0,119,170,0.1)', backdropFilter: 'blur(12px)' }}
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ boxShadow: '0 0 8px rgba(0,212,255,0.8)' }} />
            <span className={`text-sm font-semibold tracking-wide ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>{t.hero.badge}</span>
          </motion.div>

          {/* Pillanlelbún — destacado */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.5 }} className="flex items-center justify-center gap-2 text-sm mb-12">
            <MapPin className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
            <span className={`font-semibold ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>Pillanlelbún, Lautaro · La Araucanía</span>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#proyectos" className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
              {t.hero.viewProjects} <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contacto" className="btn-secondary w-full sm:w-auto text-center">
              {t.hero.contact}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-20 -mt-10 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {t.stats.map((s, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05 }}
              className={`p-6 rounded-3xl text-center border ${isDark ? 'bg-white/5 border-white/10 backdrop-blur-xl' : 'bg-white border-neutral-200 shadow-sm'}`}>
              <div className="font-heading font-extrabold text-4xl text-cyan-400 mb-1">{s.n}</div>
              <div className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="sobre-mi" className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">{t.about.label}</div>
          <h2 className={`font-heading font-extrabold text-4xl md:text-5xl tracking-tight mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            {t.about.title}<em className="font-serif font-normal italic text-gradient">{t.about.titleEm}</em>
          </h2>
          <p className={`text-lg max-w-2xl mb-12 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{t.about.sub}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="glass-panel p-8 rounded-[2rem]">
            <h3 className={`font-heading font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>{t.about.cards.profile.title}</h3>
            <p className={`leading-relaxed text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>{t.about.cards.profile.desc}</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }} className="glass-panel p-8 rounded-[2rem]">
            <h3 className={`font-heading font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>{t.about.cards.certs.title}</h3>
            <div className="space-y-4">
              {[
                { title: "CENIA — Hazlo con IA", sub: "7 cursos · IA Generativa para mipymes · 2026" },
                { title: "Google Skills Boost", sub: "Líder IA Generativa · 30 hrs · 2025" },
                { title: "Alura Latam — Inmersión IA", sub: "Gemini · Prompt Engineering · 2025" },
                { title: "BIG school — IA Workflow", sub: "6 horas · 2025" },
                { title: "Udemy — Microsoft Excel Completo", sub: "12 horas · 2025" },
                { title: "Santander Open Academy", sub: "Google: IA y productividad · 2024" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <div>
                    <div className={`font-medium text-sm ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>{item.title}</div>
                    <div className={`text-xs mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>{item.sub}</div>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <a href="#certificaciones" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                  {lang === 'es' ? 'Ver detalle completo' : 'View full details'} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="glass-panel p-8 rounded-[2rem]">
            <h3 className={`font-heading font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>{t.about.cards.tech.title}</h3>
            <div className="flex flex-wrap gap-2">
              {["Google AI Studio", "Gemini API", "Claude", "NotebookLM", "RAG", "Prompt Engineering", "HTML/CSS/JS", "PWA", "Apps Script", "Web Crypto API", "Firebase", "SAP R/3", "Roadnet"].map(tag => (
                <span key={tag} className={`text-xs font-medium px-3 py-1.5 rounded-lg border ${isDark ? 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20' : 'bg-cyan-50 text-cyan-700 border-cyan-200'}`}>{tag}</span>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }} className="glass-panel p-8 rounded-[2rem]">
            <h3 className={`font-heading font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>{t.about.cards.teaching.title}</h3>
            <div className="space-y-4">
              {[
                { title: "CCU", sub: lang === 'es' ? 'Formación tecnológica para nuevos ingresos' : 'Tech onboarding for new hires' },
                { title: "AXXON Chile", sub: "Windows · Office · 15 alumnos · 2007" },
                { title: "Centro E-MEC", sub: lang === 'es' ? 'Ofimática · Armado PCs · 16 alumnos · 2001–03' : 'Office · PC Assembly · 16 students · 2001–03' },
                { title: lang === 'es' ? 'Hogar Aldea Mis Amigos' : 'Aldea Mis Amigos Home', sub: lang === 'es' ? 'Relatoría voluntaria · 2003' : 'Volunteer instructor · 2003' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <div>
                    <div className={`font-medium text-sm ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>{item.title}</div>
                    <div className={`text-xs mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certificaciones" className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">{t.certs.label}</div>
          <h2 className={`font-heading font-extrabold text-3xl md:text-4xl tracking-tight mb-4 flex flex-col sm:flex-row sm:items-baseline gap-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            <span>{t.certs.title}</span><span className="text-5xl md:text-7xl text-gradient uppercase tracking-tighter">{t.certs.titleEm}</span>
          </h2>
          <p className={`text-lg max-w-2xl mb-16 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{t.certs.sub}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* IA Column */}
            <div className="space-y-6">
              <h3 className={`font-heading font-bold text-2xl mb-8 flex items-center gap-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                <BadgeCheck className="w-6 h-6 text-cyan-400" />
                {t.certs.ai.title}
              </h3>
              <div className="space-y-4">
                {t.certs.ai.items.map((cert, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}
                    className={`p-6 rounded-2xl transition-all duration-200 ${isDark ? 'bg-white/5 border border-white/10 hover:bg-cyan-400/10 hover:border-cyan-400/30 hover:shadow-[0_0_24px_rgba(0,212,255,0.15)] hover:-translate-y-0.5' : 'bg-white border border-neutral-200 hover:border-cyan-400/40 hover:shadow-lg hover:-translate-y-0.5'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className={`text-sm font-bold px-3 py-1 rounded-full inline-block ${isDark ? 'bg-cyan-400/10 text-cyan-400' : 'bg-cyan-50 text-cyan-700'}`}>{cert.year}</div>
                      {cert.link && (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className={`hover:text-cyan-400 transition-colors ${isDark ? 'text-neutral-400' : 'text-neutral-400'}`} title="Ver credencial">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    <h4 className={`font-bold text-lg mb-1 mt-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>{cert.title}</h4>
                    <div className={`text-sm font-medium mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>{cert.issuer}</div>
                    {cert.desc && <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{cert.desc}</p>}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Kibernum Column */}
            <div className="space-y-6">
              <h3 className={`font-heading font-bold text-2xl mb-8 flex items-center gap-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                <Award className="w-6 h-6 text-cyan-400" />
                {t.certs.kibernum.title}
              </h3>
              <div className={`p-8 rounded-[2rem] ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-neutral-200 shadow-sm'}`}>
                <div className="relative">
                  <motion.div
                    className={`absolute left-1.5 md:left-1/2 top-0 w-0.5 origin-top ${isDark ? 'bg-gradient-to-b from-cyan-400 via-cyan-400/50 to-transparent' : 'bg-gradient-to-b from-cyan-500 via-cyan-500/50 to-transparent'}`}
                    initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }} style={{ height: '100%' }}
                  />
                  <div className="space-y-6">
                    {t.certs.kibernum.items.map((cert, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: i * 0.08 }}
                        className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="relative flex items-center justify-center shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          <motion.div className="absolute w-6 h-6 rounded-full bg-cyan-400/20"
                            initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
                            transition={{ delay: i * 0.08 + 0.3, duration: 0.4 }} whileHover={{ scale: 1.8, opacity: 0 }} />
                          <motion.div
                            className={`w-3 h-3 rounded-full border-2 border-cyan-400 z-10 relative transition-all duration-300 group-hover:scale-150 group-hover:bg-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] ${isDark ? 'bg-neutral-900' : 'bg-white'}`}
                            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                            transition={{ delay: i * 0.08 + 0.2, type: "spring", stiffness: 300 }} />
                        </div>
                        <motion.div
                          className={`w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border transition-all duration-200 cursor-default ${isDark ? 'border-transparent hover:border-cyan-400/40 hover:bg-cyan-400/5 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'border-transparent hover:border-cyan-500/30 hover:bg-cyan-50 hover:shadow-md'}`}
                          whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                          <span className={`inline-block font-bold text-xs px-2 py-0.5 rounded-full mb-2 ${isDark ? 'bg-cyan-400/10 text-cyan-400' : 'bg-cyan-50 text-cyan-700'}`}>{cert.year}</span>
                          <h4 className={`font-medium text-sm mb-1 ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>{cert.title}</h4>
                          <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>{cert.desc}</p>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects */}
      <section id="proyectos" className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">{t.projects.label}</div>
          <h2 className={`font-heading font-extrabold text-3xl md:text-4xl tracking-tight mb-4 flex flex-col sm:flex-row sm:items-baseline gap-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            <span>{t.projects.title}</span><span className="text-5xl md:text-7xl text-gradient uppercase tracking-tighter">{t.projects.titleEm}</span>
          </h2>
          <p className={`text-lg max-w-2xl mb-12 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{t.projects.sub}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.projects.items.map((p, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05 }}
              className={`p-8 rounded-[2rem] flex flex-col group relative overflow-hidden border transition-all duration-200 ${isDark ? 'bg-white/5 border-white/10 hover:border-cyan-400/30 hover:bg-cyan-400/5' : 'bg-white border-neutral-200 hover:border-cyan-400/40 hover:shadow-lg'}`}>
              <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-[inset_0_0_0_1px_rgba(0,212,255,0.2)]" />
              <div className="relative z-10">
                <div className="mb-6">{p.icon}</div>
                <h3 className={`font-heading font-bold text-xl mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>{p.name}</h3>
                <p className={`text-sm leading-relaxed mb-6 flex-grow ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map(tag => (
                    <span key={tag} className={`text-[10px] font-medium px-2.5 py-1 rounded-md border ${isDark ? 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20' : 'bg-cyan-50 text-cyan-700 border-cyan-200'}`}>{tag}</span>
                  ))}
                </div>
                <div className={`pt-4 border-t text-xs font-semibold text-cyan-400 mt-auto ${isDark ? 'border-white/10' : 'border-neutral-100'}`}>
                  {p.impact}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CCHIA — tarjeta premium */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="relative overflow-hidden rounded-[2.5rem] p-12 text-center"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(0,40,80,0.4) 50%, rgba(0,212,255,0.06) 100%)'
              : 'linear-gradient(135deg, rgba(0,119,170,0.06) 0%, rgba(255,255,255,0.9) 50%, rgba(0,119,170,0.06) 100%)',
            border: isDark ? '1px solid rgba(0,212,255,0.25)' : '1px solid rgba(0,119,170,0.2)',
            boxShadow: isDark
              ? '0 0 60px rgba(0,212,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)'
              : '0 4px 32px rgba(0,119,170,0.1), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}>
          {/* Línea superior shimmer */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)' }} />

          <div className="flex justify-center mb-8">
            <img src="/cchia-logo.png" alt="Logo CCHIA"
              className="h-20 md:h-24 object-contain"
              style={{ filter: isDark ? 'brightness(0) invert(1)' : 'none' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling;
                if (fallback) (fallback as HTMLElement).classList.remove('hidden');
              }}
            />
            <div className="hidden flex-col items-center justify-center">
              <div className={`text-5xl md:text-6xl font-black tracking-tighter flex items-center ${isDark ? 'text-white' : 'text-[#003366]'}`}>
                <span>CC</span><span className="text-[#009999] -ml-1">H</span><span>I</span>
                <span className="text-transparent" style={{ WebkitTextStroke: '2px currentColor' }}>A</span>
              </div>
              <div className={`text-[0.6rem] md:text-xs font-bold tracking-widest mt-2 ${isDark ? 'text-white' : 'text-[#003366]'}`}>
                CÁMARA CHILENA DE INTELIGENCIA ARTIFICIAL
              </div>
            </div>
          </div>
          <h3 className="font-heading font-bold text-2xl md:text-3xl text-cyan-400 mb-4">{t.cchia.title}</h3>
          <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>{t.cchia.desc}</p>
        </motion.div>
      </section>

      {/* Purpose */}
      <section id="tecnologia" className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">{t.purpose.label}</div>
          <h2 className={`font-heading font-extrabold text-4xl md:text-5xl tracking-tight mb-16 max-w-3xl leading-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            {t.purpose.title}<em className="font-serif font-normal italic text-gradient">{t.purpose.titleEm}</em>
          </h2>
        </motion.div>
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`space-y-6 text-lg leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            <p>{t.purpose.p1}</p>
            <p>{t.purpose.p2}</p>
            <p>{t.purpose.p3}</p>
            <p>{t.purpose.p4}</p>
            <p className={`mt-8 pl-6 border-l-4 border-cyan-400 font-serif italic ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>{t.purpose.p5}</p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            {t.purpose.cards.map((c, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }} className="glass-panel p-6 rounded-[2rem] text-center">
                <div className="text-3xl mb-3">{c.icon}</div>
                <div className={`text-xs font-medium uppercase tracking-wider mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>{c.title}</div>
                <div className="font-heading font-extrabold text-xl text-cyan-400">{c.val}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contacto" className="py-24 px-6 max-w-xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">{t.contact.label}</div>
          <h2 className={`font-heading font-extrabold text-5xl tracking-tight mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>{t.contact.title}</h2>
          <p className={`text-lg ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{t.contact.sub}</p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-4">
          <input type="text" placeholder={t.contact.name} className="input-field" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} />
          <input type="email" placeholder={t.contact.email} className="input-field" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} />
          <textarea placeholder={t.contact.msg} className="input-field min-h-[160px] resize-y" value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} />
          <button onClick={sendContact} disabled={isSending || sendSuccess} className="btn-primary w-full flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
            {isSending ? <span className="animate-pulse">{lang === 'es' ? 'Enviando...' : 'Sending...'}</span>
              : sendSuccess ? <span className="flex items-center gap-2 text-green-400"><CheckCircle2 className="w-4 h-4" /> {lang === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}</span>
              : <>{t.contact.send} <ArrowRight className="w-4 h-4" /></>}
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className={`py-12 text-center border-t text-sm relative ${isDark ? 'border-white/10 text-neutral-500' : 'border-neutral-200 text-neutral-500'}`}>
        <p>© 2026 <span className="text-cyan-400 font-medium">Claudio González Díaz</span> · Pillanlelbún, La Araucanía · <span className="text-cyan-400">claudioegdiaz@gmail.com</span> · +56 9 5105 6018</p>
        <button onClick={() => setIsAdminOpen(true)} className="absolute bottom-4 left-6 text-xs text-neutral-600 hover:text-cyan-400 transition-colors">Admin</button>
      </footer>

      {/* WhatsApp */}
      <a href="https://wa.me/56951056018" target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-[160] w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:scale-110 hover:shadow-[0_6px_30px_rgba(37,211,102,0.7)] transition-all duration-300">
        <MessageCircle className="w-7 h-7 text-white fill-white" />
      </a>

      {/* Chatbot Demian */}
      {!privateData && (
        <div className="fixed bottom-28 right-8 z-[170] flex flex-col items-end">
          <AnimatePresence>
            {isChatOpen && (
              <motion.div initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }}
                className={`mb-4 w-[calc(100vw-4rem)] sm:w-96 h-[500px] max-h-[70vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border ${isDark ? 'bg-neutral-900/95 border-white/10' : 'bg-white border-neutral-200'} backdrop-blur-xl`}>
                <div className={`p-4 flex items-center justify-between border-b ${isDark ? 'border-white/10 bg-neutral-800/50' : 'border-neutral-200 bg-neutral-50'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img src="/demian.png" alt="Demian" className="w-full h-full object-cover scale-110" onContextMenu={(e) => e.preventDefault()} onError={(e) => { e.currentTarget.src = 'https://api.dicebear.com/7.x/bottts/svg?seed=Demian&backgroundColor=transparent'; }} />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-neutral-900'}`}>Demian</h3>
                      <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Asistente Virtual</p>
                    </div>
                  </div>
                  <button onClick={() => setIsChatOpen(false)} className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-neutral-400' : 'hover:bg-neutral-200 text-neutral-500'}`}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 chat-scroll">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${msg.role === 'user' ? 'bg-cyan-500 text-white rounded-tr-sm' : isDark ? 'bg-neutral-800 text-neutral-200 rounded-tl-sm border border-white/5' : 'bg-neutral-100 text-neutral-800 rounded-tl-sm border border-neutral-200'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isBotTyping && (
                    <div className="flex justify-start">
                      <div className={`rounded-2xl p-3 text-sm flex gap-1 items-center ${isDark ? 'bg-neutral-800 border border-white/5' : 'bg-neutral-100 border border-neutral-200'}`}>
                        <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div className={`p-4 border-t ${isDark ? 'border-white/10 bg-neutral-800/50' : 'border-neutral-200 bg-neutral-50'}`}>
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Escribe un mensaje..." disabled={isBotTyping}
                      className={`flex-1 px-4 py-2 rounded-full text-sm outline-none transition-all ${isDark ? 'bg-black border border-white/10 text-white focus:border-cyan-500/50 disabled:opacity-50' : 'bg-white border border-neutral-300 text-neutral-900 focus:border-cyan-500 disabled:opacity-50'}`} />
                    <button type="submit" disabled={!chatInput.trim() || isBotTyping} className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white disabled:opacity-50 transition-transform hover:scale-105 active:scale-95 shadow-md">
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button onClick={() => setIsChatOpen(!isChatOpen)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_30px_rgba(6,182,212,0.6)] active:scale-95 overflow-hidden ${isChatOpen ? 'bg-neutral-800 text-white' : 'bg-transparent'}`}>
            {isChatOpen ? <X className="w-6 h-6 text-white" /> : (
              <img src="/demian.png" alt="Demian" className="w-full h-full object-cover scale-110" onContextMenu={(e) => e.preventDefault()} onError={(e) => { e.currentTarget.src = 'https://api.dicebear.com/7.x/bottts/svg?seed=Demian&backgroundColor=transparent'; }} />
            )}
          </button>
        </div>
      )}

      {/* Municipal Access Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ scale: 0.95, y: 10, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 10, opacity: 0 }}
              className="glass-panel w-full max-w-md p-10 rounded-[2.5rem] relative" onClick={e => e.stopPropagation()}>
              <h2 className={`font-heading font-extrabold text-3xl mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                {t.modal.title1}<span className="text-cyan-400">{t.modal.title2}</span>
              </h2>
              <p className={`text-sm mb-8 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{t.modal.desc}</p>
              <div className="space-y-4 mb-8">
                <input type="text" placeholder={t.modal.name} className="input-field py-3" value={accessForm.name} onChange={e => setAccessForm({ ...accessForm, name: e.target.value })} />
                <input type="text" placeholder={t.modal.key} className="input-field py-3" value={accessForm.key} onChange={e => setAccessForm({ ...accessForm, key: e.target.value })} />
                {modalErr && <div className="text-red-400 text-sm font-medium">{t.modal.err}</div>}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setIsModalOpen(false)} className="btn-secondary flex-1 text-sm py-3">{t.modal.cancel}</button>
                <button onClick={handleAccess} disabled={isLoadingAccess} className="btn-primary flex-[2] text-sm py-3 disabled:opacity-50 flex items-center justify-center">
                  {isLoadingAccess ? <div className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" /> : t.modal.enter}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Private View */}
      <AnimatePresence>
        {privateData && <PrivateView privateData={privateData} onClose={closePrivate} isDark={isDark} />}
      </AnimatePresence>

      {/* Admin Panel */}
      <AnimatePresence>
        {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
