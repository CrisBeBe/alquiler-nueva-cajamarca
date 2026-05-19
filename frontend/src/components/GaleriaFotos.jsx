import { useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { optimizeImage } from '../utils/imageHelper';

const GaleriaFotos = ({ fotos = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!fotos || !fotos.length) {
    return (
      <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
        Sin fotos disponibles
      </div>
    );
  }

  const prev = () => setCurrentIndex(i => (i === 0 ? fotos.length - 1 : i - 1));
  const next = () => setCurrentIndex(i => (i === fotos.length - 1 ? 0 : i + 1));

  return (
    <div className="space-y-4">
      <div className="relative h-[400px] bg-black rounded-lg overflow-hidden group">
        <img 
          src={optimizeImage(fotos[currentIndex].url_foto || fotos[currentIndex].url, 'w_1000,c_limit')} 
          alt={`Foto ${currentIndex + 1}`} 
          className="w-full h-full object-contain"
        />
        
        {fotos.length > 1 && (
          <>
            <button 
              type="button"
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <HiChevronLeft className="text-2xl" />
            </button>
            <button 
              type="button"
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <HiChevronRight className="text-2xl" />
            </button>
          </>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {fotos.map((foto, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition ${currentIndex === index ? 'border-primary-600' : 'border-transparent'}`}
          >
            <img src={optimizeImage(foto.url_foto || foto.url, 'w_200,h_200,c_fill')} className="w-full h-full object-cover" alt={`Miniatura ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default GaleriaFotos;
