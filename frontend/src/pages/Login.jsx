import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { HiMail, HiLockClosed, HiArrowRight, HiEye, HiEyeOff } from 'react-icons/hi';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(credentials);
      toast.success('¡Bienvenido de nuevo!');
      navigate('/dashboard');
    } catch (error) {
      const { code, message } = error.response?.data || {};
      
      if (code === 'EMAIL_NOT_VERIFIED') {
        toast.info('Debes verificar tu correo primero.');
        navigate('/verificar-correo', { state: { email: credentials.email } });
      } else if (code === 'USER_NOT_FOUND') {
        toast.error(
          <div>
            {message}. <br />
            <Link to="/registro" className="font-bold underline">¿Deseas registrarte?</Link>
          </div>,
          { autoClose: 10000 }
        );
      } else {
        toast.error(message || 'Credenciales incorrectas');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 animate-fade-in">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 to-emerald-400"></div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Ingresar</h1>
          <p className="text-slate-400 font-medium italic text-sm">Gestiona tus alquileres con facilidad.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Correo Electrónico</label>
            <div className="relative group">
              <HiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
              <input
                type="email"
                name="email"
                required
                value={credentials.email}
                className="input-minimal !pl-14"
                placeholder="tu@email.com"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Contraseña</label>
            <div className="relative group">
              <HiLockClosed className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={credentials.password}
                className="input-minimal !pl-14 !pr-14"
                placeholder="••••••••"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary-500 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiEyeOff className="text-xl" /> : <HiEye className="text-xl" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 flex items-center justify-center group"
          >
            {loading ? 'Validando...' : (
              <>
                Entrar al Panel
                <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm font-medium">
            ¿Aún no tienes una cuenta? <br />
            <Link to="/registro" className="text-primary-600 font-black hover:underline mt-2 inline-block">
              Regístrate aquí gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
