import { Link } from 'react-router-dom';
import { HiLocationMarker, HiSparkles, HiStar } from 'react-icons/hi';
import { optimizeImage } from '../utils/imageHelper';

const CardAnuncio = ({ anuncio }) => {
  const { id, titulo, precio_mensual, zona, tipo, fotos, is_featured } = anuncio;
  const rawPhoto = fotos && fotos.length > 0 ? (fotos[0].url_foto || fotos[0].url) : 'https://via.placeholder.com/400x300?text=Sin+Foto';
  const mainPhoto = optimizeImage(rawPhoto, 'w_600,h_400,c_fill');

  return (
    <div className={`group relative bg-white rounded-[2rem] border transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${is_featured ? 'border-amber-200 shadow-xl shadow-amber-100/50' : 'border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-primary-100/50'}`}>
      <Link to={`/anuncio/${id}`}>
        <div className="relative h-56 overflow-hidden">
          <img 
            src={mainPhoto} 
            alt={titulo} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm w-fit">
              {tipo}
            </span>
            {is_featured && (
              <span className="bg-amber-400 text-white px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-md flex items-center w-fit">
                <HiStar className="mr-1" /> Destacado
              </span>
            )}
          </div>

          <div className="absolute bottom-4 right-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
            <div className="bg-primary-600 text-white px-4 py-2 rounded-2xl text-sm font-black shadow-lg">
              S/ {precio_mensual}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center text-[10px] font-bold text-primary-500 mb-3 uppercase tracking-[0.2em]">
            <HiSparkles className="mr-1.5" /> Nueva Cajamarca
          </div>
          <h3 className="text-lg font-black text-slate-800 mb-3 line-clamp-1 tracking-tight group-hover:text-primary-600 transition-colors">
            {titulo}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm font-bold text-slate-400">
              <HiLocationMarker className="mr-1.5 text-slate-300" /> {zona}
            </div>
            <div className="text-primary-600 font-black text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              Ver más →
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardAnuncio;
