const TerminosPrivacidad = ({ title }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 bg-white rounded-[3rem] my-12 shadow-sm border border-slate-50">
      <h1 className="text-4xl font-black text-slate-900 mb-8 tracking-tight text-center">{title}</h1>
      <div className="prose prose-slate max-w-none p-8">
        <p className="text-lg text-slate-600 mb-6">
          Bienvenido a Alquiler NC. Al utilizar nuestra plataforma, aceptas cumplir con los siguientes términos y condiciones.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Uso de la Plataforma</h2>
        <p className="text-slate-600 mb-4">
          Alquiler NC es un mercado que conecta a arrendadores con arrendatarios en Nueva Cajamarca. No somos parte de los contratos de alquiler ni garantizamos la veracidad de los anuncios.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. Privacidad de Datos</h2>
        <p className="text-slate-600 mb-4">
          Protegemos tus datos personales. Tu correo y teléfono solo serán visibles para los usuarios con los que decidas contactar para fines de alquiler.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Responsabilidades</h2>
        <p className="text-slate-600 mb-4">
          Los usuarios son responsables de la información que publican. Está prohibido publicar contenido falso, ofensivo o ilegal.
        </p>

        <p className="mt-12 text-sm text-slate-400 italic">
          Última actualización: Mayo 2026. Alquiler NC se reserva el derecho de modificar estos términos en cualquier momento.
        </p>
      </div>
    </div>
  );
};

export default TerminosPrivacidad;
