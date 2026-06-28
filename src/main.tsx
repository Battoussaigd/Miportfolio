import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import Admin from './pages/Admin.tsx';
import CursoEmprendedores from './pages/CursoEmprendedores.tsx';
import CursoMujeres from './pages/CursoMujeres.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cursos/emprendedores" element={<CursoEmprendedores />} />
        <Route path="/cursos/mujeres" element={<CursoMujeres />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);