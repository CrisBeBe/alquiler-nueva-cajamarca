import { useState } from 'react';
import { HiSearch, HiX, HiChevronDown, HiChevronUp } from 'react-icons/hi';

const FiltrosBuscador = ({ onFilter }) => {
  const [filtros, setFiltros] = useState({ text: '', tipo: '', zona: '', precioMin: '', precioMax: '' });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nuevosFiltros = { ...filtros, [name]: value };
    setFiltros(nuevosFiltros);
    onFilter(nuevosFiltros);
  };

  const handleLimpiar = () => {
    const limpios = { text: '', tipo: '', zona: '', precioMin: '', precioMax: '' };
    setFiltros(limpios);
    onFilter(limpios);
  };

  const hasActiveFilters = Object.values(filtros).some(v => v !== '');

  return (
    <div className="bg-white/80 backdrop-blur-xl p-3 rounded-[2.5rem] shadow-2xl shadow-primary-100/20 border border-white/50 max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-2">
        {/* Búsqueda principal */}
        <div className="flex-grow w-full relative group">
          <HiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
          <input
            type="text"
            name="text"
            value={filtros.text}
            onChange={handleChange}
            placeholder="Buscar cuarto, casa, departamento, local..."
            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-transparent rounded-[2rem] outline-none focus:bg-white focus:ring-4 focus:ring-primary-100 transition-all font-medium text-slate-700 placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto">
          {/* Toggle filtros avanzados */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1 px-5 py-4 bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold rounded-[2rem] transition-all text-sm whitespace-nowrap"
          >
            Filtros {showAdvanced ? <HiChevronUp /> : <HiChevronDown />}
          </button>

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
        </div>
      </div>

      {/* Filtros avanzados */}
      {showAdvanced && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-2 px-1">
          <select
            name="tipo"
            value={filtros.tipo}
            onChange={handleChange}
            className="flex-grow px-5 py-3 bg-slate-50 border-transparent rounded-[1.5rem] outline-none focus:bg-white focus:ring-4 focus:ring-primary-100 transition-all font-bold text-slate-600 appearance-none text-sm cursor-pointer"
          >
            <option value="">Cualquier tipo</option>
            <option value="cuarto">Habitación / Cuarto</option>
            <option value="departamento">Departamento</option>
            <option value="casa">Casa</option>
            <option value="local">Local Comercial</option>
          </select>

          <select
            name="zona"
            value={filtros.zona}
            onChange={handleChange}
            className="flex-grow px-5 py-3 bg-slate-50 border-transparent rounded-[1.5rem] outline-none focus:bg-white focus:ring-4 focus:ring-primary-100 transition-all font-bold text-slate-600 appearance-none text-sm cursor-pointer"
          >
            <option value="">Cualquier zona</option>
            <option value="Centro">Centro</option>
            <option value="Norte">Norte</option>
            <option value="Sur">Sur</option>
            <option value="Este">Este</option>
            <option value="Oeste">Oeste</option>
          </select>

          <input
            type="number"
            name="precioMin"
            value={filtros.precioMin}
            onChange={handleChange}
            placeholder="Precio mín (S/)"
            className="flex-grow px-5 py-3 bg-slate-50 border-transparent rounded-[1.5rem] outline-none focus:bg-white focus:ring-4 focus:ring-primary-100 transition-all font-medium text-slate-700 text-sm"
          />

          <input
            type="number"
            name="precioMax"
            value={filtros.precioMax}
            onChange={handleChange}
            placeholder="Precio máx (S/)"
            className="flex-grow px-5 py-3 bg-slate-50 border-transparent rounded-[1.5rem] outline-none focus:bg-white focus:ring-4 focus:ring-primary-100 transition-all font-medium text-slate-700 text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default FiltrosBuscador;
