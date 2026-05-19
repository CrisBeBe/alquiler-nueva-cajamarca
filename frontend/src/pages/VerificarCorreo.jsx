import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { HiShieldCheck, HiArrowRight, HiPencilAlt } from 'react-icons/hi';

const VerificarCorreo = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Falta el correo electrónico. Intenta registrarte de nuevo.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/verify-email', { email, token: code });
      toast.success('¡Correo verificado con éxito! Ya puedes iniciar sesión.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Código incorrecto');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      await api.post('/auth/resend-verification', { email });
      toast.success('¡Código reenviado! Revisa tu bandeja de entrada.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al reenviar el código');
    }
  };

  const handleEditEmail = () => {
    navigate('/registro', { state: location.state });
  };

  return (
    <div className="max-w-md mx-auto mt-20 animate-fade-in">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-50 text-center">
        <div className="bg-primary-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 text-primary-600">
          <HiShieldCheck className="text-4xl" />
        </div>

        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Verifica tu cuenta</h1>
        <div className="mb-8">
          <p className="text-slate-500 font-medium">
            Hemos enviado un código de 6 dígitos a:
          </p>
          <div className="flex items-center justify-center space-x-2 mt-1">
            <span className="text-slate-900 font-bold">{email || 'tu correo'}</span>
            <button 
              onClick={handleEditEmail}
              className="p-1.5 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              title="Corregir correo"
            >
              <HiPencilAlt className="text-lg" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            maxLength="6"
            placeholder="000000"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full text-center text-3xl font-black tracking-[1rem] py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-primary-500 focus:bg-white transition-all text-slate-700"
          />

          <button
            type="submit"
            disabled={loading || code.length < 6}
            className="btn-primary w-full py-4 flex items-center justify-center group"
          >
            {loading ? 'Verificando...' : (
              <>
                Verificar Código
                <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 space-y-4">
          <p className="text-sm text-slate-400 font-medium">
            ¿No recibiste el código? <br />
            <button 
              type="button"
              onClick={handleResend}
              className="text-primary-600 font-bold hover:underline mt-2"
            >
              Reenviar código
            </button>
          </p>
          
          <div className="pt-2">
            <button 
              onClick={handleEditEmail}
              className="text-slate-400 text-xs hover:text-primary-500 transition-colors underline"
            >
              ¿Escribiste mal tu correo? Haz clic aquí para corregirlo.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificarCorreo;
