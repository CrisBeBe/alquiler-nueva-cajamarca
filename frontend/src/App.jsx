import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import VerificarCorreo from './pages/VerificarCorreo';
import AnuncioDetalle from './pages/AnuncioDetalle';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import PublicarAnuncio from './pages/PublicarAnuncio';
import EditarAnuncio from './pages/EditarAnuncio';
import Perfil from './pages/Perfil';
import FAQ from './pages/FAQ';
import Contacto from './pages/Contacto';
import TerminosPrivacidad from './pages/TerminosPrivacidad';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-50">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mb-4"></div>
      <p className="text-slate-400 font-bold animate-pulse tracking-widest uppercase text-xs">Cargando sesión...</p>
    </div>
  );
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-50">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mb-4"></div>
      <p className="text-slate-400 font-bold animate-pulse tracking-widest uppercase text-xs">Cargando sesión...</p>
    </div>
  );
  
  if (!isAuthenticated || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="registro" element={<Registro />} />
        <Route path="verificar-correo" element={<VerificarCorreo />} />
        <Route path="anuncio/:id" element={<AnuncioDetalle />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="terminos" element={<TerminosPrivacidad title="Términos y Condiciones" />} />
        <Route path="privacidad" element={<TerminosPrivacidad title="Política de Privacidad" />} />
        
        {/* Protected Routes */}
        <Route path="dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="dashboard/publicar" element={
          <ProtectedRoute>
            <PublicarAnuncio />
          </ProtectedRoute>
        } />
        <Route path="dashboard/anuncio/:id/editar" element={
          <ProtectedRoute>
            <EditarAnuncio />
          </ProtectedRoute>
        } />
        <Route path="perfil" element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        } />
        <Route path="admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;
