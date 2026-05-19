import { createContext, useState, useContext } from 'react';
import api from '../services/api';

const AnuncioContext = createContext();

export const AnuncioProvider = ({ children }) => {
  const [anuncios, setAnuncios] = useState([]);
  const [filtros, setFiltros] = useState({});
  const [currentAnuncio, setCurrentAnuncio] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAnuncios = async (params = {}) => {
    setLoading(true);
    try {
      const response = await api.get('/anuncios', { params });
      // The API returns { success: true, data: { anuncios: [...] }, ... }
      setAnuncios(response.data.data.anuncios || []);
    } catch (error) {
      console.error('Error fetching anuncios', error);
    } finally {
      setLoading(false);
    }
  };

  const getAnuncioById = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/anuncios/${id}`);
      const data = response.data.data;
      setCurrentAnuncio(data);
      return data;
    } catch (error) {
      console.error('Error fetching anuncio', error);
    } finally {
      setLoading(false);
    }
  };

  const filtrarAnuncios = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
    fetchAnuncios(nuevosFiltros);
  };

  return (
    <AnuncioContext.Provider value={{ anuncios, filtros, currentAnuncio, loading, fetchAnuncios, filtrarAnuncios, getAnuncioById }}>
      {children}
    </AnuncioContext.Provider>
  );
};

export const useAnuncios = () => useContext(AnuncioContext);
