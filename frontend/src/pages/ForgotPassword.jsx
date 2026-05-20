import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { HiMail, HiArrowRight, HiArrowLeft } from 'react-icons/hi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/reset-password/solicitar', { email });
      setSent(true);
      toast.success('Si el correo está registrado, recibirás instrucciones.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="max-w-md mx-auto mt-12 animate-fade-in text-center">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <HiMail className="text-4xl text-primary-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">¡Correo Enviado!</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Hemos enviado un enlace a <strong>{email}</strong> para restablecer tu contraseña. Revisa también tu carpeta de spam.
          </p>
          <Link to="/login" className="btn-primary w-full py-4 inline-block">
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-12 animate-fade-in">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 to-emerald-400"></div>
        
        <Link to="/login" className="inline-flex items-center text-slate-400 hover:text-primary-600 font-bold text-sm mb-8 transition-colors">
          <HiArrowLeft className="mr-2" /> Volver atrás
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">¿Olvidaste tu contraseña?</h1>
          <p className="text-slate-400 font-medium italic text-sm">No te preocupes, te enviaremos instrucciones.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Tu Correo Electrónico</label>
            <div className="relative group">
              <HiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
              <input
                type="email"
                required
                value={email}
                className="input-minimal !pl-14"
                placeholder="ejemplo@correo.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 flex items-center justify-center group"
          >
            {loading ? 'Enviando...' : (
              <>
                Enviar Instrucciones
                <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
