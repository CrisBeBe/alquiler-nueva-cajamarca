import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Branding */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4 text-primary-400">Alquiler NC</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              La plataforma #1 en <strong>alquiler de casas, cuartos y departamentos en Nueva Cajamarca</strong>, San Martín. Conectamos directamente a dueños con inquilinos sin intermediarios.
            </p>
            {/* Social links */}
            <div className="flex space-x-4">
              <a href="#" onClick={(e) => e.preventDefault()} className="text-2xl hover:text-primary-400 transition" title="Próximamente en Facebook">
                <FaFacebook />
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-2xl hover:text-sky-400 transition" title="Próximamente en Twitter/X">
                <FaTwitter />
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-2xl hover:text-pink-400 transition" title="Próximamente en Instagram">
                <FaInstagram />
              </a>
              <a href="https://wa.me/51916225416" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-green-400 transition" title="Contáctanos por WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Tipo de alquiler — SEO links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Tipos de Alquiler</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/?tipo=casa" className="hover:text-white transition">Alquiler de casas</Link>
              </li>
              <li>
                <Link to="/?tipo=cuarto" className="hover:text-white transition">Alquiler de cuartos</Link>
              </li>
              <li>
                <Link to="/?tipo=departamento" className="hover:text-white transition">Alquiler de departamentos</Link>
              </li>
              <li>
                <Link to="/?tipo=local" className="hover:text-white transition">Locales comerciales</Link>
              </li>
            </ul>
          </div>

          {/* Zonas populares */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Zonas Populares</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/?zona=centro" className="hover:text-white transition">Centro</Link>
              </li>
              <li>
                <Link to="/?zona=norte" className="hover:text-white transition">Zona Norte</Link>
              </li>
              <li>
                <Link to="/?zona=sur" className="hover:text-white transition">Zona Sur</Link>
              </li>
              <li>
                <Link to="/?zona=este" className="hover:text-white transition">Zona Este</Link>
              </li>
              <li>
                <Link to="/?zona=oeste" className="hover:text-white transition">Zona Oeste</Link>
              </li>
            </ul>
          </div>

          {/* Soporte + Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Soporte</h4>
            <ul className="space-y-2 text-gray-400 text-sm mb-6">
              <li><Link to="/faq" className="hover:text-white transition">Preguntas Frecuentes</Link></li>
              <li><Link to="/terminos" className="hover:text-white transition">Términos y Condiciones</Link></li>
              <li><Link to="/privacidad" className="hover:text-white transition">Privacidad</Link></li>
              <li><Link to="/contacto" className="hover:text-white transition">Contacto</Link></li>
            </ul>

            <h4 className="font-semibold mb-3 text-white">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-3">Suscríbete para recibir las mejores ofertas de alquiler.</p>
            <form className="flex" onSubmit={(e) => { e.preventDefault(); alert('¡Gracias por suscribirte!'); }}>
              <input
                type="email"
                placeholder="Tu email"
                className="bg-gray-700 text-white px-4 py-2 rounded-l-md outline-none w-full text-sm"
              />
              <button className="bg-primary-600 px-4 py-2 rounded-r-md hover:bg-primary-700 transition text-sm font-bold">
                Unirse
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
          <p className="mb-2">Hecho con ❤️ para Nueva Cajamarca. Proyecto sin fines de lucro.</p>
          <p>
            &copy; {currentYear} <strong className="text-gray-400">Alquiler Nueva Cajamarca</strong>. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
