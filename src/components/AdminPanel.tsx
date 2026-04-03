import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, auth } from '../firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { X, Plus, Trash2, LogOut, Download, ChevronDown, ChevronUp, UserPlus, Shield, FileText, Link, Edit2, Save, KeyRound, UserX } from 'lucide-react';

interface DocItem { name: string; url: string; }
interface Municipality {
  id: string;
  authorityName: string;
  commune: string;
  names: string[];
  docs: DocItem[];
  painPointText?: string;
  cardA_title?: string; cardA_desc?: string;
  cardB_title?: string; cardB_desc?: string;
  cardC_title?: string; cardC_desc?: string;
}

function toDriveDownload(url: string): string {
  if (!url) return '';
  if (url.includes('uc?export=download')) return url;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return `https://drive.google.com/uc?export=download&id=${match[1]}`;
  return url;
}

const TEMPLATES = {
  municipio: {
    painPointText: 'Sabemos que el tiempo de los dirigentes es invaluable. Nuestro objetivo es simplificar los procesos administrativos con tecnología, devolviéndoles ese tiempo para el desarrollo de su comunidad.',
    cardA_title: 'Gestión Dirigencial 2.0', cardA_desc: 'Herramientas de IA para optimizar la gestión de líderes comunitarios y equipos municipales.',
    cardB_title: 'Talento Joven y PWA', cardB_desc: 'Preparando a las nuevas generaciones con tecnología de punta. Track Escolar incluido.',
    cardC_title: 'Empoderamiento Digital', cardC_desc: 'Reduciendo la brecha digital y potenciando el liderazgo en la comunidad.',
  },
  liceo: {
    painPointText: 'La educación del futuro requiere docentes y estudiantes preparados para un mundo digital. Nuestra propuesta integra IA de forma práctica en el aula.',
    cardA_title: 'Track Escolar', cardA_desc: 'Formación en IA Generativa, PWA y herramientas digitales para estudiantes y docentes.',
    cardB_title: 'Docentes Digitales', cardB_desc: 'Capacitación práctica para integrar IA en la planificación y evaluación educativa.',
    cardC_title: 'Proyectos Reales', cardC_desc: 'Los estudiantes crean aplicaciones reales que resuelven problemas de su comunidad.',
  },
};

const EMPTY_FORM = {
  commune: '', authorityName: '', key: '', names: '',
  type: 'municipio' as 'municipio' | 'liceo', docs: [] as DocItem[],
};

