import { useEffect } from 'react';

const SEOHead = ({ 
  title = 'Alquiler NC - Casas y Cuartos en Nueva Cajamarca',
  description = 'Encuentra habitaciones, departamentos y casas de alquiler en Nueva Cajamarca, San Martín, Perú. La mejor plataforma de alquileres.',
  keywords = 'alquiler nueva cajamarca, casas alquiler nueva cajamarca, cuartos alquiler nueva cajamarca, departamentos nueva cajamarca',
  image = 'https://alquilernc.vercel.app/brand-logo-nc.svg',
  url = 'https://alquilernc.vercel.app'
}) => {
  useEffect(() => {
    // Title
    document.title = title;
    
    // Helper to set meta
    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('robots', 'index, follow');
    
    // Open Graph
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:image', image, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:locale', 'es_PE', 'property');
    setMeta('og:site_name', 'Alquiler NC', 'property');
    
    // Twitter Cards
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);
  }, [title, description, keywords, image, url]);

  return null;
};

export default SEOHead;
