const nodemailer = require('nodemailer');

/**
 * Nodemailer Transporter Configuration
 */
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

/**
 * Send an email
 * @param {Object} options - Email options (to, subject, text, html)
 */
const sendEmail = async (options) => {
  const mailOptions = {
    from: `"${process.env.MAIL_FROM_NAME || 'Alquiler Nueva Cajamarca'}" <${process.env.MAIL_FROM_ADDRESS || process.env.MAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error enviando email:', error);
    throw error;
  }
};

/**
 * Simple Template Helper
 * @param {string} title - Email title
 * @param {string} content - Main content of the email
 * @returns {string} - HTML string
 */
const simpleTemplate = (title, content) => {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
      <h2 style="color: #333;">${title}</h2>
      <div style="color: #555; line-height: 1.6;">
        ${content}
      </div>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="font-size: 12px; color: #999;">
        Este es un correo automático de Alquiler Nueva Cajamarca. Por favor no responda.
      </p>
    </div>
  `;
};

module.exports = {
  sendEmail,
  simpleTemplate
};
