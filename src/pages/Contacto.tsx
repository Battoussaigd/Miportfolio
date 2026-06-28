import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useApp } from '../context/AppContext';
import { fadeUp } from '../utils/animations';

const content = {
  es: { label: 'Contacto', title: 'Hablemos', sub: '¿Tienes un proyecto o quieres saber más? Escríbeme.', name: 'Tu nombre', email: 'Tu correo', msg: 'Tu mensaje', send: 'Enviar mensaje', sending: 'Enviando...', sent: '¡Mensaje enviado!', error: 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.' },
  en: { label: 'Contact', title: "Let's talk", sub: 'Have a project or want to know more? Write to me.', name: 'Your name', email: 'Your email', msg: 'Your message', send: 'Send message', sending: 'Sending...', sent: 'Message sent!', error: 'There was an error sending the message. Please try again.' },
};

export default function Contacto() {
  const { lang } = useApp();
  const t = content[lang];
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const sendContact = async () => {
    if (!form.name || !form.email || !form.message) return;
    setIsSending(true);
    try {
      addDoc(collection(db, 'messages'), {
        name: form.name, email: form.email, message: form.message, createdAt: serverTimestamp(),
      }).catch(err => console.error('Firestore backup failed:', err));

      const response = await fetch('https://formsubmit.co/ajax/claudioegdiaz@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message, _replyto: form.email, _subject: `Nuevo mensaje de portfolio de ${form.name}` }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || (result && result.success === false)) throw new Error(result?.message || 'Error');

      setSendSuccess(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSendSuccess(false), 5000);
    } catch {
      alert(t.error);
    }
    setIsSending(false);
  };

  return (
    <section className="py-32 px-6 max-w-xl mx-auto">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-12">
        <div className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">{t.label}</div>
        <h2 className="font-heading font-extrabold text-5xl tracking-tight mb-4">{t.title}</h2>
        <p className="text-neutral-400 text-lg">{t.sub}</p>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-4">
        <input type="text" placeholder={t.name} className="input-field"
          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder={t.email} className="input-field"
          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <textarea placeholder={t.msg} className="input-field min-h-[160px] resize-y"
          value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
        <button onClick={sendContact} disabled={isSending || sendSuccess}
          className="btn-primary w-full flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
          {isSending ? (
            <span className="animate-pulse">{t.sending}</span>
          ) : sendSuccess ? (
            <span className="flex items-center gap-2 text-green-400"><CheckCircle2 className="w-4 h-4" />{t.sent}</span>
          ) : (
            <>{t.send} <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </motion.div>
    </section>
  );
}
