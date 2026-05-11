import { useState, useRef, useEffect } from 'react';
import { Magika } from 'magika';
import { Upload, FileText, AlertCircle, CheckCircle2, Loader } from 'lucide-react';

interface FileAnalysis {
  filename: string;
  label: string;
  description: string;
  mimeType: string;
  score: number;
  status: 'ok' | 'error';
}

interface MagikaAnalyzerProps {
  isDark: boolean;
  lang: 'es' | 'en';
}

export default function MagikaAnalyzer({ isDark, lang }: MagikaAnalyzerProps) {
  const [files, setFiles] = useState<FileAnalysis[]>([]);
  const [loading, setLoading] = useState(false);
  const [magikaReady, setMagikaReady] = useState(false);
  const [magikaError, setMagikaError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const magikaRef = useRef<Magika | null>(null);

  // Inicializar Magika
  useEffect(() => {
    const initMagika = async () => {
      try {
        const magika = await Magika.create();
        magikaRef.current = magika;
        setMagikaReady(true);
      } catch (error) {
        console.error('Error initializing Magika:', error);
        setMagikaError(lang === 'es' ? 'Error al inicializar Magika' : 'Error initializing Magika');
      }
    };

    initMagika();
  }, [lang]);

  const analyzeFile = async (file: File) => {
    if (!magikaRef.current) {
      setMagikaError(lang === 'es' ? 'Magika no está listo' : 'Magika is not ready');
      return;
    }

    try {
      const buffer = await file.arrayBuffer();
      const result = await magikaRef.current.identifyBytes(new Uint8Array(buffer));
      
      console.log('Magika raw result:', result); // Debug
      
      // Magika 1.0.0 devuelve un objeto con estructura específica
      let label = 'unknown';
      let description = 'Unknown type';
      let mimeType = 'unknown';
      let score = 0;

      // Intentar extraer de diferentes ubicaciones posibles
      if (result?.output?.label) {
        label = result.output.label;
        description = result.output.description || label;
        mimeType = result.output.mime_type || 'unknown';
        score = result.output.score || 0;
      } else if (result?.dl?.label) {
        label = result.dl.label;
        description = result.dl.description || label;
        mimeType = result.dl.mime_type || 'unknown';
        score = result.dl.score || 0;
      } else if (result?.label) {
        label = result.label;
        description = result.description || label;
        mimeType = result.mime_type || 'unknown';
        score = result.score || 0;
      }
      
      const analysis: FileAnalysis = {
        filename: file.name,
        label,
        description,
        mimeType,
        score: typeof score === 'number' ? score : parseFloat(score) || 0,
        status: 'ok'
      };

      console.log('Parsed analysis:', analysis); // Debug
      setFiles(prev => [analysis, ...prev]);
    } catch (error) {
      console.error('Error analyzing file:', error);
      setFiles(prev => [
        {
          filename: file.name,
          label: 'error',
          description: lang === 'es' ? 'Error al analizar' : 'Error analyzing file',
          mimeType: 'unknown',
          score: 0,
          status: 'error'
        },
        ...prev
      ]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!magikaReady) return;

    setLoading(true);
    const droppedFiles = Array.from(e.dataTransfer.files);
    
    Promise.all(droppedFiles.map(analyzeFile)).then(() => {
      setLoading(false);
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!magikaReady || !e.target.files) return;

    setLoading(true);
    const selectedFiles = Array.from(e.target.files);
    
    Promise.all(selectedFiles.map(analyzeFile)).then(() => {
      setLoading(false);
    });
  };

  const handleClick = () => {
    if (magikaReady && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearResults = () => {
    setFiles([]);
  };

  const texts = {
    es: {
      title: 'Arrastra archivos aquí',
      subtitle: 'o haz clic para seleccionar',
      loading: 'Analizando...',
      results: 'Análisis de archivos',
      filename: 'Archivo',
      type: 'Tipo',
      confidence: 'Confianza',
      noFiles: 'No hay archivos analizados',
      clear: 'Limpiar',
      status: 'Estado',
      error: 'Error',
      success: 'Exitoso'
    },
    en: {
      title: 'Drag files here',
      subtitle: 'or click to select',
      loading: 'Analyzing...',
      results: 'File Analysis Results',
      filename: 'File',
      type: 'Type',
      confidence: 'Confidence',
      noFiles: 'No files analyzed',
      clear: 'Clear',
      status: 'Status',
      error: 'Error',
      success: 'Success'
    }
  };

  const t = texts[lang];

  if (!magikaReady) {
    return (
      <div className={`p-12 rounded-xl text-center ${isDark ? 'bg-neutral-900/50' : 'bg-neutral-50'}`}>
        <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-cyan-400" />
        <p className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
          {lang === 'es' ? 'Cargando Magika...' : 'Loading Magika...'}
        </p>
      </div>
    );
  }

  if (magikaError) {
    return (
      <div className={`p-8 rounded-xl border ${isDark ? 'bg-red-950/20 border-red-500/30' : 'bg-red-50 border-red-200'}`}>
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className={isDark ? 'text-red-300' : 'text-red-700'}>{magikaError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`p-12 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
          isDark
            ? 'bg-white/5 border-cyan-500/30 hover:bg-white/10 hover:border-cyan-400'
            : 'bg-cyan-50 border-cyan-300 hover:bg-cyan-100 hover:border-cyan-400'
        }`}
      >
        <div className="text-center">
          <Upload className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
          <h3 className={`font-heading font-bold text-xl mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            {t.title}
          </h3>
          <p className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
            {t.subtitle}
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className={`p-8 rounded-xl text-center ${isDark ? 'bg-neutral-900/50' : 'bg-neutral-50'}`}>
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-cyan-400" />
          <p className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>{t.loading}</p>
        </div>
      )}

      {/* Results */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className={`font-heading font-bold text-lg ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              {t.results}
            </h3>
            <button
              onClick={clearResults}
              className="text-sm px-3 py-1 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
            >
              {t.clear}
            </button>
          </div>

          <div className={`rounded-xl overflow-hidden border ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
            <div className={`overflow-x-auto ${isDark ? 'bg-neutral-900/50' : 'bg-neutral-50'}`}>
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b ${isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-neutral-100'}`}>
                    <th className={`px-6 py-3 text-left font-semibold ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      {t.filename}
                    </th>
                    <th className={`px-6 py-3 text-left font-semibold ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      {t.type}
                    </th>
                    <th className={`px-6 py-3 text-left font-semibold ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      {t.confidence}
                    </th>
                    <th className={`px-6 py-3 text-left font-semibold ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      {t.status}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file, idx) => (
                    <tr
                      key={idx}
                      className={`border-b transition-colors ${
                        isDark
                          ? 'border-neutral-800 hover:bg-neutral-800/30'
                          : 'border-neutral-200 hover:bg-neutral-100'
                      }`}
                    >
                      <td className={`px-6 py-3 font-medium ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                          <span className="truncate">{file.filename}</span>
                        </div>
                      </td>
                      <td className={`px-6 py-3 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                        <div>
                          <div className="font-semibold">{file.label}</div>
                          <div className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                            {file.mimeType}
                          </div>
                        </div>
                      </td>
                      <td className={`px-6 py-3 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                        <div className="flex items-center gap-2">
                          <div className={`w-16 h-2 rounded-full ${isDark ? 'bg-neutral-800' : 'bg-neutral-300'}`}>
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"
                              style={{ width: `${file.score * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-cyan-400">
                            {(file.score * 100).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        {file.status === 'ok' ? (
                          <div className="flex items-center gap-1 text-green-400">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-xs font-semibold">{t.success}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-400">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-xs font-semibold">{t.error}</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && files.length === 0 && (
        <div className={`p-8 rounded-xl text-center ${isDark ? 'bg-neutral-900/50 border border-neutral-800' : 'bg-neutral-50 border border-neutral-200'}`}>
          <FileText className={`w-8 h-8 mx-auto mb-3 ${isDark ? 'text-neutral-600' : 'text-neutral-400'}`} />
          <p className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>{t.noFiles}</p>
        </div>
      )}
    </div>
  );
}
