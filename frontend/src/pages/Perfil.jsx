import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { HiUser, HiPhone, HiMail, HiLockClosed, HiTrash, HiExclamation, HiViewGrid } from 'react-icons/hi';

const schema = yup.object({
  nombre_completo: yup.string().required('El nombre es requerido'),
  telefono: yup.string().matches(/^[0-9]{9}$/, 'Debe ser un número de 9 dígitos').required('El teléfono es requerido'),
  currentPassword: yup.string().when('newPassword', {
    is: (val) => val && val.length > 0,
    then: () => yup.string().required('Debes ingresar tu contraseña actual para cambiarla'),
    otherwise: () => yup.string().notRequired(),
  }),
  newPassword: yup.string().transform(v => v === "" ? null : v).nullable().min(6, 'Mínimo 6 caracteres'),
}, [['newPassword', 'newPassword']]).required();

const Perfil = () => {
  const { user, getProfile, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre_completo: user?.nombre_completo || '',
      telefono: user?.telefono || '',
      email: user?.email || '',
    }
  });

  useEffect(() => {
    if (user) {
      reset({
        nombre_completo: user.nombre_completo,
        telefono: user.telefono,
        email: user.email,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.put('/users/profile', data);
      await getProfile();
      toast.success('Perfil actualizado correctamente');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('¿ESTÁS COMPLETAMENTE SEGURO? Esta acción desactivará tu cuenta y no podrás acceder a tus anuncios. Esta acción es irreversible.');
    
    if (confirmed) {
      const finalCheck = prompt('Para confirmar, escribe "ELIMINAR MI CUENTA" en mayúsculas:');
      if (finalCheck === 'ELIMINAR MI CUENTA') {
        try {
          await api.delete('/users/account');
          toast.success('Tu cuenta ha sido eliminada con éxito.');
          logout();
          navigate('/');
        } catch (error) {
          toast.error('Error al eliminar la cuenta');
        }
      } else {
        toast.info('Eliminación cancelada');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div className="text-left">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Mi Perfil</h1>
          <p className="text-slate-500 font-medium">Administra tu información personal y seguridad.</p>
        </div>
        <Link 
          to="/dashboard" 
          className="flex items-center text-sm font-black text-primary-600 bg-primary-50 px-6 py-3 rounded-2xl hover:bg-primary-100 transition-colors"
        >
          <HiViewGrid className="mr-2 text-xl" /> Volver a mi Panel
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Avatar & Summary */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 text-center">
            <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-600 border-4 border-white shadow-lg">
              <HiUser className="text-6xl" />
            </div>
            <h2 className="text-xl font-black text-slate-800 line-clamp-1">{user?.nombre_completo}</h2>
            <p className="text-slate-400 font-medium text-sm mb-6">{user?.email}</p>
            <div className="bg-slate-50 rounded-2xl p-4 text-left">
              <div className="flex items-center text-slate-500 text-xs font-black uppercase tracking-widest mb-1">
                <HiPhone className="mr-2" /> Teléfono
              </div>
              <p className="text-slate-700 font-bold">{user?.telefono || 'No registrado'}</p>
            </div>
          </div>

          <div className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100">
            <div className="flex items-center text-rose-600 mb-4">
              <HiExclamation className="text-2xl mr-2" />
              <h3 className="text-lg font-black tracking-tight">Zona de Peligro</h3>
            </div>
            <p className="text-rose-500/80 text-sm font-medium mb-6">
              Al eliminar tu cuenta, todos tus anuncios serán retirados y ya no podrás acceder a tu panel.
            </p>
            <button 
              onClick={handleDeleteAccount}
              className="w-full py-4 bg-white text-rose-500 border-2 border-rose-200 rounded-2xl font-black text-sm hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all flex items-center justify-center"
            >
              <HiTrash className="mr-2 text-xl" /> Eliminar mi cuenta
            </button>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-50">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nombre Completo</label>
                  <div className="relative group">
                    <HiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
                    <input
                      type="text"
                      {...register('nombre_completo')}
                      className={`input-minimal !pl-14 ${errors.nombre_completo ? 'border-red-300 ring-red-50' : ''}`}
                    />
                  </div>
                  {errors.nombre_completo && <p className="text-red-500 text-xs mt-1 ml-1">{errors.nombre_completo.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                  <div className="relative group opacity-60">
                    <HiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 text-xl" />
                    <input
                      type="email"
                      {...register('email')}
                      disabled
                      className="input-minimal !pl-14 bg-slate-50 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Teléfono</label>
                  <div className="relative group">
                    <HiPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
                    <input
                      type="text"
                      {...register('telefono')}
                      className={`input-minimal !pl-14 ${errors.telefono ? 'border-red-300 ring-red-50' : ''}`}
                    />
                  </div>
                  {errors.telefono && <p className="text-red-500 text-xs mt-1 ml-1">{errors.telefono.message}</p>}
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-center space-x-3 text-slate-800 mb-6">
                  <HiLockClosed className="text-xl text-primary-600" />
                  <h3 className="text-lg font-black tracking-tight">Cambiar Contraseña</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nueva Contraseña</label>
                    <input
                      type="password"
                      {...register('newPassword')}
                      className={`input-minimal ${errors.newPassword ? 'border-red-300 ring-red-50' : ''}`}
                      placeholder="Dejar en blanco para no cambiar"
                    />
                    {errors.newPassword && <p className="text-red-500 text-xs mt-1 ml-1">{errors.newPassword.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Contraseña Actual</label>
                    <input
                      type="password"
                      {...register('currentPassword')}
                      className={`input-minimal ${errors.currentPassword ? 'border-red-300 ring-red-50' : ''}`}
                      placeholder="Requerido para cambios"
                    />
                    {errors.currentPassword && <p className="text-red-500 text-xs mt-1 ml-1">{errors.currentPassword.message}</p>}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary min-w-[200px]"
                >
                  {loading ? 'Guardando...' : 'Actualizar Perfil'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
