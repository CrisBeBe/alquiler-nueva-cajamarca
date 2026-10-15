const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host:   'smtp.gmail.com',
  port:   465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = async (options) => {
  const mailOptions = {
    from:    `"Alquiler NC" <${process.env.MAIL_USER}>`,
    to:      options.to,
    subject: options.subject,
    html:    options.html,
    text:    options.text,
  };
  const info = await transporter.sendMail(mailOptions);
  console.log('Email enviado:', info.messageId);
  return info;
};

const simpleTemplate = (title, content) => `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:white;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
    <div style="background:linear-gradient(135deg,#10b981,#059669);padding:32px 40px;">
      <h1 style="color:white;margin:0;font-size:24px;font-weight:900;">🏠 Alquiler NC</h1>
      <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:13px;">Nueva Cajamarca, San Martín, Perú</p>
    </div>
    <div style="padding:40px;">
      <h2 style="color:#1e293b;font-size:20px;font-weight:800;margin:0 0 16px;">${title}</h2>
      <div style="color:#64748b;font-size:15px;line-height:1.7;">${content}</div>
    </div>
    <div style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="color:#94a3b8;font-size:12px;margin:0;">© ${new Date().getFullYear()} Alquiler NC — Nueva Cajamarca, Perú</p>
    </div>
  </div>
</body>
</html>`;

module.exports = { sendEmail, simpleTemplate };
