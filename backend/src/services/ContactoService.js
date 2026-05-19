const ContactoRepository = require('../repositories/ContactoRepository');
const AnuncioRepository = require('../repositories/AnuncioRepository');
const { sendEmail, simpleTemplate } = require('../utils/mailer');

class ContactoService {
  async registerContacto(contactoData) {
    const { visitante_email, anuncio_id, tipo_contacto } = contactoData;

    // Prevención anti-spam: máximo un contacto por hora por email y anuncio
    const lastContact = await ContactoRepository.checkLastContact(visitante_email, anuncio_id);
    if (lastContact) {
      throw { 
        message: 'Ya has enviado un mensaje para este anuncio recientemente. Inténtalo de nuevo más tarde.', 
        code: 'ANTI_SPAM_LIMIT', 
        status: 429 
      };
    }

    const anuncio = await AnuncioRepository.findById(anuncio_id, false);
    if (!anuncio) {
      throw { message: 'Anuncio no encontrado', code: 'ANUNCIO_NOT_FOUND', status: 404 };
    }

    const contacto = await ContactoRepository.create({
      anuncio_id,
      visitante_email,
      tipo_contacto,
      fecha_contacto: new Date()
    });

    // Notificar al vendedor por email si tiene correo configurado
    if (anuncio.correo_contacto || (anuncio.usuario && anuncio.usuario.email)) {
      const targetEmail = anuncio.correo_contacto || anuncio.usuario.email;
      const html = simpleTemplate(
        'Nuevo Contacto para tu Anuncio',
        `<p>Has recibido un nuevo contacto para tu anuncio: <strong>${anuncio.titulo}</strong></p>
         <p><strong>Email del interesado:</strong> ${visitante_email}</p>
         <p><strong>Tipo de contacto:</strong> ${tipo_contacto}</p>
         <p>Puedes ver más detalles en tu panel de vendedor.</p>`
      );

      await sendEmail({
        to: targetEmail,
        subject: `Nuevo contacto: ${anuncio.titulo}`,
        html
      }).catch(err => console.error('Error enviando email de notificación:', err));
    }

    return contacto;
  }

  async getVendedorContactos(vendedorId) {
    return await ContactoRepository.findByVendedor(vendedorId);
  }
}

module.exports = new ContactoService();
