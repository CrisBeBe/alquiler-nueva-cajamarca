import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { HiCloudUpload, HiX, HiInformationCircle, HiLocationMarker, HiPhone } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MapPicker from './MapPicker';
import { processImageForUpload } from '../utils/imageHelper';
import { toast } from 'react-toastify';

const schema = yup.object({
  titulo: yup.string().min(5, 'El título debe tener al menos 5 caracteres').required('El título es requerido'),
  descripcion: yup.string().min(20, 'La descripción debe tener al menos 20 caracteres').required('La descripción es requerida'),
  precio_mensual: yup.number().typeError('Debe ser un número').positive('El precio debe ser positivo').required('El precio es requerido'),
  tipo: yup.string().required('El tipo es requerido'),
  zona: yup.string().required('La zona es requerida'),
  direccion: yup.string().required('La dirección es requerida'),
  latitud: yup.number().nullable(),
  longitud: yup.number().nullable(),
  metodo_contacto: yup.string().required('El método de contacto es requerido'),
  numero_contacto: yup.string().when('metodo_contacto', {
    is: (val) => val === 'whatsapp' || val === 'multicanal',
    then: () => yup.string().matches(/^9\d{8}$/, '9 dígitos (empieza con 9)').required('Número de WhatsApp requerido'),
    otherwise: () => yup.string().notRequired().nullable(),
  }),
  telefono_contacto: yup.string().when('metodo_contacto', {
    is: (val) => val === 'telefono' || val === 'multicanal',
    then: () => yup.string().matches(/^9\d{8}$/, '9 dígitos (empieza con 9)').required('Número de llamadas requerido'),
    otherwise: () => yup.string().notRequired().nullable(),
  }),
  correo_contacto: yup.string().when('metodo_contacto', {
    is: (val) => val === 'correo' || val === 'multicanal',
    then: () => yup.string().email('Email inválido').required('Correo electrónico requerido'),
    otherwise: () => yup.string().notRequired().nullable(),
  }),
  amenidades: yup.array().of(yup.string()),
}).required();

