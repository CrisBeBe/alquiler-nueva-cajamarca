import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useConfig } from '../context/ConfigContext';
import { HiPlus, HiPencil, HiTrash, HiEye, HiChartBar, HiClipboardList, HiOutlineViewGrid, HiPause, HiPlay, HiStar } from 'react-icons/hi';
import { toast } from 'react-toastify';
import PaymentModal from '../components/PaymentModal';

const Dashboard = () => {
  const { modoSolidario } = useConfig();
  const [misAnuncios, setMisAnuncios] = useState([]);
  const [misContactos, setMisContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalAnuncios: 0, totalVisualizaciones: 0, anunciosActivos: 0 });
  
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedAnuncio, setSelectedAnuncio] = useState(null);

  const fetchData = async () => {
    try {
      const [anunciosRes, statsRes, contactosRes] = await Promise.all([
        api.get('/anuncios/vendedor/mis-anuncios'),
        api.get('/vendedor/estadisticas'),
        api.get('/vendedor/contactos')
      ]);
      setMisAnuncios(anunciosRes.data.data);
      setStats(statsRes.data.data);
      setMisContactos(contactosRes.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este anuncio permanentemente?')) {
      try {
        await api.delete(`/anuncios/${id}`);
        setMisAnuncios(misAnuncios.filter(a => a.id !== id));
        toast.success('Anuncio eliminado');
        fetchData(); // Refresh stats
      } catch (error) {
        toast.error('Error al eliminar');
      }
    }
  };

  const toggleStatus = async (anuncio) => {
    const newStatus = anuncio.estado === 'activo' ? 'pausado' : 'activo';
    const actionText = newStatus === 'activo' ? 'activar' : 'pausar';
    
    if (window.confirm(`¿Quieres ${actionText} este anuncio?`)) {
      try {
        await api.patch(`/anuncios/${anuncio.id}/status`, { status: newStatus });
        toast.success(`Anuncio ${newStatus === 'activo' ? 'activado' : 'pausado'}`);
        fetchData(); // Refresh all data to update UI and stats
      } catch (error) {
        toast.error('Error al cambiar el estado');
      }
    }
  };

  const openPaymentModal = (anuncio) => {
    setSelectedAnuncio(anuncio);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Mi Panel</h1>
          <p className="text-slate-500 font-medium">Gestiona tus propiedades y mira su rendimiento.</p>
        </div>
        <Link 
          to="/dashboard/publicar" 
          className="btn-primary flex items-center justify-center"
        >
          <HiPlus className="mr-2 text-xl" /> Publicar Alquiler
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <HiOutlineViewGrid className="text-6xl text-primary-600" />
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Total Anuncios</p>
          <p className="text-4xl font-black text-slate-900 tracking-tighter">{stats.totalAnuncios || 0}</p>
        </div>
        
        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <HiChartBar className="text-6xl text-emerald-600" />
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Vistas Totales</p>
          <p className="text-4xl font-black text-emerald-600 tracking-tighter">{stats.totalVisualizaciones || 0}</p>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <HiClipboardList className="text-6xl text-orange-600" />
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Activos Ahora</p>
          <p className="text-4xl font-black text-orange-600 tracking-tighter">{stats.anunciosActivos || 0}</p>
        </div>
      </div>

      {/* Solidarity Card */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-rose-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-center md:text-left flex-col md:flex-row">
          <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md">
            <span className="text-4xl">❤️</span>
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">¿Te gusta la plataforma?</h2>
            <p className="text-rose-100 font-medium">Este es un proyecto sin fines de lucro. Tu apoyo nos ayuda a seguir creciendo.</p>
          </div>
        </div>
        <button 
          onClick={() => openPaymentModal(null)}
          className="bg-white text-rose-600 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-rose-50 transition-colors shadow-lg"
        >
          Apoyar al desarrollador
        </button>
      </div>

      {/* Anuncios List */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Mis Publicaciones</h2>
          <span className="bg-white px-4 py-1.5 rounded-full text-xs font-bold text-slate-500 shadow-sm border border-slate-100">
            {misAnuncios.length} anuncios creados
          </span>
        </div>
        
        {loading ? (
          <div className="p-20 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent mb-4"></div>
            <p className="text-slate-400 font-bold">Cargando tus anuncios...</p>
          </div>
        ) : misAnuncios.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/30">
                  <th className="px-8 py-5">Propiedad</th>
                  <th className="px-8 py-5">Precio</th>
                  <th className="px-8 py-5">Estado / Destacado</th>
                  <th className="px-8 py-5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {misAnuncios.map((anuncio) => (
                  <tr key={anuncio.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                          <img 
                            src={anuncio.fotos?.[0]?.url_foto || anuncio.fotos?.[0]?.url || 'https://via.placeholder.com/50'} 
                            className="w-full h-full object-cover"
                            alt={anuncio.titulo}
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-700 line-clamp-1 group-hover:text-primary-600 transition-colors">{anuncio.titulo}</span>
                          {anuncio.is_featured && (
                            <span className="flex items-center text-[9px] font-black uppercase text-amber-500 tracking-widest mt-1">
                              <HiStar className="mr-1" /> Destacado
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-black text-slate-900">S/ {anuncio.precio_mensual}</td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col items-start gap-2">
                        <button 
                          onClick={() => toggleStatus(anuncio)}
                          className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border ${anuncio.estado === 'activo' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'}`}
                          title={anuncio.estado === 'activo' ? 'Click para pausar' : 'Click para activar'}
                        >
                          {anuncio.estado}
                        </button>
                        
                        {modoSolidario && !anuncio.is_featured && anuncio.estado === 'activo' && (
                          <button 
                            onClick={() => openPaymentModal(anuncio)}
                            className="flex items-center text-[9px] font-black text-rose-500 uppercase tracking-widest hover:underline"
                          >
                            <HiStar className="mr-1" /> Impulsar con un apoyo
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-end space-x-2">
                        <Link to={`/anuncio/${anuncio.id}`} className="p-3 bg-blue-50 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-sm" title="Ver anuncio público">
                          <HiEye className="text-xl" />
                        </Link>

                        <button 
                          onClick={() => toggleStatus(anuncio)}
                          className={`p-3 rounded-xl transition-all shadow-sm ${anuncio.estado === 'activo' ? 'bg-slate-50 text-slate-400 hover:bg-slate-500 hover:text-white' : 'bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-white'}`}
                          title={anuncio.estado === 'activo' ? 'Pausar alquiler' : 'Activar alquiler'}
                        >
                          {anuncio.estado === 'activo' ? <HiPause className="text-xl" /> : <HiPlay className="text-xl" />}
                        </button>

                        <Link to={`/dashboard/anuncio/${anuncio.id}/editar`} className="p-3 bg-amber-50 text-amber-500 rounded-xl hover:bg-amber-500 hover:text-white transition-all shadow-sm" title="Editar detalles">
                          <HiPencil className="text-xl" />
                        </Link>
                        
                        <button onClick={() => handleDelete(anuncio.id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm" title="Eliminar permanentemente">
                          <HiTrash className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-20 text-center">
            <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiClipboardList className="text-4xl text-slate-200" />
            </div>
            <p className="text-slate-400 font-bold mb-6">Aún no has publicado ningún anuncio.</p>
            <Link to="/dashboard/publicar" className="btn-primary inline-flex items-center">
              <HiPlus className="mr-2" /> Publicar mi primer alquiler
            </Link>
          </div>
        )}
      </div>

      {/* Contactos Recibidos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 overflow-hidden">
          <div className="p-8 border-b border-slate-50 bg-slate-50/50">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Contactos Recibidos</h2>
            <p className="text-sm text-slate-500 font-medium">Personas interesadas en tus alquileres</p>
          </div>
          <div className="p-4">
            {misContactos.length > 0 ? (
              <div className="space-y-4">
                {misContactos.map((contacto) => (
                  <div key={contacto.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-xl mr-4 ${contacto.tipo_contacto === 'whatsapp' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                        {contacto.tipo_contacto === 'whatsapp' ? <HiPlay className="text-xl" /> : <HiMail className="text-xl" />}
                      </div>
                      <div>
                        <p className="font-bold text-slate-700">{contacto.visitante_email}</p>
                        <p className="text-xs text-slate-400 font-medium">Interesado en: {contacto.anuncio?.titulo}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-slate-400 uppercase">{new Date(contacto.createdAt).toLocaleDateString()}</p>
                      <p className="text-[10px] font-bold text-primary-500 uppercase tracking-widest">{contacto.tipo_contacto}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 font-medium">
                Aún no has recibido contactos.
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary-200">
          <h3 className="text-xl font-black mb-4 tracking-tight">Tips para vender más</h3>
          <ul className="space-y-4 text-primary-50 text-sm">
            <li className="flex items-start">
              <span className="bg-white/20 p-1 rounded-md mr-3 mt-0.5">✓</span>
              Responde rápido a los mensajes de WhatsApp.
            </li>
            <li className="flex items-start">
              <span className="bg-white/20 p-1 rounded-md mr-3 mt-0.5">✓</span>
              Mantén tus fotos actualizadas y con buena luz.
            </li>
            <li className="flex items-start">
              <span className="bg-white/20 p-1 rounded-md mr-3 mt-0.5">✓</span>
              Describe claramente qué servicios incluye el precio.
            </li>
          </ul>
        </div>
      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        anuncio={selectedAnuncio}
        onPaymentRequested={fetchData}
      />
    </div>
  );
};

export default Dashboard;
