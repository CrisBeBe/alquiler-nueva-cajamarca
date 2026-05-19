import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormularioAnuncio from '../components/FormularioAnuncio';
import api from '../services/api';
import { toast } from 'react-toastify';

const PublicarAnuncio = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const initialData = {
    numero_contacto: user?.telefono || '',
    telefono_contacto: user?.telefono || '',
    correo_contacto: user?.email || '',
    metodo_contacto: 'multicanal'
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const { fotosFiles, ...data } = formData;
      
      const fileData = new FormData();
      // Append all fields to FormData
      Object.keys(data).forEach(key => {
        if (key === 'amenidades') {
          fileData.append(key, JSON.stringify(data[key]));
        } else {
          fileData.append(key, data[key]);
        }
      });
      
      // Append files
      fotosFiles.forEach(file => fileData.append('fotos', file));
      
      await api.post('/anuncios', fileData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('¡Anuncio publicado con éxito!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al publicar el anuncio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Publicar Nuevo Anuncio</h1>
      <FormularioAnuncio onSubmit={handleSubmit} loading={loading} initialData={initialData} />
    </div>
  );
};

export default PublicarAnuncio;
