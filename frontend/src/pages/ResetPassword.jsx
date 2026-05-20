import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { HiLockClosed, HiArrowRight, HiEye, HiEyeOff, HiCheckCircle, HiXCircle } from 'react-icons/hi';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    match: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    const { password, confirmPassword } = formData;
    setValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      match: password.length > 0 && password === confirmPassword
    });
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const ValidationItem = ({ label, isMet }) => (
    <div className={`flex items-center space-x-2 text-xs font-medium transition-colors ${isMet ? 'text-emerald-500' : 'text-rose-400'}`}>
      {isMet ? <HiCheckCircle className="text-sm" /> : <HiXCircle className="text-sm" />}
      <span>{label}</span>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { length, uppercase, lowercase, number, match } = validations;
    if (!length || !uppercase || !lowercase || !number) {
      return toast.error('La contraseña no cumple con los requisitos de seguridad');
    }
    if (!match) {
      return toast.error('Las contraseñas no coinciden');
    }

    if (!token) {
      return toast.error('Token de recuperación faltante o inválido');
    }

    setLoading(true);
    try {
      await api.post('/auth/reset-password/confirmar', { 
        token, 
        password: formData.password 
      });
      toast.success('¡Contraseña actualizada! Ya puedes iniciar sesión.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al restablecer la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 animate-fade-in">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 to-emerald-400"></div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Nueva Contraseña</h1>
          <p className="text-slate-400 font-medium italic text-sm">Crea una contraseña segura para proteger tu cuenta.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nueva Contraseña</label>
            <div className="relative group">
              <HiLockClosed className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
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

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Confirmar Contraseña</label>
            <div className="relative group">
              <HiLockClosed className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                className="input-minimal !pl-14"
                placeholder="••••••••"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 px-1 pt-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <ValidationItem label="Mínimo 8 caracteres" isMet={validations.length} />
            <ValidationItem label="Al menos una mayúscula" isMet={validations.uppercase} />
            <ValidationItem label="Al menos una minúscula" isMet={validations.lowercase} />
            <ValidationItem label="Al menos un número" isMet={validations.number} />
            <ValidationItem label="Las contraseñas coinciden" isMet={validations.match} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 flex items-center justify-center group"
          >
            {loading ? 'Actualizando...' : (
              <>
                Cambiar Contraseña
                <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
