import { Link } from 'react-router-dom';

const FAQ = () => {
  const faqs = [
    {
      q: "¿Cómo puedo publicar un anuncio?",
      a: "Para publicar un anuncio, primero debes registrarte o iniciar sesión. Luego, haz clic en el botón 'Publicar' en el encabezado o en tu panel de control."
    },
    {
      q: "¿Es gratis publicar en Alquiler NC?",
      a: "Sí, actualmente puedes publicar tus anuncios de forma gratuita en nuestra plataforma."
    },
    {
      q: "¿Cómo contactar a un vendedor?",
      a: "En la página de detalles de cada anuncio, encontrarás botones para contactar al vendedor por WhatsApp o por correo electrónico."
    },
    {
      q: "¿Cómo puedo editar mi anuncio?",
      a: "Desde tu Panel (Dashboard), verás una lista de tus anuncios. Haz clic en el ícono del lápiz (Editar) para realizar cambios."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Preguntas Frecuentes</h1>
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50">
            <h3 className="text-xl font-bold text-slate-800 mb-4">{faq.q}</h3>
            <p className="text-slate-600 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <p className="text-slate-500 mb-6">¿Tienes más dudas?</p>
        <Link to="/contacto" className="btn-primary">Contáctanos directamente</Link>
      </div>
    </div>
  );
};

export default FAQ;
