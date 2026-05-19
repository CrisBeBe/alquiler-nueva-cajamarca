/**
 * Optimiza una URL de Cloudinary añadiendo parámetros de transformación automática.
 * @param {string} url - La URL original de la imagen.
 * @param {string} transforms - Transformaciones adicionales (ej: 'w_800,c_fill').
 * @returns {string} - La URL optimizada.
 */
export const optimizeImage = (url, transforms = '') => {
  if (!url || !url.includes('cloudinary.com')) return url;

  // Insertamos q_auto (calidad automática) y f_auto (formato automático)
  const baseUrl = url.replace('/upload/', `/upload/f_auto,q_auto${transforms ? ',' + transforms : ''}/`);
  return baseUrl;
};
