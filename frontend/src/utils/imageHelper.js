import heic2any from "heic2any";

/**
 * Optimiza una URL de Cloudinary añadiendo parámetros de transformación automática.
 */
export const optimizeImage = (url, transforms = '') => {
  if (!url || !url.includes('cloudinary.com')) return url;
  return url.replace('/upload/', `/upload/f_auto,q_auto${transforms ? ',' + transforms : ''}/`);
};

/**
 * Convierte archivos HEIC/HEIF a JPEG de forma segura.
 */
const convertHeicToJpeg = async (file) => {
  const isHeic = file.name?.toLowerCase().endsWith(".heic") || 
                 file.name?.toLowerCase().endsWith(".heif") || 
                 file.type === "image/heic" || 
                 file.type === "image/heif";

  if (!isHeic) return file;

  try {
    const blob = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.5, // Reducido para mayor velocidad
    });
    const singleBlob = Array.isArray(blob) ? blob[0] : blob;
    return new File([singleBlob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
      type: "image/jpeg",
    });
  } catch (err) {
    console.error("HEIC conversion failed:", err);
    return file;
  }
};

/**
 * Redimensiona y comprime una imagen usando Canvas.
 */
const resizeImage = (file, maxWidth = 900, quality = 0.5) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          let { width, height } = img;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(b => resolve(b ? new File([b], file.name, { type: 'image/jpeg' }) : file), 'image/jpeg', quality);
        } catch (err) {
          resolve(file);
        }
      };
      img.onerror = () => resolve(file);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
};

/**
 * Orquestador de procesamiento de imagen: Convierte -> Comprime -> Retorna Preview.
 */
export const processImageForUpload = async (file) => {
  // Procesamiento veloz
  const jpegFile = await convertHeicToJpeg(file);
  const finalFile = await resizeImage(jpegFile, 900, 0.5);
  
  // Preview instantánea
  const preview = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(finalFile);
  });

  return { file: finalFile, preview };
};
