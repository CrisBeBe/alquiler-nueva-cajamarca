import { useEffect } from 'react';
import { useAnuncios } from '../context/AnuncioContext';
import CardAnuncio from '../components/CardAnuncio';
import FiltrosBuscador from '../components/FiltrosBuscador';
import SkeletonCard from '../components/SkeletonCard';
import { HiSearch, HiSparkles } from 'react-icons/hi';

const Home = () => {
  const { anuncios, loading, fetchAnuncios, filtrarAnuncios } = useAnuncios();

  useEffect(() => {
    fetchAnuncios();
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-12 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-100/30 blur-[120px] rounded-full -z-10"></div>
        
        <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-primary-50 mb-6 animate-fade-in">
          <HiSparkles className="text-primary-500" />
          <span className="text-xs font-black text-primary-700 uppercase tracking-widest">Nueva Cajamarca te espera</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Alquiler de casas y cuartos <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-500">
            en Nueva Cajamarca.
          </span>
        </h1>
        
        <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Encuentra <strong>habitaciones, departamentos y casas</strong> con la mejor ubicación <br className="hidden md:block" />
          en el corazón de Nueva Cajamarca. Publica gratis hoy mismo.
        </p>
      </section>

      {/* SEO Content Section */}
      <section className="bg-slate-50 rounded-[3rem] p-12 border border-slate-100 text-center space-y-6">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">La mejor plataforma de alquileres en Nueva Cajamarca</h2>
        <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed">
          ¿Buscas un lugar para vivir? En <strong>Alquiler NC</strong> te ayudamos a encontrar el <strong>alquiler de cuartos</strong>, 
          <strong> departamentos</strong> y <strong>casas en Nueva Cajamarca</strong> de manera rápida y segura. 
          Nuestra plataforma conecta directamente a inquilinos con propietarios sin intermediarios. 
          Si eres dueño de una propiedad, puedes <strong>publicar tu anuncio de alquiler gratis</strong> y llegar a cientos de personas interesadas.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest pt-4">
          <span>Alquiler de Cuartos</span>
          <span className="w-1.5 h-1.5 bg-primary-300 rounded-full my-auto"></span>
          <span>Departamentos en Nueva Cajamarca</span>
          <span className="w-1.5 h-1.5 bg-primary-300 rounded-full my-auto"></span>
          <span>Casas de Alquiler</span>
          <span className="w-1.5 h-1.5 bg-primary-300 rounded-full my-auto"></span>
          <span>Locales Comerciales</span>
        </div>
      </section>

      {/* Search & Filters Section */}
      <div className="sticky top-20 z-40 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <FiltrosBuscador onFilter={filtrarAnuncios} />
      </div>

      {/* Results Section */}
      <section className="space-y-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Anuncios destacados
          </h2>
          <span className="text-sm font-bold text-slate-400">
            {anuncios.length} inmuebles encontrados
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : anuncios.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {anuncios.map((anuncio) => (
              <CardAnuncio key={anuncio.id} anuncio={anuncio} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] shadow-sm border border-slate-50">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiSearch className="text-3xl text-slate-300" />
            </div>
            <p className="text-slate-500 text-xl font-bold mb-4">Vaya, no hay resultados para esa búsqueda.</p>
            <button 
              onClick={() => fetchAnuncios()}
              className="text-primary-600 font-black hover:underline tracking-tight"
            >
              Mostrar todos los anuncios disponibles
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
