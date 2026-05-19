import { useState } from 'react';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { toast } from 'react-toastify';

const ContactoGeneral = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simular envío
    setTimeout(() => {
      toast.success('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
      setForm({ nombre: '', email: '', mensaje: '' });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Contáctanos</h1>
          <p className="text-slate-500 text-lg mb-8 leading-relaxed">
            ¿Tienes alguna duda, sugerencia o problema con la plataforma? Estamos aquí para ayudarte.
          </p>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary-50 p-4 rounded-2xl text-primary-600">
                <HiMail className="text-2xl" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Email</p>
                <p className="font-bold text-slate-700">soporte@alquilernc.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600">
                <HiPhone className="text-2xl" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">WhatsApp / Celular</p>
                <p className="font-bold text-slate-700">916 225 416</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-orange-50 p-4 rounded-2xl text-orange-600">
                <HiLocationMarker className="text-2xl" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Ubicación</p>
                <p className="font-bold text-slate-700">Nueva Cajamarca, San Martín, Perú</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Tu Nombre</label>
              <input
                type="text"
                required
                value={form.nombre}
                onChange={e => setForm({...form, nombre: e.target.value})}
                className="input-minimal"
                placeholder="Juan Pérez"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Tu Correo</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="input-minimal"
                placeholder="juan@ejemplo.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Mensaje</label>
              <textarea
                required
                rows="5"
                value={form.mensaje}
                onChange={e => setForm({...form, mensaje: e.target.value})}
                className="input-minimal resize-none"
                placeholder="¿En qué podemos ayudarte?"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Enviando...' : 'Enviar Mensaje Ahora'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactoGeneral;
