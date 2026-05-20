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
}

module.exports = new GeminiService();
