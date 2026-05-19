import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMenu, HiX, HiUserCircle, HiOutlinePlusCircle, HiShieldCheck, HiViewGrid } from 'react-icons/hi';
import { useState, useEffect } from 'react';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <div className="bg-primary-600 p-2 rounded-xl mr-3 shadow-lg group-hover:rotate-12 transition-transform duration-300">
            <HiOutlinePlusCircle className="text-white text-2xl" />
          </div>
          <span className={`text-2xl font-black tracking-tighter transition-colors ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
            Alquiler<span className="text-primary-600">NC</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-bold text-slate-600 hover:text-primary-600 transition-colors">Inicio</Link>
          
          <Link to="/dashboard/publicar" className="btn-primary flex items-center !py-2.5 !px-5 text-sm">
            <HiOutlinePlusCircle className="mr-2 text-xl" />
            Publicar
          </Link>
          
          <div className="h-6 w-px bg-slate-200"></div>

          {isAuthenticated ? (
            <div className="flex items-center space-x-6">
              {user?.role === 'admin' && (
                <Link to="/admin" className="flex items-center text-xs font-black text-amber-500 uppercase tracking-widest hover:text-amber-600 transition-colors">
                  <HiShieldCheck className="mr-1 text-lg" /> Admin
                </Link>
              )}

              <Link to="/dashboard" className="flex items-center text-xs font-black text-slate-500 uppercase tracking-widest hover:text-primary-600 transition-colors" title="Mi Panel">
                <HiViewGrid className="mr-1 text-lg" /> Panel
              </Link>

              <Link to="/perfil" className="flex items-center group">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border-2 border-transparent group-hover:border-primary-500 transition-all">
                  <HiUserCircle className="w-7 h-7 text-slate-400 group-hover:text-primary-600" />
                </div>
                <span className="ml-2 text-sm font-bold text-slate-700 group-hover:text-primary-600 transition-colors">{user?.nombre_completo?.split(' ')[0] || 'Mi Perfil'}</span>
              </Link>
              <button 
                onClick={handleLogout} 
                className="text-sm font-bold text-slate-400 hover:text-red-500 transition-colors"
              >
                Salir
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-primary-600 transition-colors px-4 py-2">
                Ingresar
              </Link>
              <Link to="/registro" className="text-sm font-bold bg-slate-900 text-white px-6 py-2.5 rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                Crear cuenta
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-600 text-2xl" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`fixed inset-x-0 top-[70px] bg-white border-t border-slate-100 p-6 flex flex-col space-y-6 md:hidden transition-all duration-500 shadow-2xl ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <Link to="/" className="text-lg font-bold text-slate-700" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
        <Link to="/dashboard/publicar" className="text-lg font-bold text-primary-600" onClick={() => setIsMenuOpen(false)}>Publicar Anuncio</Link>
        <div className="h-px bg-slate-100"></div>
        {isAuthenticated ? (
          <>
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-lg font-bold text-amber-500" onClick={() => setIsMenuOpen(false)}>Panel Admin</Link>
            )}
            <Link to="/dashboard" className="text-lg font-bold text-slate-700" onClick={() => setIsMenuOpen(false)}>Mi Dashboard</Link>
            <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-left text-lg font-bold text-red-500">Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-lg font-bold text-slate-700" onClick={() => setIsMenuOpen(false)}>Ingresar</Link>
            <Link to="/registro" className="btn-primary text-center" onClick={() => setIsMenuOpen(false)}>Crear cuenta</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
