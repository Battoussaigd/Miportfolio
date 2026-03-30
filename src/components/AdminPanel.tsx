import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db, auth } from '../firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { X, Plus, Trash2, Edit2, LogOut, Save, Download } from 'lucide-react';

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [municipalities, setMunicipalities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchMunicipalities();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchMunicipalities = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'municipalities'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMunicipalities(data);
    } catch (error) {
      console.error("Error fetching municipalities:", error);
      setErrorMsg("Error al cargar los datos. Asegúrate de tener permisos de administrador.");
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleSave = async () => {
    if (!formData.key) {
      setErrorMsg("La clave (key) es obligatoria.");
      return;
    }
    try {
      // Ensure names is an array of lowercase strings
      const namesArray = typeof formData.names === 'string' 
        ? formData.names.split(',').map((n: string) => n.trim().toLowerCase())
        : formData.names;

      const dataToSave = {
        ...formData,
        names: namesArray,
      };

      await setDoc(doc(db, 'municipalities', formData.key), dataToSave);
      setEditingId(null);
      fetchMunicipalities();
    } catch (error) {
      console.error("Error saving:", error);
      setErrorMsg("Error al guardar.");
    }
  };

  const handleDelete = async (key: string) => {
    setConfirmDelete(key);
  };

  const confirmDeleteAction = async () => {
    if (!confirmDelete) return;
    try {
      await deleteDoc(doc(db, 'municipalities', confirmDelete));
      setConfirmDelete(null);
      fetchMunicipalities();
    } catch (error) {
      console.error("Error deleting:", error);
      setErrorMsg("Error al eliminar.");
    }
  };

  const startEdit = (muni: any) => {
    setFormData({
      ...muni,
      names: muni.names.join(', ')
    });
    setEditingId(muni.key);
  };

  const startNew = () => {
    setFormData({
      key: '',
      names: '',
      display: '',
      subEs: '',
      subEn: '',
      program: '',
      docs: [],
      authorityName: '',
      commune: '',
      painPointText: '',
      cardA_title: '',
      cardA_desc: '',
      cardB_title: '',
      cardB_desc: '',
      cardC_title: '',
      cardC_desc: '',
      pdfUrl: ''
    });
    setEditingId('new');
  };

  const addDocField = () => {
    setFormData({
      ...formData,
      docs: [...formData.docs, { n: '', d: '', f: '' }]
    });
  };

  const updateDocField = (index: number, field: string, value: string) => {
    const newDocs = [...formData.docs];
    newDocs[index][field] = value;
    setFormData({ ...formData, docs: newDocs });
  };

  const removeDocField = (index: number) => {
    const newDocs = formData.docs.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, docs: newDocs });
  };

  const exportToCSV = () => {
    if (municipalities.length === 0) {
      setErrorMsg("No hay datos para exportar.");
      return;
    }

    const headers = ["Clave de Acceso (Key)", "Nombres Permitidos", "Nombre a Mostrar (Display)", "Programa", "Documentos (Cantidad)"];
    
    const rows = municipalities.map(muni => {
      const names = Array.isArray(muni.names) ? muni.names.join('; ') : muni.names;
      const docsCount = Array.isArray(muni.docs) ? muni.docs.length : 0;
      
      return [
        `"${muni.key || ''}"`,
        `"${names || ''}"`,
        `"${muni.display || ''}"`,
        `"${muni.program || ''}"`,
        `"${docsCount}"`
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `reporte_accesos_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!user) {
    return (
      <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
        <div className="glass-panel p-10 rounded-[2.5rem] max-w-md w-full text-center relative">
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-3xl font-heading font-bold mb-2">Panel <span className="text-cyan-400">Admin</span></h2>
          <p className="text-slate-400 mb-8">Inicia sesión para gestionar los accesos municipales.</p>
          <button onClick={handleLogin} className="btn-primary w-full">
            Iniciar sesión con Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] bg-slate-950 overflow-y-auto">
      {confirmDelete && (
        <div className="fixed inset-0 z-[300] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="glass-panel p-8 rounded-3xl max-w-sm w-full text-center">
            <h3 className="text-xl font-heading font-bold mb-4 text-red-400">¿Eliminar acceso?</h3>
            <p className="text-slate-400 text-sm mb-8">Esta acción no se puede deshacer. Se eliminará el acceso para <strong>{confirmDelete}</strong>.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="btn-secondary flex-1 py-2 text-sm">Cancelar</button>
              <button onClick={confirmDeleteAction} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex-1 text-sm">Eliminar</button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-5xl mx-auto p-6 md:p-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-heading font-bold mb-2">Panel <span className="text-cyan-400">Admin</span></h2>
            <p className="text-slate-400">{user.email}</p>
          </div>
          <div className="flex gap-4">
            <button onClick={handleLogout} className="btn-secondary flex items-center gap-2 text-sm">
              <LogOut className="w-4 h-4" /> Salir
            </button>
            <button onClick={onClose} className="btn-secondary flex items-center gap-2 text-sm">
              <X className="w-4 h-4" /> Cerrar
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-cyan-400 animate-pulse">Cargando datos...</div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
            <div className="space-y-4">
              {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex justify-between items-center">
                  <p className="text-sm">{errorMsg}</p>
                  <button onClick={() => setErrorMsg(null)} className="hover:text-red-300">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-heading font-bold">Accesos Municipales</h3>
                <div className="flex gap-3">
                  <button onClick={exportToCSV} className="btn-secondary text-sm py-2 px-4 flex items-center gap-2" title="Descargar reporte en Excel/CSV">
                    <Download className="w-4 h-4" /> Reporte
                  </button>
                  <button onClick={startNew} className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Nuevo Acceso
                  </button>
                </div>
              </div>

              {municipalities.map((muni) => (
                <div key={muni.key} className="glass-panel p-6 rounded-2xl flex items-start justify-between gap-4">
                  <div>
                    <div className="font-bold text-lg text-cyan-400 mb-1">{muni.key}</div>
                    <div className="text-sm text-slate-300 mb-2">{muni.display} - {muni.program}</div>
                    <div className="text-xs text-slate-500">Nombres permitidos: {muni.names.join(', ')}</div>
                    <div className="text-xs text-slate-500 mt-1">{muni.docs?.length || 0} documentos adjuntos</div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => startEdit(muni)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4 text-cyan-400" />
                    </button>
                    <button onClick={() => handleDelete(muni.key)} className="p-2 bg-white/5 hover:bg-red-500/20 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
              {municipalities.length === 0 && (
                <div className="text-slate-500 text-center py-12 glass-panel rounded-2xl">
                  No hay accesos configurados.
                </div>
              )}
            </div>

            {editingId && (
              <div className="glass-panel p-6 rounded-[2rem] sticky top-6">
                <h3 className="text-xl font-heading font-bold mb-6">
                  {editingId === 'new' ? 'Nuevo Acceso' : 'Editar Acceso'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Clave de acceso (Key / ID)</label>
                    <input type="text" className="input-field py-2 text-sm" value={formData.key} onChange={e => setFormData({...formData, key: e.target.value})} disabled={editingId !== 'new'} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Nombres permitidos (separados por coma)</label>
                    <input type="text" className="input-field py-2 text-sm" value={formData.names} onChange={e => setFormData({...formData, names: e.target.value})} placeholder="ej: juan perez, juan" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Nombre a mostrar (Display)</label>
                    <input type="text" className="input-field py-2 text-sm" value={formData.display} onChange={e => setFormData({...formData, display: e.target.value})} placeholder="ej: Sr. Alcalde" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Programa</label>
                    <input type="text" className="input-field py-2 text-sm" value={formData.program} onChange={e => setFormData({...formData, program: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Subtítulo (ES)</label>
                    <textarea className="input-field py-2 text-sm min-h-[60px]" value={formData.subEs} onChange={e => setFormData({...formData, subEs: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Subtítulo (EN)</label>
                    <textarea className="input-field py-2 text-sm min-h-[60px]" value={formData.subEn || ''} onChange={e => setFormData({...formData, subEn: e.target.value})} />
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-sm font-bold text-cyan-400 mb-4">Nuevo Diseño (Bento Grid)</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Nombre Autoridad (ej: Don Ricardo)</label>
                        <input type="text" className="input-field py-2 text-sm" value={formData.authorityName || ''} onChange={e => setFormData({...formData, authorityName: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Comuna (ej: Lautaro)</label>
                        <input type="text" className="input-field py-2 text-sm" value={formData.commune || ''} onChange={e => setFormData({...formData, commune: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">El Gancho (Pain Point)</label>
                        <textarea className="input-field py-2 text-sm min-h-[60px]" value={formData.painPointText || ''} onChange={e => setFormData({...formData, painPointText: e.target.value})} />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Tarjeta A (Título)</label>
                          <input type="text" className="input-field py-2 text-sm" value={formData.cardA_title || ''} onChange={e => setFormData({...formData, cardA_title: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Tarjeta A (Desc)</label>
                          <input type="text" className="input-field py-2 text-sm" value={formData.cardA_desc || ''} onChange={e => setFormData({...formData, cardA_desc: e.target.value})} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Tarjeta B (Título)</label>
                          <input type="text" className="input-field py-2 text-sm" value={formData.cardB_title || ''} onChange={e => setFormData({...formData, cardB_title: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Tarjeta B (Desc)</label>
                          <input type="text" className="input-field py-2 text-sm" value={formData.cardB_desc || ''} onChange={e => setFormData({...formData, cardB_desc: e.target.value})} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Tarjeta C (Título)</label>
                          <input type="text" className="input-field py-2 text-sm" value={formData.cardC_title || ''} onChange={e => setFormData({...formData, cardC_title: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Tarjeta C (Desc)</label>
                          <input type="text" className="input-field py-2 text-sm" value={formData.cardC_desc || ''} onChange={e => setFormData({...formData, cardC_desc: e.target.value})} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">URL PDF Principal</label>
                        <input type="text" className="input-field py-2 text-sm" value={formData.pdfUrl || ''} onChange={e => setFormData({...formData, pdfUrl: e.target.value})} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-bold text-cyan-400">Documentos</label>
                      <button onClick={addDocField} className="text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20">+ Añadir</button>
                    </div>
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                      {formData.docs.map((doc: any, i: number) => (
                        <div key={i} className="p-3 bg-black/20 rounded-xl relative">
                          <button onClick={() => removeDocField(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-300"><X className="w-4 h-4" /></button>
                          <input type="text" placeholder="Nombre (ej: Propuesta)" className="w-full bg-transparent border-b border-white/10 text-sm py-1 mb-2 outline-none focus:border-cyan-400" value={doc.n} onChange={e => updateDocField(i, 'n', e.target.value)} />
                          <input type="text" placeholder="Descripción" className="w-full bg-transparent border-b border-white/10 text-sm py-1 mb-2 outline-none focus:border-cyan-400 text-slate-400" value={doc.d} onChange={e => updateDocField(i, 'd', e.target.value)} />
                          <input type="text" placeholder="URL (Google Drive)" className="w-full bg-transparent border-b border-white/10 text-sm py-1 outline-none focus:border-cyan-400 text-cyan-400" value={doc.f} onChange={e => updateDocField(i, 'f', e.target.value)} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button onClick={() => setEditingId(null)} className="btn-secondary flex-1 text-sm py-2">Cancelar</button>
                    <button onClick={handleSave} className="btn-primary flex-1 text-sm py-2 flex items-center justify-center gap-2">
                      <Save className="w-4 h-4" /> Guardar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
