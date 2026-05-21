import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAnuncios } from '../context/AnuncioContext';
import { useAuth } from '../context/AuthContext';
import { HiLocationMarker, HiHome, HiPhone, HiMail, HiBadgeCheck, HiEye } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import api from '../services/api';

import GaleriaFotos from '../components/GaleriaFotos';
import StaticMap from '../components/StaticMap';

const AnuncioDetalle = () => {
  const { id } = useParams();
  const { getAnuncioById, loading } = useAnuncios();
  const { isAuthenticated, user } = useAuth();
  const [anuncio, setAnuncio] = useState(null);

  useEffect(() => {
    const fetchAnuncio = async () => {
      const data = await getAnuncioById(id);
      setAnuncio(data);
    };
    fetchAnuncio();
  }, [id]);

  const registerContact = async (tipo) => {
    if (!isAuthenticated || !user) return;
    try {
      await api.post('/contactos', {
        anuncio_id: id,
        visitante_email: user.email,
        tipo_contacto: tipo
      });
    } catch (error) {
      console.error('Error al registrar el contacto', error);
    }
  };

  const handleContactClick = (tipo) => {
    registerContact(tipo);
  };

  if (loading) return <div className="text-center py-20">Cargando detalles...</div>;
  if (!anuncio) return <div className="text-center py-20">Anuncio no encontrado.</div>;

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Images & Info */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <GaleriaFotos fotos={anuncio.fotos} />
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-50 p-8 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
              <div className="flex-1">
                <span className="bg-primary-50 text-primary-700 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest inline-block mb-3">
                  {anuncio.tipo}
                </span>
                <div className="flex items-center mb-2">
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{anuncio.titulo}</h1>
                  {anuncio.usuario?.is_verified_owner && (
                    <HiBadgeCheck className="text-blue-500 text-3xl ml-3" title="Dueño Verificado" />
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-6 mt-3 text-slate-500 font-bold">
                  <div className="flex items-center">
                    <HiLocationMarker className="mr-1.5 text-primary-500 text-xl" /> {anuncio.zona}, Nueva Cajamarca
                  </div>
                  <div className="flex items-center text-slate-400">
                    <HiEye className="mr-1.5 text-xl" /> {anuncio.visualizaciones || 0} visitas
                  </div>
                </div>
              </div>
              <div className="bg-primary-600 text-white px-8 py-4 rounded-3xl text-3xl font-black shadow-lg shadow-primary-100 self-start">
                S/ {anuncio.precio_mensual}
              </div>
            </div>

            <hr className="my-10 border-slate-100" />

            <h3 className="text-2xl font-black text-slate-800 mb-6 tracking-tight">Descripción</h3>
            <p className="text-slate-600 whitespace-pre-line leading-relaxed text-lg">
              {anuncio.descripcion}
            </p>

            <h3 className="text-2xl font-black text-slate-800 mt-12 mb-6 tracking-tight">Amenidades</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-12">
              {anuncio.amenidades?.map((amenidad, index) => (
                <div key={index} className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 font-bold text-sm">
                  <div className="w-2.5 h-2.5 bg-primary-500 rounded-full mr-3 shadow-sm shadow-primary-200"></div>
                  {amenidad}
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-black text-slate-800 mb-6 tracking-tight">Ubicación aproximada</h3>
            <StaticMap lat={anuncio.latitud} lng={anuncio.longitud} titulo={anuncio.titulo} />
          </div>
        </div>

        {/* Right Side: Contact */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 rounded-[3rem] shadow-2xl p-8 sticky top-24 border border-white/10 transition-all duration-300">
            <h3 className="text-xl font-black mb-8 text-white flex items-center tracking-tight">
              <span className="w-2 h-8 bg-primary-500 rounded-full mr-4"></span>
              Contactar al Vendedor
            </h3>
            
            <div className="space-y-4">
              {(anuncio.metodo_contacto === 'whatsapp' || anuncio.metodo_contacto === 'multicanal') && anuncio.numero_contacto && (
                <a 
                  href={`https://wa.me/51${anuncio.numero_contacto}?text=Hola,%20me%20interesa%20tu%20anuncio:%20${anuncio.titulo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleContactClick('whatsapp')}
                  className="flex items-center justify-center w-full bg-[#25D366] text-white py-5 rounded-2xl font-black hover:bg-[#20bd5a] transition-all transform hover:-translate-y-1 shadow-xl shadow-green-900/20"
                >
                  <FaWhatsapp className="mr-3 text-2xl" /> Chatear por WhatsApp
                </a>
              )}

              {(anuncio.metodo_contacto === 'telefono' || anuncio.metodo_contacto === 'multicanal') && anuncio.telefono_contacto && (
                <a 
                  href={`tel:${anuncio.telefono_contacto}`}
                  onClick={() => handleContactClick('telefono')}
                  className="flex items-center justify-center w-full bg-white text-slate-900 py-5 rounded-2xl font-black hover:bg-slate-50 transition-all transform hover:-translate-y-1 shadow-xl"
                >
                  <HiPhone className="mr-3 text-2xl" /> Llamar al Arrendador
                </a>
              )}

              {(anuncio.metodo_contacto === 'correo' || anuncio.metodo_contacto === 'multicanal') && anuncio.correo_contacto && (
                <a 
                  href={`mailto:${anuncio.correo_contacto}?subject=Interés en alquiler: ${anuncio.titulo}`}
                  onClick={() => handleContactClick('correo')}
                  className="flex items-center justify-center w-full bg-transparent border-2 border-white/20 text-white py-5 rounded-2xl font-black hover:bg-white/5 transition-all transform hover:-translate-y-1"
                >
                  <HiMail className="mr-3 text-2xl" /> Enviar un Correo
                </a>
              )}

              {!anuncio.numero_contacto && !anuncio.telefono_contacto && !anuncio.correo_contacto && (
                <p className="text-center text-slate-500 font-bold py-4 italic">Información de contacto no proporcionada</p>
              )}

              <div className="mt-10 pt-10 border-t border-white/5 text-center">
                <p className="text-xs text-slate-500 mb-6 font-bold uppercase tracking-[0.2em]">¿Tienes una propiedad?</p>
                <Link 
                  to={isAuthenticated ? "/dashboard/publicar" : "/registro"} 
                  className="inline-block px-8 py-3 bg-primary-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary-500 transition-all shadow-lg shadow-primary-900/50"
                >
                  Publicar Gratis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnuncioDetalle;