const FormularioAnuncio = ({ initialData, onSubmit, loading }) => {
  const navigate = useNavigate();
  const [fotos, setFotos] = useState(initialData?.fotos || []);
  const [fotosFiles, setFotosFiles] = useState([]);
  const [compressing, setCompressing] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      tipo: 'cuarto',
      zona: 'Centro',
      metodo_contacto: 'whatsapp',
      amenidades: [],
    }
  });

  const selectedMetodo = watch('metodo_contacto');
  const lat = watch('latitud');
  const lng = watch('longitud');

  const handleMapChange = (lat, lng) => {
    setValue('latitud', lat);
    setValue('longitud', lng);
  };

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setFotos(initialData.fotos || []);
    }
  }, [initialData, reset]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // 0. Validar límite de 10 imágenes
    const totalActual = fotos.length;
    const porCargar = files.length;
    if (totalActual + porCargar > 10) {
      toast.error(`Solo puedes subir un máximo de 10 fotos. (Ya tienes ${totalActual})`);
      return;
    }

    // 1. Mostrar previews instantáneos con loading
    const newPhotos = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file), 
      file,
      isNew: true,
      loading: true
    }));

    setFotos(prev => [...prev, ...newPhotos]);

    // 2. Procesar TODAS en paralelo para máxima velocidad
    try {
      const processingPromises = newPhotos.map(async (photo) => {
        try {
          const { file: processedFile, preview } = await processImageForUpload(photo.file);
          
          setFotosFiles(prev => [...prev, processedFile]);
          setFotos(prev => prev.map(p => 
            p.id === photo.id ? { ...p, url: preview, loading: false } : p
          ));
        } catch (err) {
          console.error("Error al procesar foto:", err);
          setFotos(prev => prev.filter(p => p.id !== photo.id));
        }
      });

      await Promise.all(processingPromises);
    } catch (err) {
      console.error("Error en procesamiento paralelo:", err);
    }
  };

  const removeFoto = (index) => {
    const fotoToRemove = fotos[index];
    
    // Liberar memoria si es un ObjectURL
    if (fotoToRemove.isNew && fotoToRemove.url.startsWith('blob:')) {
      URL.revokeObjectURL(fotoToRemove.url);
    }

    const newFotos = [...fotos];
    newFotos.splice(index, 1);
    setFotos(newFotos);

    if (fotoToRemove.isNew) {
      setFotosFiles(prev => {
        // Encontrar índice en el array de archivos
        const oldFotosCount = fotos.filter(f => !f.isNew).length;
        const fileIndex = index - oldFotosCount;
        return prev.filter((_, i) => i !== fileIndex);
      });
    }
  };

  const internalOnSubmit = (data) => {
    onSubmit({ ...data, fotos, fotosFiles });
  };

  const amenidadesOptions = ['Wifi', 'Agua Caliente', 'Luz', 'Baño Propio', 'Entrada Independiente', 'Cocina', 'Lavandería', 'Cochera'];

  return (
    <form onSubmit={handleSubmit(internalOnSubmit)} className="space-y-10 max-w-4xl mx-auto pb-20 animate-fade-in">
      {/* Sección: Información Básica */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">
        <div className="flex items-center space-x-3 text-primary-600">
          <HiInformationCircle className="text-2xl" />
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Información del Inmueble</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Título Llamativo</label>
            <input
              type="text"
              {...register('titulo')}
              className={`input-minimal ${errors.titulo ? 'border-red-300 ring-red-50' : ''}`}
              placeholder="Ej: Amplia habitación con balcón cerca a la plaza"
            />
            {errors.titulo && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{errors.titulo.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">¿Qué alquilas?</label>
            <select
              {...register('tipo')}
              className="input-minimal appearance-none"
            >
              <option value="cuarto">Habitación</option>
              <option value="departamento">Departamento</option>
              <option value="casa">Casa</option>
              <option value="local">Local</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Precio por Mes (S/)</label>
            <input
              type="number"
              {...register('precio_mensual')}
              className={`input-minimal ${errors.precio_mensual ? 'border-red-300 ring-red-50' : ''}`}
              placeholder="0.00"
            />
            {errors.precio_mensual && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{errors.precio_mensual.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Descripción</label>
          <textarea
            {...register('descripcion')}
            rows="5"
            className={`input-minimal resize-none ${errors.descripcion ? 'border-red-300 ring-red-50' : ''}`}
            placeholder="Cuenta un poco más sobre el lugar, reglas de convivencia, etc."
          ></textarea>
          {errors.descripcion && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{errors.descripcion.message}</p>}
        </div>
      </div>

      {/* Sección: Ubicación */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">
        <div className="flex items-center space-x-3 text-emerald-600">
          <HiLocationMarker className="text-2xl" />
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Ubicación Exacta</h3>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-slate-700 mb-4 ml-1">Ubicación en el Mapa (Opcional)</label>
          <MapPicker lat={lat} lng={lng} onChange={handleMapChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Zona / Barrio</label>
            <select
              {...register('zona')}
              className="input-minimal appearance-none"
            >
              <option value="Centro">Centro</option>
              <option value="Norte">Norte</option>
              <option value="Sur">Sur</option>
              <option value="Este">Este</option>
              <option value="Oeste">Oeste</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Dirección</label>
            <input
              type="text"
              {...register('direccion')}
              className={`input-minimal ${errors.direccion ? 'border-red-300 ring-red-50' : ''}`}
              placeholder="Jr. Comercio 123"
            />
            {errors.direccion && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{errors.direccion.message}</p>}
          </div>
        </div>
      </div>

      {/* Sección: Contacto */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">
        <div className="flex items-center space-x-3 text-orange-600">
          <HiPhone className="text-2xl" />
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Datos de Contacto</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">¿Cómo quieres que te contacten?</label>
            <select
              {...register('metodo_contacto')}
              className="input-minimal appearance-none"
            >
              <option value="whatsapp">Solo WhatsApp</option>
              <option value="telefono">Solo Llamadas</option>
              <option value="correo">Solo Correo</option>
              <option value="multicanal">Múltiples medios (Recomendado)</option>
            </select>
          </div>

          {(selectedMetodo === 'whatsapp' || selectedMetodo === 'multicanal') && (
            <div className="animate-fade-in">
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Número de WhatsApp</label>
              <input
                type="text"
                {...register('numero_contacto')}
                className={`input-minimal ${errors.numero_contacto ? 'border-red-300 ring-red-50' : ''}`}
                placeholder="912345678"
              />
              {errors.numero_contacto && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{errors.numero_contacto.message}</p>}
            </div>
          )}

          {(selectedMetodo === 'telefono' || selectedMetodo === 'multicanal') && (
            <div className="animate-fade-in">
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Número para Llamadas</label>
              <input
                type="text"
                {...register('telefono_contacto')}
                className={`input-minimal ${errors.telefono_contacto ? 'border-red-300 ring-red-50' : ''}`}
                placeholder="912345678"
              />
              {errors.telefono_contacto && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{errors.telefono_contacto.message}</p>}
            </div>
          )}

          {(selectedMetodo === 'correo' || selectedMetodo === 'multicanal') && (
            <div className="animate-fade-in md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Correo de Contacto</label>
              <input
                type="email"
                {...register('correo_contacto')}
                className={`input-minimal ${errors.correo_contacto ? 'border-red-300 ring-red-50' : ''}`}
                placeholder="ejemplo@correo.com"
              />
              {errors.correo_contacto && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{errors.correo_contacto.message}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Sección: Fotos */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">
        <h3 className="text-xl font-black text-slate-800 tracking-tight">Fotos del Lugar</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {fotos.map((foto, index) => (
            <div key={foto.id || index} className="relative group aspect-square rounded-3xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 flex items-center justify-center">
              {foto.loading && (
                <div className="absolute inset-0 z-10 bg-white/60 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent animate-spin rounded-full"></div>
                </div>
              )}
              <img 
                src={foto.url_foto || foto.url} 
                className={`w-full h-full object-cover transition-all duration-500 ${foto.loading ? 'blur-sm grayscale' : 'group-hover:scale-110'}`} 
                alt=""
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x300?text=Error+al+cargar';
                }}
              />
              <button 
                type="button"
                onClick={() => removeFoto(index)}
                className="absolute top-2 right-2 z-20 bg-white/90 backdrop-blur-sm text-red-500 rounded-xl p-2 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 shadow-lg"
              >
                <HiX className="text-xl" />
              </button>
            </div>
          ))}
          <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:bg-slate-50 hover:border-primary-400 transition-all group">
            <div className="bg-primary-50 p-4 rounded-2xl group-hover:scale-110 transition-transform">
              <HiCloudUpload className="text-3xl text-primary-600" />
            </div>
            <span className="text-xs font-bold text-slate-500 mt-3">Añadir Foto</span>
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      </div>

      {/* Sección: Amenidades */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">
        <h3 className="text-xl font-black text-slate-800 tracking-tight">Amenidades Incluidas</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {amenidadesOptions.map((amenidad) => (
            <label key={amenidad} className="group flex items-center p-4 rounded-2xl border border-slate-50 hover:border-primary-100 hover:bg-primary-50/30 transition-all cursor-pointer">
              <input
                type="checkbox"
                value={amenidad}
                {...register('amenidades')}
                className="w-5 h-5 text-primary-600 border-slate-300 rounded-lg focus:ring-primary-500 transition-all"
              />
              <span className="ml-3 text-sm font-bold text-slate-600 group-hover:text-primary-700">{amenidad}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex items-center justify-between pt-6">
        <button
          type="button"
          className="px-8 py-4 text-slate-500 font-bold hover:text-slate-800 transition-colors"
          onClick={() => navigate(-1)}
        >
          Descartar cambios
        </button>
        <button
          type="submit"
          disabled={loading || compressing}
          className="btn-primary min-w-[200px]"
        >
          {compressing ? 'Procesando fotos...' : loading ? 'Procesando...' : initialData ? 'Actualizar Anuncio' : 'Publicar Anuncio Ahora'}
        </button>
      </div>
    </form>
  );
};

export default FormularioAnuncio;
