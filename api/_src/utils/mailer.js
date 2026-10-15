const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = process.env.RESEND_FROM || 'Alquiler NC <onboarding@resend.dev>';

const sendEmail = async (options) => {
  try {
    const { data, error } = await resend.emails.send({
      from:    FROM_ADDRESS,
      to:      options.to,
      subject: options.subject,
      html:    options.html,
      text:    options.text,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error(error.message || 'Error enviando email con Resend');
    }

    console.log('Email enviado con Resend. ID:', data?.id);
    return data;
  } catch (err) {
    console.error('Error en sendEmail (Resend):', err.message);
    throw err;
  }
};

const simpleTemplate = (title, content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:white;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
    <div style="background:linear-gradient(135deg,#10b981,#059669);padding:32px 40px;">
      <h1 style="color:white;margin:0;font-size:24px;font-weight:900;">🏠 Alquiler NC</h1>
      <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:13px;">Nueva Cajamarca, San Martín, Perú</p>
    </div>
    <div style="padding:40px;">
      <h2 style="color:#1e293b;font-size:20px;font-weight:800;margin:0 0 16px;">${title}</h2>
      <div style="color:#64748b;font-size:15px;line-height:1.7;">
        ${content}
      </div>
    </div>
    <div style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="color:#94a3b8;font-size:12px;margin:0;">© ${new Date().getFullYear()} Alquiler NC — Nueva Cajamarca, Perú</p>
      <p style="color:#94a3b8;font-size:12px;margin:4px 0 0;">Este es un correo automático. Por favor no respondas.</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = { sendEmail, simpleTemplate };
