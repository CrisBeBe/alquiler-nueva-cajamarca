const express = require('express');
const router = express.Router();
const GeminiService = require('../services/GeminiService');

// POST /api/search/ai - Interpreta búsqueda con IA
router.post('/ai', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || query.trim().length < 2) {
      return res.status(400).json({ message: 'Ingresa al menos 2 caracteres para buscar' });
    }
    const filtros = await GeminiService.interpretarBusqueda(query.trim());
    return res.json({ filtros, original: query });
  } catch (error) {
    console.error('Error en búsqueda IA:', error);
    return res.status(500).json({ message: 'Error al procesar la búsqueda' });
  }
});

module.exports = router;
