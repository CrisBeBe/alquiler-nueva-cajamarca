import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { HiUser, HiMail, HiLockClosed, HiPhone, HiArrowRight, HiCheckCircle, HiXCircle, HiEye, HiEyeOff } from 'react-icons/hi';

const Registro = () => {
  const location = useLocation();
  const [userData, setUserData] = useState({
    email: location.state?.email || '',
    password: location.state?.password || '',
    nombre_completo: location.state?.nombre_completo || '',
    telefono: location.state?.telefono || '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [validations, setValidations] = useState({
    length: location.state?.password?.length >= 8 || false,
    uppercase: /[A-Z]/.test(location.state?.password || '') || false,
    lowercase: /[a-z]/.test(location.state?.password || '') || false,
    number: /[0-9]/.test(location.state?.password || '') || false,
    phone: /^9\d{8}$/.test(location.state?.telefono || '') || false
  });

  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const { password, telefono } = userData;
    setValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      phone: /^9\d{8}$/.test(telefono)
    });
  }, [userData]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const ValidationItem = ({ label, isMet }) => (
    <div className={`flex items-center space-x-2 text-xs font-medium transition-colors ${isMet ? 'text-emerald-500' : 'text-rose-400'}`}>
      {isMet ? <HiCheckCircle className="text-sm" /> : <HiXCircle className="text-sm" />}
      <span>{label}</span>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const allValid = Object.values(validations).every(v => v);
    if (!allValid) {
      toast.error('Por favor cumple con todos los requisitos de validación');
      return;
    }

    setLoading(true);
    try {
      await register(userData);
      toast.success('¡Registro exitoso! Por favor verifica tu correo.');
      navigate('/verificar-correo', { state: { email: userData.email, ...userData } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error en el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 animate-fade-in">
      <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-primary-500"></div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Crear Cuenta</h1>
          <p className="text-slate-400 font-medium italic text-sm">Únete a la mejor red de alquileres de Nueva Cajamarca.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nombre Completo</label>
            <div className="relative group">
              <HiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
              <input
                type="text"
                name="nombre_completo"
                required
                value={userData.nombre_completo}
                className="input-minimal !pl-14"
                placeholder="Ej: Juan Pérez"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Correo Electrónico</label>
            <div className="relative group">
              <HiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
              <input
                type="email"
                name="email"
                required
                value={userData.email}
                className="input-minimal !pl-14"
                placeholder="tu@email.com"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Teléfono</label>
            <div className="relative group">
              <HiPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
              <input
                type="text"
                name="telefono"
                required
                value={userData.telefono}
                className="input-minimal !pl-14"
                placeholder="912345678"
                onChange={handleChange}
              />
            </div>
            <div className="px-1">
              <ValidationItem label="9 dígitos (empieza con 9)" isMet={validations.phone} />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Contraseña</label>
            <div className="relative group">
              <HiLockClosed className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={userData.password}
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
            
            <div className="grid grid-cols-2 gap-2 px-1 pt-1">
              <ValidationItem label="Mínimo 8 caracteres" isMet={validations.length} />
              <ValidationItem label="Una mayúscula" isMet={validations.uppercase} />
              <ValidationItem label="Una minúscula" isMet={validations.lowercase} />
              <ValidationItem label="Un número" isMet={validations.number} />
            </div>
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 flex items-center justify-center group"
            >
              {loading ? 'Creando cuenta...' : (
                <>
                  Registrarme Ahora
                  <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm font-medium">
            ¿Ya tienes una cuenta? <br />
            <Link to="/login" className="text-primary-600 font-black hover:underline mt-2 inline-block">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registro;
