import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import SobreMi from './pages/SobreMi';
import Certificaciones from './pages/Certificaciones';
import Cursos from './pages/Cursos';
import Proyectos from './pages/Proyectos';
import Proposito from './pages/Proposito';
import Seguridad from './pages/Seguridad';
import Contacto from './pages/Contacto';
import Admin from './pages/Admin';
import CursoEmprendedores from './pages/CursoEmprendedores';
import CursoMujeres from './pages/CursoMujeres';
import './index.css';

function WithLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/cursos/emprendedores" element={<CursoEmprendedores />} />
          <Route path="/cursos/mujeres" element={<CursoMujeres />} />
          <Route path="/" element={<WithLayout><Home /></WithLayout>} />
          <Route path="/sobre-mi" element={<WithLayout><SobreMi /></WithLayout>} />
          <Route path="/certificaciones" element={<WithLayout><Certificaciones /></WithLayout>} />
          <Route path="/cursos" element={<WithLayout><Cursos /></WithLayout>} />
          <Route path="/proyectos" element={<WithLayout><Proyectos /></WithLayout>} />
          <Route path="/proposito" element={<WithLayout><Proposito /></WithLayout>} />
          <Route path="/seguridad" element={<WithLayout><Seguridad /></WithLayout>} />
          <Route path="/contacto" element={<WithLayout><Contacto /></WithLayout>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>,
);
