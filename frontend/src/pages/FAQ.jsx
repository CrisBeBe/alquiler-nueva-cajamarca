import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

const faqs = [
  {
    q: "¿Qué es Alquiler NC?",
    a: "Alquiler NC es la plataforma líder de alquiler de inmuebles en Nueva Cajamarca, San Martín, Perú. Conectamos directamente a propietarios con inquilinos sin intermediarios, de forma gratuita y segura."
  },
  {
    q: "¿Cuánto cuesta alquilar en Nueva Cajamarca?",
    a: "Los precios de alquiler en Nueva Cajamarca varían según el tipo de inmueble y la zona. Un cuarto o habitación puede costar entre S/ 150 y S/ 400 por mes. Un departamento oscila entre S/ 400 y S/ 800 mensuales. Una casa puede ir de S/ 600 a S/ 1,500 por mes dependiendo del tamaño y ubicación."
  },
  {
    q: "¿Cómo encuentro un cuarto de alquiler en Nueva Cajamarca?",
    a: "En Alquiler NC puedes buscar cuartos, habitaciones y departamentos disponibles en Nueva Cajamarca usando nuestros filtros por zona (Centro, Norte, Sur, Este, Oeste) y precio. Todos los anuncios incluyen fotos, precio, descripción y contacto directo con el propietario."
  },
  {
    q: "¿Cuáles son las zonas más populares para alquilar en Nueva Cajamarca?",
    a: "Las zonas con más oferta de alquiler en Nueva Cajamarca son: la Zona Centro (cerca del mercado y la plaza principal), la Zona Norte (Jr. San Martín y alrededores), la Zona Sur (av. principal hacia Moyobamba) y la Zona Este. El Centro es la más solicitada por su acceso a servicios, transporte y comercios."
  },
  {
    q: "¿Puedo publicar mi inmueble en Alquiler NC?",
    a: "Sí, publicar es completamente gratuito. Solo debes registrarte como propietario, verificar tu correo y podrás subir fotos, descripción, precio y datos de contacto de tu inmueble en minutos."
  },
  {
    q: "¿Cómo contacto a un propietario en Nueva Cajamarca?",
    a: "Cada anuncio tiene botones de contacto directo por WhatsApp, llamada telefónica o correo electrónico. No cobramos comisión ni intermediamos en el contacto."
  },
  {
    q: "¿Hay casas en alquiler en Nueva Cajamarca?",
    a: "Sí, en Alquiler NC encontrarás casas completas en alquiler en Nueva Cajamarca con diferentes características: 1, 2 o 3 dormitorios, con o sin garaje, amobladas o sin amoblar. Usa el filtro 'Casa' en el buscador para ver todas las disponibles."
  },
  {
    q: "¿Hay locales comerciales en alquiler en Nueva Cajamarca?",
    a: "Sí, también publicamos locales comerciales en alquiler en Nueva Cajamarca, ideales para negocios, tiendas, oficinas y más. Usa el filtro 'Local' para encontrarlos."
  },
  {
    q: "¿Cómo puedo encontrar alquiler barato en Nueva Cajamarca?",
    a: "Usa el filtro de precio máximo en nuestro buscador para encontrar los alquileres más económicos. También puedes buscar en zonas alejadas del centro como Norte, Sur o Este donde los precios suelen ser menores."
  },
  {
    q: "¿Nueva Cajamarca está en San Martín, Perú?",
    a: "Sí. Nueva Cajamarca es una ciudad ubicada en la provincia de Rioja, región San Martín, Perú. Es una ciudad en crecimiento con alta demanda de alquileres debido al comercio y la migración. Alquiler NC es la plataforma especializada en alquileres para esta ciudad."
  },
  {
    q: "¿Es seguro alquilar a través de Alquiler NC?",
    a: "Alquiler NC verifica la identidad de los propietarios que se registran. Te recomendamos visitar el inmueble antes de cerrar un trato, verificar documentos del propietario y firmar un contrato de arrendamiento. Nosotros facilitamos el contacto, pero el acuerdo lo hacen las partes directamente."
  },
  {
    q: "¿Cómo edito o elimino mi anuncio de alquiler?",
    a: "Desde tu Panel de Control (Dashboard) puedes ver, editar y eliminar tus anuncios en cualquier momento. Solo inicia sesión y haz clic en el ícono de lápiz para editar."
  },
];

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  return (
    <>
      <SEOHead
        title="Preguntas Frecuentes sobre Alquiler en Nueva Cajamarca | Alquiler NC"
        description="¿Cuánto cuesta alquilar en Nueva Cajamarca? ¿Cómo encontrar cuartos, casas y departamentos? Resolvemos todas tus dudas sobre alquiler en Nueva Cajamarca, San Martín, Perú."
        keywords="alquiler nueva cajamarca preguntas, cuanto cuesta alquilar nueva cajamarca, cuartos nueva cajamarca, casas alquiler nueva cajamarca, departamentos nueva cajamarca"
        url="https://alquilernc.vercel.app/faq"
      />

      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <span className="bg-primary-50 text-primary-700 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest inline-block mb-4">
            Centro de Ayuda
          </span>
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
            Preguntas Frecuentes
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Todo lo que necesitas saber sobre alquiler de inmuebles en{' '}
            <strong>Nueva Cajamarca, San Martín, Perú</strong>.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-[1.5rem] shadow-md shadow-slate-100 border border-slate-50 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left gap-4"
                onClick={() => setOpenIdx(openIdx === index ? null : index)}
              >
                <h2 className="text-base font-bold text-slate-800">{faq.q}</h2>
                {openIdx === index
                  ? <HiChevronUp className="text-primary-500 text-xl shrink-0" />
                  : <HiChevronDown className="text-slate-400 text-xl shrink-0" />
                }
              </button>
              {openIdx === index && (
                <div className="px-6 pb-6">
                  <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* SEO content block */}
        <div className="mt-16 bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
          <h2 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">
            Alquiler de inmuebles en Nueva Cajamarca
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            <strong>Nueva Cajamarca</strong> es una de las ciudades con mayor crecimiento en la región{' '}
            <strong>San Martín, Perú</strong>. La demanda de alquiler de cuartos, departamentos, casas
            y locales comerciales aumenta cada año debido al comercio, la agricultura y la migración interna.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            En <strong>Alquiler NC</strong> encontrarás la mayor oferta de inmuebles en alquiler en Nueva
            Cajamarca: desde habitaciones económicas desde <strong>S/ 150/mes</strong> hasta casas completas
            para familias. Todos los anuncios son publicados directamente por los propietarios, sin intermediarios
            y sin comisiones.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Si buscas <strong>alquiler en Nueva Cajamarca</strong>, ya sea en la zona Centro, Norte, Sur,
            Este u Oeste, Alquiler NC es tu mejor opción. Publica gratis o encuentra tu próximo hogar hoy mismo.
          </p>
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-500 mb-6">¿Tienes más dudas?</p>
          <Link to="/contacto" className="btn-primary">Contáctanos directamente</Link>
        </div>
      </div>
    </>
  );
};

export default FAQ;