type ViewType = 'list' | 'new' | 'addUser' | 'edit';

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [view, setView] = useState<ViewType>('list');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [addUserTarget, setAddUserTarget] = useState<Municipality | null>(null);
  const [editTarget, setEditTarget] = useState<Municipality | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [newForm, setNewForm] = useState(EMPTY_FORM);
  const [newUserName, setNewUserName] = useState('');

  // Estado del formulario de edición
  const [editAuthorityName, setEditAuthorityName] = useState('');
  const [editNewKey, setEditNewKey] = useState('');
  const [editNames, setEditNames] = useState<string[]>([]);
  const [editDocs, setEditDocs] = useState<DocItem[]>([]);
  const [newNameInput, setNewNameInput] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) fetchMunicipalities();
      else setLoading(false);
    });
    return () => unsub();
  }, []);

  const fetchMunicipalities = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'municipalities'));
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Municipality));
      data.sort((a, b) => a.commune.localeCompare(b.commune));
      setMunicipalities(data);
    } catch { setErrorMsg('Error al cargar los datos.'); }
    setLoading(false);
  };

  const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    if (result.user.email !== 'claudioegdiaz@gmail.com') {
      await signOut(auth);
      setErrorMsg('Acceso no autorizado.');
    }
  } catch {
    setErrorMsg('Error al iniciar sesión.');
  }
};

  const handleLogout = async () => { await signOut(auth); setView('list'); };

  const generateKey = (commune: string) =>
    commune.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '') + '2026';

  const handleCommuneChange = (val: string) =>
    setNewForm(f => ({ ...f, commune: val, key: generateKey(val) }));

  // ─── Nuevo acceso ──────────────────────────────────────────────────────────
  const addDocItem = () => {
    if (newForm.docs.length >= 10) { setErrorMsg('Máximo 10 documentos.'); return; }
    setNewForm(f => ({ ...f, docs: [...f.docs, { name: '', url: '' }] }));
  };
  const updateDocItem = (i: number, field: keyof DocItem, value: string) => {
    const docs = [...newForm.docs];
    docs[i] = { ...docs[i], [field]: value };
    setNewForm(f => ({ ...f, docs }));
  };
  const removeDocItem = (i: number) =>
    setNewForm(f => ({ ...f, docs: f.docs.filter((_, idx) => idx !== i) }));

  const handleSaveNew = async () => {
    setErrorMsg(null);
    if (!newForm.commune.trim()) { setErrorMsg('La comuna es obligatoria.'); return; }
    if (!newForm.authorityName.trim()) { setErrorMsg('El nombre de la autoridad es obligatorio.'); return; }
    if (!newForm.names.trim()) { setErrorMsg('Debes agregar al menos una persona.'); return; }
    if (!newForm.key.trim()) { setErrorMsg('La clave no puede estar vacía.'); return; }
    setSaving(true);
    try {
      const namesArray = newForm.names.split(',').map(n => n.trim().toLowerCase()).filter(Boolean);
      const docsFormatted = newForm.docs.filter(d => d.name.trim() && d.url.trim())
        .map(d => ({ name: d.name.trim(), url: toDriveDownload(d.url.trim()) }));
      await setDoc(doc(db, 'municipalities', newForm.key.trim()), {
        authorityName: newForm.authorityName.trim(),
        commune: newForm.commune.trim(),
        names: namesArray, docs: docsFormatted,
        ...TEMPLATES[newForm.type],
      });
      setSuccessMsg(`✓ Acceso para ${newForm.commune} creado. Clave: ${newForm.key}`);
      setNewForm(EMPTY_FORM);
      setView('list');
      fetchMunicipalities();
    } catch { setErrorMsg('Error al guardar. Revisa tu conexión.'); }
    setSaving(false);
  };

  // ─── Agregar usuario ───────────────────────────────────────────────────────
  const handleAddUser = async () => {
    if (!newUserName.trim() || !addUserTarget) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, 'municipalities', addUserTarget.id), {
        names: arrayUnion(newUserName.trim().toLowerCase()),
      });
      setSuccessMsg(`✓ "${newUserName.trim()}" agregado a ${addUserTarget.commune}`);
      setNewUserName(''); setView('list'); setAddUserTarget(null);
      fetchMunicipalities();
    } catch { setErrorMsg('Error al agregar usuario.'); }
    setSaving(false);
  };

  // ─── Editar ────────────────────────────────────────────────────────────────
  const openEdit = (muni: Municipality) => {
    setEditTarget(muni);
    setEditAuthorityName(muni.authorityName);
    setEditNewKey(muni.id);
    setEditNames([...(muni.names || [])]);
    setEditDocs((muni.docs || []).map(d => ({ ...d })));
    setNewNameInput('');
    setView('edit');
  };

  const addEditDoc = () => {
    if (editDocs.length >= 10) { setErrorMsg('Máximo 10 documentos.'); return; }
    setEditDocs(d => [...d, { name: '', url: '' }]);
  };
  const updateEditDoc = (i: number, field: keyof DocItem, value: string) => {
    setEditDocs(prev => { const d = [...prev]; d[i] = { ...d[i], [field]: value }; return d; });
  };
  const removeEditDoc = (i: number) =>
    setEditDocs(prev => prev.filter((_, idx) => idx !== i));

  const addEditName = () => {
    const n = newNameInput.trim().toLowerCase();
    if (!n) return;
    if (editNames.includes(n)) { setErrorMsg('Esa persona ya tiene acceso.'); return; }
    setEditNames(prev => [...prev, n]);
    setNewNameInput('');
  };
  const removeEditName = (i: number) =>
    setEditNames(prev => prev.filter((_, idx) => idx !== i));

  const handleSaveEdit = async () => {
    if (!editTarget) return;
    if (!editAuthorityName.trim()) { setErrorMsg('El nombre de la autoridad es obligatorio.'); return; }
    if (editNames.length === 0) { setErrorMsg('Debe haber al menos una persona con acceso.'); return; }
    if (!editNewKey.trim()) { setErrorMsg('La clave no puede estar vacía.'); return; }
    setSaving(true);
    try {
      const docsFormatted = editDocs.filter(d => d.name.trim() && d.url.trim())
        .map(d => ({ name: d.name.trim(), url: toDriveDownload(d.url.trim()) }));

      const dataToSave = {
        authorityName: editAuthorityName.trim(),
        commune: editTarget.commune,
        names: editNames,
        docs: docsFormatted,
        painPointText: editTarget.painPointText || '',
        cardA_title: editTarget.cardA_title || '', cardA_desc: editTarget.cardA_desc || '',
        cardB_title: editTarget.cardB_title || '', cardB_desc: editTarget.cardB_desc || '',
        cardC_title: editTarget.cardC_title || '', cardC_desc: editTarget.cardC_desc || '',
      };

      // Si cambió la clave: crea nuevo doc y elimina el anterior
      if (editNewKey.trim() !== editTarget.id) {
        await setDoc(doc(db, 'municipalities', editNewKey.trim()), dataToSave);
        await deleteDoc(doc(db, 'municipalities', editTarget.id));
      } else {
        await updateDoc(doc(db, 'municipalities', editTarget.id), dataToSave);
      }

      setSuccessMsg(`✓ ${editTarget.commune} actualizado correctamente`);
      setEditTarget(null);
      setView('list');
      fetchMunicipalities();
    } catch (err) {
      console.error(err);
      setErrorMsg('Error al guardar los cambios.');
    }
    setSaving(false);
  };

  // ─── Eliminar ──────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await deleteDoc(doc(db, 'municipalities', confirmDelete));
      setConfirmDelete(null);
      fetchMunicipalities();
    } catch { setErrorMsg('Error al eliminar.'); }
  };

  // ─── Export CSV ────────────────────────────────────────────────────────────
  const exportCSV = () => {
    if (!municipalities.length) { setErrorMsg('No hay datos para exportar.'); return; }
    const lines = [
      ['Comuna', 'Autoridad', 'Clave', 'Personas', 'Documentos'].join(';'),
      ...municipalities.map(m => [
        m.commune, m.authorityName, m.id,
        (m.names || []).join(' | '),
        (m.docs || []).map(d => d.name).join(' | '),
      ].join(';')),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'accesos_municipales.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const headerTitle = () => {
    if (view === 'list') return 'Accesos Municipales';
    if (view === 'new') return 'Nuevo Acceso';
    if (view === 'addUser') return `Agregar a ${addUserTarget?.commune}`;
    if (view === 'edit') return `Editar · ${editTarget?.commune}`;
    return '';
  };

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        className="w-full max-w-lg bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        style={{ maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            {view !== 'list' && (
              <button onClick={() => { setView('list'); setAddUserTarget(null); setEditTarget(null); }}
                className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors">←</button>
            )}
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-white text-sm">{headerTitle()}</span>
          </div>
          <div className="flex items-center gap-1">
            {user && (
              <button onClick={handleLogout} className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors" title="Cerrar sesión">
                <LogOut className="w-4 h-4" />
              </button>
            )}
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mensajes */}
        <AnimatePresence>
          {(errorMsg || successMsg) && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className={`px-6 py-3 text-sm flex items-center justify-between shrink-0 ${errorMsg ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
              <span>{errorMsg || successMsg}</span>
              <button onClick={() => { setErrorMsg(null); setSuccessMsg(null); }}><X className="w-4 h-4" /></button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contenido */}
        <div className="overflow-y-auto flex-1 p-6">

          {/* LOGIN */}
          {!user && (
            <div className="text-center py-10">
              <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-4 opacity-40" />
              <p className="text-neutral-400 mb-6 text-sm">Inicia sesión para gestionar los accesos</p>
              <button onClick={handleLogin} className="btn-primary flex items-center gap-2 mx-auto px-6 py-3">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                Continuar con Google
              </button>
            </div>
          )}

          {user && loading && <div className="text-center py-12 text-neutral-500 text-sm animate-pulse">Cargando...</div>}

          {/* ── LISTA ── */}
          {user && !loading && view === 'list' && (
            <div className="space-y-3">
              <div className="flex gap-2 mb-4">
                <button onClick={() => { setNewForm(EMPTY_FORM); setView('new'); }} className="btn-primary flex-1 flex items-center justify-center gap-2 py-2.5 text-sm">
                  <Plus className="w-4 h-4" /> Nuevo Acceso
                </button>
                <button onClick={exportCSV} className="btn-secondary flex items-center gap-2 py-2.5 px-4 text-sm" title="Descargar reporte CSV">
                  <Download className="w-4 h-4" />
                </button>
              </div>

              {municipalities.length === 0 && <div className="text-center py-12 text-neutral-500 text-sm">No hay accesos configurados aún.</div>}

              {municipalities.map(muni => (
                <div key={muni.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 p-4">
                    <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setExpandedId(expandedId === muni.id ? null : muni.id)}>
                      <div className="font-bold text-white truncate">{muni.commune}</div>
                      <div className="text-xs text-neutral-400 mt-0.5">{muni.authorityName} · <span className="text-cyan-400 font-mono">{muni.id}</span></div>
                      <div className="text-xs text-neutral-600 mt-0.5">{(muni.names || []).length} persona(s) · {(muni.docs || []).length} doc(s)</div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {/* Editar */}
                      <button onClick={() => openEdit(muni)} className="p-2 rounded-xl hover:bg-amber-500/20 text-amber-400 transition-colors" title="Editar">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {/* Agregar persona */}
                      <button onClick={() => { setAddUserTarget(muni); setView('addUser'); }} className="p-2 rounded-xl hover:bg-cyan-500/20 text-cyan-400 transition-colors" title="Agregar persona">
                        <UserPlus className="w-4 h-4" />
                      </button>
                      {/* Eliminar */}
                      <button onClick={() => setConfirmDelete(muni.id)} className="p-2 rounded-xl hover:bg-red-500/20 text-red-400 transition-colors" title="Eliminar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {/* Expandir */}
                      <button onClick={() => setExpandedId(expandedId === muni.id ? null : muni.id)} className="p-2 rounded-xl hover:bg-white/10 text-neutral-400 transition-colors">
                        {expandedId === muni.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedId === muni.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="border-t border-white/10 px-4 pb-4 pt-3 space-y-3">
                        <div>
                          <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Personas con acceso</p>
                          <div className="flex flex-wrap gap-2">
                            {(muni.names || []).map((name, i) => (
                              <span key={i} className="text-xs bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-3 py-1 rounded-full capitalize">{name}</span>
                            ))}
                          </div>
                        </div>
                        {(muni.docs || []).length > 0 && (
                          <div>
                            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Documentos</p>
                            <div className="space-y-1">
                              {muni.docs.map((d, i) => (
                                <a key={i} href={d.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-neutral-300 hover:text-cyan-400 transition-colors">
                                  <FileText className="w-3 h-3 shrink-0" /> {d.name}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}

          {/* ── NUEVO ACCESO ── */}
          {user && !loading && view === 'new' && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs text-neutral-400 mb-2">Tipo de institución</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['municipio', 'liceo'] as const).map(t => (
                    <button key={t} type="button" onClick={() => setNewForm(f => ({ ...f, type: t }))}
                      className={`py-2.5 rounded-xl text-sm font-medium transition-colors ${newForm.type === t ? 'bg-cyan-500 text-neutral-950' : 'bg-white/5 text-neutral-400 hover:bg-white/10'}`}>
                      {t === 'municipio' ? '🏛️ Municipio' : '🎓 Liceo / Escuela'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Comuna o institución <span className="text-red-400">*</span></label>
                <input type="text" className="input-field py-2.5 text-sm" placeholder="ej: Lautaro" value={newForm.commune} onChange={e => handleCommuneChange(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Clave de acceso</label>
                <input type="text" className="input-field py-2.5 text-sm font-mono text-cyan-400" value={newForm.key} onChange={e => setNewForm(f => ({ ...f, key: e.target.value }))} />
                <p className="text-xs text-neutral-600 mt-1">Se genera automáticamente · puedes editarla</p>
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Nombre de la autoridad <span className="text-red-400">*</span></label>
                <input type="text" className="input-field py-2.5 text-sm" placeholder="ej: Don Ricardo, Sra. Directora" value={newForm.authorityName} onChange={e => setNewForm(f => ({ ...f, authorityName: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Personas con acceso <span className="text-red-400">*</span></label>
                <input type="text" className="input-field py-2.5 text-sm" placeholder="ej: ricardo perez, maria gonzalez" value={newForm.names} onChange={e => setNewForm(f => ({ ...f, names: e.target.value }))} />
                <p className="text-xs text-neutral-600 mt-1">Separados por coma · en minúsculas</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-neutral-400">Documentos <span className="text-neutral-600">({newForm.docs.length}/10)</span></label>
                  <button type="button" onClick={addDocItem} disabled={newForm.docs.length >= 10} className="text-xs flex items-center gap-1 text-cyan-400 hover:text-cyan-300 disabled:opacity-30 transition-colors">
                    <Plus className="w-3 h-3" /> Agregar
                  </button>
                </div>
                <div className="space-y-3">
                  {newForm.docs.map((d, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-500">Documento {i + 1}</span>
                        <button type="button" onClick={() => removeDocItem(i)} className="text-red-400 hover:text-red-300"><X className="w-3.5 h-3.5" /></button>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                        <input type="text" className="flex-1 bg-transparent text-sm text-white outline-none border-b border-white/10 focus:border-cyan-400 pb-1 transition-colors" placeholder="Nombre del documento" value={d.name} onChange={e => updateDocItem(i, 'name', e.target.value)} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Link className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                        <input type="text" className="flex-1 bg-transparent text-sm text-cyan-400 outline-none border-b border-white/10 focus:border-cyan-400 pb-1 transition-colors" placeholder="URL Google Drive" value={d.url} onChange={e => updateDocItem(i, 'url', e.target.value)} />
                      </div>
                    </div>
                  ))}
                  {newForm.docs.length === 0 && (
                    <div className="text-center py-4 text-neutral-600 text-xs border border-dashed border-white/10 rounded-xl">Sin documentos — opcional</div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 pt-2 pb-2">
                <button type="button" onClick={() => setView('list')} className="btn-secondary flex-1 py-3 text-sm">Cancelar</button>
                <button type="button" onClick={handleSaveNew} disabled={saving} className="btn-primary flex-1 py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-50">
                  {saving ? <span className="animate-pulse">Guardando...</span> : <><Plus className="w-4 h-4" /> Crear Acceso</>}
                </button>
              </div>
            </div>
          )}

          {/* ── EDITAR ACCESO ── */}
          {user && !loading && view === 'edit' && editTarget && (
            <div className="space-y-5">

              {/* Info fija */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-xs text-neutral-500 mb-1">Editando</p>
                <p className="font-bold text-white">{editTarget.commune}</p>
              </div>

              {/* Nombre autoridad */}
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Nombre de la autoridad</label>
                <input type="text" className="input-field py-2.5 text-sm" value={editAuthorityName} onChange={e => setEditAuthorityName(e.target.value)} />
              </div>

              {/* Clave de acceso */}
              <div>
                <label className="block text-xs text-neutral-400 mb-1 flex items-center gap-1">
                  <KeyRound className="w-3 h-3" /> Clave de acceso
                </label>
                <input type="text" className="input-field py-2.5 text-sm font-mono text-cyan-400" value={editNewKey} onChange={e => setEditNewKey(e.target.value)} />
                {editNewKey !== editTarget.id && (
                  <p className="text-xs text-amber-400 mt-1">⚠️ Cambiar la clave invalidará el acceso anterior</p>
                )}
              </div>

              {/* Personas con acceso */}
              <div>
                <label className="block text-xs text-neutral-400 mb-2">Personas con acceso</label>
                <div className="flex flex-wrap gap-2 mb-3 min-h-[32px]">
                  {editNames.map((name, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 text-xs bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-3 py-1 rounded-full capitalize">
                      {name}
                      <button type="button" onClick={() => removeEditName(i)} className="hover:text-red-400 transition-colors">
                        <UserX className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {editNames.length === 0 && <p className="text-xs text-neutral-600">Sin personas — agrega al menos una</p>}
                </div>
                <div className="flex gap-2">
                  <input type="text" className="input-field py-2 text-sm flex-1" placeholder="ej: juan perez"
                    value={newNameInput} onChange={e => setNewNameInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addEditName()} />
                  <button type="button" onClick={addEditName} disabled={!newNameInput.trim()}
                    className="btn-primary py-2 px-4 text-sm disabled:opacity-40 flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-neutral-600 mt-1">En minúsculas · presiona Enter o el botón</p>
              </div>

              {/* Documentos */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-neutral-400">Documentos <span className="text-neutral-600">({editDocs.length}/10)</span></label>
                  <button type="button" onClick={addEditDoc} disabled={editDocs.length >= 10}
                    className="text-xs flex items-center gap-1 text-cyan-400 hover:text-cyan-300 disabled:opacity-30 transition-colors">
                    <Plus className="w-3 h-3" /> Agregar
                  </button>
                </div>
                <div className="space-y-3">
                  {editDocs.map((d, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-500">Documento {i + 1}</span>
                        <button type="button" onClick={() => removeEditDoc(i)} className="text-red-400 hover:text-red-300"><X className="w-3.5 h-3.5" /></button>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                        <input type="text" className="flex-1 bg-transparent text-sm text-white outline-none border-b border-white/10 focus:border-cyan-400 pb-1 transition-colors"
                          placeholder="Nombre del documento" value={d.name} onChange={e => updateEditDoc(i, 'name', e.target.value)} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Link className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                        <input type="text" className="flex-1 bg-transparent text-sm text-cyan-400 outline-none border-b border-white/10 focus:border-cyan-400 pb-1 transition-colors"
                          placeholder="URL Google Drive" value={d.url} onChange={e => updateEditDoc(i, 'url', e.target.value)} />
                      </div>
                    </div>
                  ))}
                  {editDocs.length === 0 && (
                    <div className="text-center py-4 text-neutral-600 text-xs border border-dashed border-white/10 rounded-xl">Sin documentos</div>
                  )}
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-2 pt-2 pb-2">
                <button type="button" onClick={() => { setView('list'); setEditTarget(null); }} className="btn-secondary flex-1 py-3 text-sm">Cancelar</button>
                <button type="button" onClick={handleSaveEdit} disabled={saving} className="btn-primary flex-1 py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-50">
                  {saving ? <span className="animate-pulse">Guardando...</span> : <><Save className="w-4 h-4" /> Guardar cambios</>}
                </button>
              </div>
            </div>
          )}

          {/* ── AGREGAR USUARIO ── */}
          {user && !loading && view === 'addUser' && addUserTarget && (
            <div className="space-y-6">
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4">
                <p className="text-xs text-neutral-400 mb-1">Agregando persona a</p>
                <p className="font-bold text-white text-lg">{addUserTarget.commune}</p>
                <p className="text-xs text-cyan-400 font-mono mt-1">Clave: {addUserTarget.id}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {(addUserTarget.names || []).map((n, i) => (
                    <span key={i} className="text-xs bg-white/10 text-neutral-300 px-2 py-0.5 rounded-full capitalize">{n}</span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-2">Nombre completo</label>
                <input type="text" className="input-field py-3 text-base" placeholder="ej: juan perez"
                  value={newUserName} onChange={e => setNewUserName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddUser()} autoFocus />
                <p className="text-xs text-neutral-600 mt-1">En minúsculas · verá exactamente lo mismo que la autoridad principal</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => { setView('list'); setAddUserTarget(null); }} className="btn-secondary flex-1 py-3 text-sm">Cancelar</button>
                <button type="button" onClick={handleAddUser} disabled={saving || !newUserName.trim()} className="btn-primary flex-1 py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-50">
                  {saving ? <span className="animate-pulse">Guardando...</span> : <><UserPlus className="w-4 h-4" /> Agregar</>}
                </button>
              </div>
            </div>
          )}

        </div>
      </motion.div>

      {/* Confirmar eliminar */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center p-6"
            onClick={() => setConfirmDelete(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              className="bg-neutral-900 border border-red-500/30 rounded-2xl p-6 max-w-sm w-full"
              onClick={e => e.stopPropagation()}>
              <p className="font-bold text-white mb-2">¿Eliminar acceso?</p>
              <p className="text-sm text-neutral-400 mb-6">Se eliminará <span className="text-red-400 font-mono">{confirmDelete}</span> y todas las personas asociadas. Esta acción no se puede deshacer.</p>
              <div className="flex gap-2">
                <button onClick={() => setConfirmDelete(null)} className="btn-secondary flex-1 py-2.5 text-sm">Cancelar</button>
                <button onClick={handleDelete} className="flex-1 py-2.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors">Eliminar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
