import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Alquiler NC</h3>
            <p className="text-gray-400">
              La plataforma líder en alquileres en Nueva Cajamarca. Encuentra el lugar perfecto para ti.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Inicio</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Ingresar</Link></li>
              <li><Link to="/registro" className="hover:text-white transition">Registrarse</Link></li>
              <li><Link to="/dashboard/publicar" className="hover:text-white transition">Publicar</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/faq" className="hover:text-white transition">Preguntas Frecuentes</Link></li>
              <li><Link to="/terminos" className="hover:text-white transition">Términos y Condiciones</Link></li>
              <li><Link to="/privacidad" className="hover:text-white transition">Privacidad</Link></li>
              <li><Link to="/contacto" className="hover:text-white transition">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" onClick={(e) => e.preventDefault()} className="text-2xl hover:text-primary-400 transition" title="Próximamente"><FaFacebook /></a>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-2xl hover:text-primary-400 transition" title="Próximamente"><FaTwitter /></a>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-2xl hover:text-primary-400 transition" title="Próximamente"><FaInstagram /></a>
              <a href="https://wa.me/51916225416" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-green-400 transition" title="Contáctanos por WhatsApp"><FaWhatsapp /></a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Suscríbete para recibir las mejores ofertas de alquiler.</p>
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
          &copy; {new Date().getFullYear()} Alquiler Nueva Cajamarca. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
