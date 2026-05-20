# Pruebas Automatizadas

El proyecto utiliza **Playwright** para realizar pruebas de extremo a extremo (E2E), asegurando que los flujos críticos funcionen correctamente en navegadores reales.

## Configuración de Tests
Los archivos de prueba se encuentran en `frontend/tests/`.
- `full_flow.spec.js`: Cubre el flujo completo desde que un usuario entra a la web, busca un anuncio, se registra, inicia sesión y accede a su panel.

## Cómo Ejecutar los Tests

### Localmente
1. Asegúrate de que el servidor backend y el frontend estén corriendo.
2. Ejecuta los comandos:
```bash
cd frontend
npx playwright test
```

### Reportes
Playwright genera un reporte detallado en HTML después de cada ejecución:
```bash
npx playwright show-report
```

## Áreas Cubiertas
- **Navegación:** Verificación de enlaces y rutas.
- **Formularios:** Validación de Login y Registro.
- **Búsqueda:** Funcionamiento de filtros y carga de resultados.
- **Dashboard:** Acceso restringido y visualización de datos privados.
- **Responsividad:** Pruebas en diferentes tamaños de pantalla (configurado en `playwright.config.js`).
