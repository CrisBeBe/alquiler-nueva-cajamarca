import { useState } from 'react';
import { HiSearch, HiOutlineFilter, HiX } from 'react-icons/hi';

const FiltrosBuscador = ({ onFilter }) => {
  const [filtros, setFiltros] = useState({
    text: '',
    tipo: '',
    zona: '',
    precioMin: '',
    precioMax: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nuevosFiltros = { ...filtros, [name]: value };
    setFiltros(nuevosFiltros);
    onFilter(nuevosFiltros);
  };

  const handleLimpiar = () => {
    const limpios = {
      text: '',
      tipo: '',
      zona: '',
      precioMin: '',
      precioMax: '',
    };
    setFiltros(limpios);
    onFilter(limpios);
  };

  const hasActiveFilters = Object.values(filtros).some(v => v !== '');

  return (
    <div className="bg-white/80 backdrop-blur-xl p-3 rounded-[2.5rem] shadow-2xl shadow-primary-100/20 border border-white/50 max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-2">
        {/* Búsqueda */}
        <div className="flex-grow w-full relative group">
          <HiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
          <input
            type="text"
            name="text"
            value={filtros.text}
            onChange={handleChange}
            placeholder="¿Qué estás buscando hoy?"
            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-transparent rounded-[2rem] outline-none focus:bg-white focus:ring-4 focus:ring-primary-100 transition-all font-medium text-slate-700 placeholder:text-slate-400"
          />
        </div>
        
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 w-full lg:w-auto">
          {/* Tipo */}
          <div className="flex-grow lg:w-44">
            <select
              name="tipo"
              value={filtros.tipo}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-[2rem] outline-none focus:bg-white focus:ring-4 focus:ring-primary-100 transition-all font-bold text-slate-600 appearance-none text-sm cursor-pointer"
            >
              <option value="">Cualquier tipo</option>
              <option value="cuarto">Habitación</option>
              <option value="departamento">Departamento</option>
              <option value="casa">Casa</option>
              <option value="local">Local</option>
            </select>
          </div>

          {/* Zona */}
          <div className="flex-grow lg:w-44">
            <select
              name="zona"
              value={filtros.zona}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-[2rem] outline-none focus:bg-white focus:ring-4 focus:ring-primary-100 transition-all font-bold text-slate-600 appearance-none text-sm cursor-pointer"
            >
              <option value="">Cualquier zona</option>
              <option value="Centro">Centro</option>
              <option value="Norte">Norte</option>
              <option value="Sur">Sur</option>
              <option value="Este">Este</option>
              <option value="Oeste">Oeste</option>
            </select>
          </div>

          {/* Limpiar */}
          {hasActiveFilters && (
            <button
              onClick={handleLimpiar}
              className="flex items-center justify-center p-4 bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-full transition-all duration-300"
              title="Limpiar filtros"
            >
              <HiX className="text-xl" />
            </button>
          )}

          <button 
            onClick={() => onFilter(filtros)} 
            className="flex-grow lg:flex-none btn-primary !rounded-[2rem] !py-4 px-10 flex items-center justify-center"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltrosBuscador;
