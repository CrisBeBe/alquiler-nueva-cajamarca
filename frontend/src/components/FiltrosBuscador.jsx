import { useState } from 'react';
import { HiSearch, HiX, HiSparkles, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_URL || '/api';

const FiltrosBuscador = ({ onFilter }) => {
  const [filtros, setFiltros] = useState({ text: '', tipo: '', zona: '', precioMin: '', precioMax: '' });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nuevosFiltros = { ...filtros, [name]: value };
    setFiltros(nuevosFiltros);
    if (name !== 'text') onFilter(nuevosFiltros);
  };

  const handleLimpiar = () => {
    const limpios = { text: '', tipo: '', zona: '', precioMin: '', precioMax: '' };
    setFiltros(limpios);
    setAiMessage('');
    onFilter(limpios);
  };

  const handleBuscarIA = async () => {
    if (!filtros.text || filtros.text.trim().length < 2) {
      onFilter(filtros);
      return;
    }
    setAiLoading(true);
    setAiMessage('');
    try {
      const { data } = await axios.post(`${VITE_API_URL}/search/ai`, { query: filtros.text });
      const f = { ...data.filtros };
      setFiltros(f);
      onFilter(f);
      // Construir mensaje de feedback
      const partes = [];
      if (f.tipo) partes.push(f.tipo);
      if (f.zona) partes.push(`zona ${f.zona}`);
      if (f.precioMax) partes.push(`máx S/ ${f.precioMax}`);
      if (f.precioMin) partes.push(`desde S/ ${f.precioMin}`);
      if (partes.length > 0) {
        setAiMessage(`🤖 IA detectó: ${partes.join(', ')}`);
        setShowAdvanced(true);
      } else {
        setAiMessage('🔍 Buscando por texto...');
      }
    } catch (error) {
      // Fallback: búsqueda normal
      onFilter(filtros);
    } finally {
      setAiLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleBuscarIA();
  };

  const hasActiveFilters = Object.values(filtros).some(v => v !== '');

  return (
    <div className="bg-white/80 backdrop-blur-xl p-3 rounded-[2.5rem] shadow-2xl shadow-primary-100/20 border border-white/50 max-w-5xl mx-auto">
      {/* Main search bar */}
      <div className="flex flex-col lg:flex-row items-center gap-2">
        <div className="flex-grow w-full relative group">
          <HiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
          <input
            type="text"
            name="text"
            value={filtros.text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Ej: cuarto barato en el centro, casa 2 habitaciones..."
            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-transparent rounded-[2rem] outline-none focus:bg-white focus:ring-4 focus:ring-primary-100 transition-all font-medium text-slate-700 placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto">
          {/* Botón IA */}
          <button
            onClick={handleBuscarIA}
            disabled={aiLoading}
            className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-[2rem] hover:opacity-90 transition-all disabled:opacity-60 whitespace-nowrap"
            title="Buscar con Inteligencia Artificial"
          >
            {aiLoading ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              <HiSparkles className="text-lg" />
            )}
            <span className="hidden sm:inline">{aiLoading ? 'Procesando...' : 'Buscar con IA'}</span>
          </button>

          {/* Filtros avanzados toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1 px-4 py-4 bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold rounded-[2rem] transition-all text-sm whitespace-nowrap"
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

      {/* AI feedback message */}
      {aiMessage && (
        <div className="mt-2 mx-2 px-4 py-2 bg-violet-50 border border-violet-200 rounded-2xl text-violet-700 text-sm font-medium">
          {aiMessage}
        </div>
      )}

      {/* Advanced filters */}
      {showAdvanced && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-2 px-1">
          <select
            name="tipo"
            value={filtros.tipo}
            onChange={handleChange}
            className="flex-grow px-5 py-3 bg-slate-50 border-transparent rounded-[1.5rem] outline-none focus:bg-white focus:ring-4 focus:ring-primary-100 transition-all font-bold text-slate-600 appearance-none text-sm cursor-pointer"
          >
            <option value="">Cualquier tipo</option>
            <option value="cuarto">Habitación</option>
            <option value="departamento">Departamento</option>
            <option value="casa">Casa</option>
            <option value="local">Local</option>
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
