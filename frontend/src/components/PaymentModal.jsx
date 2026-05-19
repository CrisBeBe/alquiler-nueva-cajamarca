import { useState } from 'react';
import { HiX, HiCash, HiShieldCheck, HiArrowRight, HiClipboardCopy } from 'react-icons/hi';
import { toast } from 'react-toastify';
import api from '../services/api';

const PaymentModal = ({ isOpen, onClose, anuncio, onPaymentRequested }) => {
  const [step, setStep] = useState(1);
  const [operationNumber, setOperationNumber] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!operationNumber) {
      toast.error('Por favor ingresa el número de operación');
      return;
    }

    setLoading(true);
    try {
      await api.post('/payments/request', {
        anuncio_id: anuncio?.id || null,
        numero_operacion: operationNumber,
        monto: 5.00 
      });
      
      const mensajeWA = `Hola Cristhian, acabo de enviar un apoyo de S/ 5 ${anuncio ? 'para destacar mi anuncio "' + anuncio.titulo + '"' : 'general para el proyecto'}. El número de operación es: ${operationNumber}.`;
      const urlWA = `https://wa.me/51916225416?text=${encodeURIComponent(mensajeWA)}`;
      
      toast.success('¡Registro enviado! Notifícanos por WhatsApp para activarlo ahora.');
      
      setTimeout(() => {
        window.open(urlWA, '_blank');
        onPaymentRequested();
        onClose();
        setStep(1);
        setOperationNumber('');
      }, 1500);
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al enviar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.info('Copiado al portapapeles');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden relative">
        <button 
          onClick={() => { onClose(); setStep(1); }}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-2xl transition-all"
        >
          <HiX className="text-2xl" />
        </button>

        <div className="p-8 md:p-12">
          {step === 1 ? (
            <div className="space-y-8">
              <div className="text-center">
                <div className="bg-rose-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-500">
                  <HiCash className="text-4xl" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Apoya el Proyecto</h2>
                <p className="text-slate-500 font-medium">Alquiler NC es gratuito. Tu apoyo voluntario nos ayuda a pagar los servidores y seguir mejorando.</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl space-y-4 text-center border border-slate-100 shadow-inner">
                <p className="text-slate-600 font-medium text-sm italic">
                  "Como agradecimiento por tu apoyo (S/ 5 o más), destacaremos tu anuncio en los primeros lugares por 15 días."
                </p>
                <div className="flex justify-between items-center border-t border-slate-200 pt-4">
                  <span className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Sugerencia Solidaria</span>
                  <span className="text-2xl font-black text-primary-600">S/ 5.00</span>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="btn-primary w-full py-5 flex items-center justify-center group text-lg"
              >
                Continuar para apoyar
                <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest leading-loose">
                Aceptamos Yape, Plin y Transferencia Directa
              </p>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Envía tu Apoyo</h2>
                <p className="text-slate-500 font-medium text-sm">Escanea el QR o usa el número de Cristhian.</p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="relative group mb-6">
                  <div className="w-52 h-52 bg-white rounded-3xl flex items-center justify-center border-4 border-slate-50 shadow-xl overflow-hidden p-2">
                    <img src="/qr_apoyo.jpeg" alt="QR Yape/Plin" className="w-full h-full object-contain" />
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="flex items-center justify-between bg-slate-50 w-full px-6 py-4 rounded-2xl border border-slate-100 group hover:border-primary-200 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Número Celular</span>
                      <span className="text-xl font-black text-slate-700 tracking-wider">916 225 416</span>
                    </div>
                    <button onClick={() => copyToClipboard('916225416')} className="bg-white p-3 rounded-xl shadow-sm text-primary-600 hover:bg-primary-600 hover:text-white transition-all border border-slate-100">
                      <HiClipboardCopy className="text-2xl" />
                    </button>
                  </div>
                  <p className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.2em]">Titular: Cristhian Cabrera</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Número de Operación (Yape/Plin)</label>
                  <input 
                    type="text" 
                    placeholder="Ej: 12345678"
                    required
                    value={operationNumber}
                    onChange={(e) => setOperationNumber(e.target.value)}
                    className="input-minimal !py-4 text-center text-xl font-black tracking-widest border-2 focus:border-primary-500"
                  />
                </div>

                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(1)} className="w-1/3 py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors">Atrás</button>
                  <button type="submit" disabled={loading} className="btn-primary flex-1 py-4 text-lg">
                    {loading ? 'Verificando...' : 'Confirmar Apoyo'}
                  </button>
                </div>
              </form>

              <div className="flex items-center justify-center space-x-2 text-emerald-500 bg-emerald-50 py-3 rounded-2xl border border-emerald-100">
                <HiShieldCheck className="text-xl" />
                <span className="text-xs font-bold uppercase tracking-wider">Apoyo Directo y Seguro</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
