import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';

// Lazy loaded components for better performance
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Registro = lazy(() => import('./pages/Registro'));
const VerificarCorreo = lazy(() => import('./pages/VerificarCorreo'));
const AnuncioDetalle = lazy(() => import('./pages/AnuncioDetalle'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const PublicarAnuncio = lazy(() => import('./pages/PublicarAnuncio'));
const EditarAnuncio = lazy(() => import('./pages/EditarAnuncio'));
const Perfil = lazy(() => import('./pages/Perfil'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contacto = lazy(() => import('./pages/Contacto'));
const TerminosPrivacidad = lazy(() => import('./pages/TerminosPrivacidad'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

// Loading Screen for Suspense
const PageLoader = () => (
  <div className="flex flex-col justify-center items-center min-h-[60vh]">
    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mb-4"></div>
    <p className="text-slate-400 font-bold animate-pulse tracking-widest uppercase text-xs">Cargando...</p>
  </div>
);

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
    <Suspense fallback={<PageLoader />}>
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
    </Suspense>
  );
}

export default App;
