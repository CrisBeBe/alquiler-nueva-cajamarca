import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormularioAnuncio from '../components/FormularioAnuncio';
import api from '../services/api';
import { toast } from 'react-toastify';

const EditarAnuncio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchAnuncio = async () => {
      try {
        const response = await api.get(`/anuncios/${id}`);
        setInitialData(response.data.data);
      } catch (error) {
        toast.error('Error al cargar el anuncio');
        navigate('/dashboard');
      }
    };
    fetchAnuncio();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const { fotos, fotosFiles, ...data } = formData;
      await api.put(`/anuncios/${id}`, data);
      
      // Upload new files if any
      if (fotosFiles.length > 0) {
        const fileData = new FormData();
        fotosFiles.forEach(file => fileData.append('fotos', file));
        await api.post(`/anuncios/${id}/fotos`, fileData);
      }

      // Manage photos: Delete removed ones
      const initialFotosIds = initialData.fotos.map(f => f.id);
      const currentFotosIds = fotos.filter(f => f.id).map(f => f.id);
      const removedFotosIds = initialFotosIds.filter(id => !currentFotosIds.includes(id));

      for (const fotoId of removedFotosIds) {
        await api.delete(`/anuncios/${id}/fotos/${fotoId}`);
      }

      toast.success('Anuncio actualizado');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al actualizar');
    } finally {
      setLoading(false);
    }
  };

  if (!initialData) return <div className="text-center py-20">Cargando...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Editar Anuncio</h1>
      <FormularioAnuncio initialData={initialData} onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default EditarAnuncio;
