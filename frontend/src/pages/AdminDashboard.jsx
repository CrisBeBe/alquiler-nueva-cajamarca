import { useState, useEffect } from 'react';
import api from '../services/api';
import { useConfig } from '../context/ConfigContext';
import { toast } from 'react-toastify';
import { HiCheck, HiX, HiCash, HiShieldCheck, HiOutlineSwitchHorizontal, HiIdentification } from 'react-icons/hi';

const AdminDashboard = () => {
  const { modoSolidario, updateSetting } = useConfig();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const response = await api.get('/payments/pending');
      setPayments(response.data.data);
    } catch (error) {
      console.error('Error fetching payments', error);
      toast.error('Error al cargar apoyos pendientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleToggleMonetization = async () => {
    const newValue = !modoSolidario;
    const success = await updateSetting('modoSolidario', newValue);
    if (success) {
      toast.success(`Modo solidario ${newValue ? 'activado' : 'desactivado'}`);
    } else {
      toast.error('Error al cambiar el estado del modo solidario');
    }
  };

  const handleProcessPayment = async (id, estado) => {
    try {
      let motivo_rechazo = '';
      if (estado === 'rechazado') {
        motivo_rechazo = prompt('Motivo del rechazo (opcional):') || 'Datos de operación no válidos';
      }
      
      await api.put(`/payments/${id}/process`, { estado, motivo_rechazo });
      toast.success(`Registro ${estado === 'aprobado' ? 'verificado' : estado} correctamente`);
      fetchPayments();
    } catch (error) {
      console.error('Error processing payment', error);
      toast.error('Error al procesar el registro');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Panel de Administración</h1>
          <p className="text-slate-500 font-medium">Gestiona el modo solidario y verifica los apoyos recibidos.</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center space-x-4">
          <div className={`p-3 rounded-2xl ${modoSolidario ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
            <HiOutlineSwitchHorizontal className="text-2xl" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Modo Solidario</p>
            <div className="flex items-center space-x-3 mt-1">
              <span className={`text-sm font-bold ${modoSolidario ? 'text-emerald-600' : 'text-slate-500'}`}>
                {modoSolidario ? 'Activado' : 'Desactivado'}
              </span>
              <button 
                onClick={handleToggleMonetization}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${modoSolidario ? 'bg-emerald-500' : 'bg-slate-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${modoSolidario ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <section className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-50 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-primary-600">
              <HiCash className="text-2xl" />
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Donaciones / Apoyos Recibidos</h2>
            </div>
            <span className="bg-primary-50 text-primary-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              {payments.length} Pendientes
            </span>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-20 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div>
                <p className="text-slate-400 mt-4 font-bold uppercase text-xs tracking-widest">Cargando apoyos...</p>
              </div>
            ) : payments.length === 0 ? (
              <div className="p-20 text-center">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <HiShieldCheck className="text-4xl" />
                </div>
                <p className="text-slate-400 font-bold tracking-tight text-lg">No hay apoyos pendientes de verificación.</p>
                <p className="text-slate-400 text-sm">Buen trabajo, todo está al día.</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-400 text-xs font-black uppercase tracking-widest">
                    <th className="px-8 py-5">Usuario / Fecha</th>
                    <th className="px-8 py-5">Anuncio</th>
                    <th className="px-8 py-5">Operación / Monto</th>
                    <th className="px-8 py-5 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-8 py-6">
                        <div className="font-bold text-slate-800">{payment.usuario.nombre_completo}</div>
                        <div className="text-xs text-slate-400 font-medium">{new Date(payment.fecha_solicitud).toLocaleString()}</div>
                      </td>
                      <td className="px-8 py-6">
                        {payment.anuncio ? (
                          <>
                            <div className="font-bold text-primary-600 truncate max-w-xs">{payment.anuncio.titulo}</div>
                            <div className="text-xs text-slate-400 font-medium">S/ {payment.anuncio.precio_mensual} al mes</div>
                          </>
                        ) : (
                          <div className="text-slate-400 italic font-medium">Apoyo General al Proyecto</div>
                        )}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-2">
                          <HiIdentification className="text-slate-300" />
                          <span className="font-black text-slate-700">{payment.numero_operacion}</span>
                        </div>
                        <div className="text-emerald-500 font-black">S/ {payment.monto}</div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => handleProcessPayment(payment.id, 'rechazado')}
                            className="p-3 text-rose-500 hover:bg-rose-50 rounded-2xl transition-colors"
                            title="Rechazar"
                          >
                            <HiX className="text-xl" />
                          </button>
                          <button 
                            onClick={() => handleProcessPayment(payment.id, 'aprobado')}
                            className="btn-primary !px-4 !py-2 flex items-center space-x-2"
                            title="Verificar Apoyo"
                          >
                            <HiCheck className="text-lg" />
                            <span>Verificar</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
