const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }
  }

  async improveDescription(description) {
    if (!this.model) {
      throw { message: 'Gemini API no configurada', code: 'GEMINI_NOT_CONFIGURED', status: 500 };
    }

    const prompt = `Como un experto en marketing inmobiliario, mejora la siguiente descripción de un anuncio de alquiler de cuarto o casa en Nueva Cajamarca, Perú. Hazla atractiva, clara y profesional, resaltando los beneficios. Mantén la información original.
    
    Descripción original: "${description}"
    
    Entrega solo la descripción mejorada, sin comentarios adicionales.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Error with Gemini API:', error);
      throw { message: 'Error al procesar con IA', code: 'GEMINI_ERROR', status: 500 };
    }
  }

  async generateTitle(description) {
    if (!this.model) {
      throw { message: 'Gemini API no configurada', code: 'GEMINI_NOT_CONFIGURED', status: 500 };
    }

    const prompt = `Genera un título corto y llamativo para un anuncio de alquiler basado en la siguiente descripción. Debe incluir el tipo de inmueble (cuarto o casa) y una característica resaltante.
    
    Descripción: "${description}"
    
    Entrega solo el título, sin comillas ni comentarios.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Error with Gemini API:', error);
      throw { message: 'Error al procesar con IA', code: 'GEMINI_ERROR', status: 500 };
    }
  }

  async interpretarBusqueda(query) {
    if (!this.model) {
      // Si no hay Gemini, retorna búsqueda básica
      return { text: query, tipo: '', zona: '', precioMin: '', precioMax: '' };
    }

    const prompt = `Eres un asistente de búsqueda de alquileres en Nueva Cajamarca, Perú.
Analiza esta búsqueda del usuario y extrae los filtros en formato JSON.

Búsqueda: "${query}"

Extrae los filtros disponibles:
- tipo: puede ser "cuarto", "departamento", "casa", "local" o "" si no se menciona
- zona: puede ser "Centro", "Norte", "Sur", "Este", "Oeste" o "" si no se menciona
- precioMin: número o "" si no hay precio mínimo
- precioMax: número o "" si no hay precio máximo  
- text: términos de búsqueda adicionales o la búsqueda original si no hay filtros claros

Ejemplos:
- "quiero una habitación barata" → {"tipo":"cuarto","zona":"","precioMin":"","precioMax":"400","text":"habitación barata"}
- "casa en el centro menos de 800" → {"tipo":"casa","zona":"Centro","precioMin":"","precioMax":"800","text":""}
- "departamento con 2 habitaciones" → {"tipo":"departamento","zona":"","precioMin":"","precioMax":"","text":"2 habitaciones"}

Responde SOLO con el JSON, sin markdown ni texto adicional.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim();
      // Limpiar si viene con markdown
      const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      return JSON.parse(clean);
    } catch (error) {
      console.error('Error interpretando búsqueda con Gemini:', error);
      return { text: query, tipo: '', zona: '', precioMin: '', precioMax: '' };
    }
  }
}

module.exports = new GeminiService();
