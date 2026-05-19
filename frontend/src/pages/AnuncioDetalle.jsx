import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAnuncios } from '../context/AnuncioContext';
import { useAuth } from '../context/AuthContext';
import { HiLocationMarker, HiHome, HiPhone, HiMail } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import api from '../services/api';

import GaleriaFotos from '../components/GaleriaFotos';

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
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Images & Info */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <GaleriaFotos fotos={anuncio.fotos} />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                  {anuncio.tipo}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">{anuncio.titulo}</h1>
                <div className="flex items-center text-gray-500 mt-2">
                  <HiLocationMarker className="mr-1" /> {anuncio.zona}, Nueva Cajamarca
                </div>
              </div>
              <div className="text-3xl font-bold text-primary-600">
                S/ {anuncio.precio_mensual}
              </div>
            </div>

            <hr className="my-6 border-gray-100" />

            <h3 className="text-xl font-bold mb-4">Descripción</h3>
            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
              {anuncio.descripcion}
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">Amenidades</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {anuncio.amenidades?.map((amenidad, index) => (
                <div key={index} className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                  {amenidad}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Contact */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-8 transition-all duration-300 hover:shadow-2xl">
            <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
              <span className="w-1.5 h-6 bg-primary-500 rounded-full mr-3"></span>
              Contactar al Vendedor
            </h3>
            
            <div className="space-y-4">
              {(anuncio.metodo_contacto === 'whatsapp' || anuncio.metodo_contacto === 'multicanal') && anuncio.numero_contacto && (
                <a 
                  href={`https://wa.me/51${anuncio.numero_contacto}?text=Hola,%20me%20interesa%20tu%20anuncio:%20${anuncio.titulo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleContactClick('whatsapp')}
                  className="flex items-center justify-center w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold hover:bg-[#20bd5a] transition-all transform hover:-translate-y-1 shadow-lg shadow-green-100"
                >
                  <FaWhatsapp className="mr-3 text-2xl" /> Chatear por WhatsApp
                </a>
              )}

              {(anuncio.metodo_contacto === 'telefono' || anuncio.metodo_contacto === 'multicanal') && anuncio.telefono_contacto && (
                <a 
                  href={`tel:${anuncio.telefono_contacto}`}
                  onClick={() => handleContactClick('telefono')}
                  className="flex items-center justify-center w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all transform hover:-translate-y-1 shadow-lg shadow-slate-200"
                >
                  <HiPhone className="mr-3 text-2xl" /> Llamar al Arrendador
                </a>
              )}

              {(anuncio.metodo_contacto === 'correo' || anuncio.metodo_contacto === 'multicanal') && anuncio.correo_contacto && (
                <a 
                  href={`mailto:${anuncio.correo_contacto}?subject=Interés en alquiler: ${anuncio.titulo}`}
                  onClick={() => handleContactClick('correo')}
                  className="flex items-center justify-center w-full bg-white border-2 border-primary-600 text-primary-600 py-4 rounded-2xl font-bold hover:bg-primary-50 transition-all transform hover:-translate-y-1"
                >
                  <HiMail className="mr-3 text-2xl" /> Enviar un Correo
                </a>
              )}

              {!anuncio.numero_contacto && !anuncio.telefono_contacto && !anuncio.correo_contacto && (
                <p className="text-center text-slate-400 font-bold py-4">Información de contacto no proporcionada</p>
              )}

              {!isAuthenticated && (
                <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-400 mb-4 font-medium italic">¿Quieres publicar tu propio anuncio?</p>
                  <Link 
                    to="/registro" 
                    className="inline-block px-6 py-2 bg-gray-900 text-white rounded-full text-xs font-bold hover:bg-primary-600 transition-colors shadow-md"
                  >
                    Registrarme Gratis
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnuncioDetalle;
