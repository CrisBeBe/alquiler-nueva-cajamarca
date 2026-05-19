const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/UserRepository');
const { generateToken, verifyToken } = require('../utils/tokenHelper');
const { sendEmail, simpleTemplate } = require('../utils/mailer');

class AuthService {
  async register(userData) {
    const existingUser = await UserRepository.findByEmail(userData.email);
    if (existingUser) {
      throw { message: 'El correo electrónico ya está registrado', code: 'EMAIL_ALREADY_EXISTS', status: 400 };
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(userData.password, salt);
    
    // Generate verification token (6 digits)
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await UserRepository.create({
      email: userData.email,
      password_hash,
      nombre_completo: userData.nombre_completo,
      telefono: userData.telefono,
      token_verificacion: verificationToken,
      email_verificado: false
    });

    // Send verification email
    const html = simpleTemplate(
      'Verifica tu Correo',
      `<p>Hola <strong>${user.nombre_completo}</strong>,</p>
       <p>Gracias por registrarte en Alquiler NC. Tu código de verificación es:</p>
       <h1 style="font-size: 32px; letter-spacing: 5px; color: #007bff; text-align: center;">${verificationToken}</h1>
       <p>Ingresa este código en la plataforma para activar tu cuenta.</p>`
    );

    await sendEmail({
      to: user.email,
      subject: 'Código de verificación - Alquiler Nueva Cajamarca',
      html
    }).catch(err => console.error('Error enviando email de verificación:', err));

    return { 
      message: 'Usuario registrado. Por favor verifica tu correo con el código enviado.',
      email: user.email 
    };
  }

  async verifyEmail(email, token) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw { message: 'Usuario no encontrado', code: 'USER_NOT_FOUND', status: 404 };
    }

    if (user.token_verificacion !== token) {
      throw { message: 'Código de verificación incorrecto', code: 'INVALID_TOKEN', status: 400 };
    }

    await UserRepository.update(user.id, {
      email_verificado: true,
      token_verificacion: null
    });

    const jwtToken = generateToken({ id: user.id, email: user.email });
    return { user: this._sanitizeUser(user), token: jwtToken };
  }

  async resendVerificationCode(email) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw { message: 'Usuario no encontrado', code: 'USER_NOT_FOUND', status: 404 };
    }

    if (user.email_verificado) {
      throw { message: 'Este correo ya está verificado', code: 'EMAIL_ALREADY_VERIFIED', status: 400 };
    }

    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    await UserRepository.update(user.id, { token_verificacion: verificationToken });

    const html = simpleTemplate(
      'Nuevo Código de Verificación',
      `<p>Hola <strong>${user.nombre_completo}</strong>,</p>
       <p>Has solicitado un nuevo código de verificación. Tu nuevo código es:</p>
       <h1 style="font-size: 32px; letter-spacing: 5px; color: #007bff; text-align: center;">${verificationToken}</h1>
       <p>Ingresa este código para activar tu cuenta.</p>`
    );

    await sendEmail({
      to: user.email,
      subject: 'Nuevo código de verificación - Alquiler Nueva Cajamarca',
      html
    });

    return { message: 'Código reeviado con éxito' };
  }

  async login(email, password) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw { message: 'El usuario no existe', code: 'USER_NOT_FOUND', status: 404 };
    }

    if (!user.email_verificado) {
      throw { message: 'Debes verificar tu correo antes de iniciar sesión.', code: 'EMAIL_NOT_VERIFIED', status: 403 };
    }

    if (user.estado !== 'activo') {
      throw { message: 'Cuenta inactiva. Contacte al soporte.', code: 'ACCOUNT_INACTIVE', status: 403 };
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw { message: 'Credenciales inválidas', code: 'INVALID_CREDENTIALS', status: 401 };
    }

    const token = generateToken({ id: user.id, email: user.email });

    return { user: this._sanitizeUser(user), token };
  }

  async requestPasswordReset(email) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      // Por seguridad, no revelamos si el correo existe o no
      return { message: 'Si el correo está registrado, recibirá instrucciones pronto.' };
    }

    // En un caso real, generaríamos un token temporal guardado en DB o Redis
    // Por ahora, usaremos un JWT corto (15 min)
    const resetToken = generateToken({ id: user.id, purpose: 'password_reset' });
    
    // Simular envío de correo
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const html = simpleTemplate(
      'Restablecer Contraseña',
      `<p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace:</p>
       <a href="${resetUrl}" style="padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">Restablecer Contraseña</a>
       <p>Si no solicitaste esto, ignora este correo. El enlace expira en 15 minutos.</p>`
    );

    await sendEmail({
      to: user.email,
      subject: 'Restablecer Contraseña - Alquiler Nueva Cajamarca',
      html
    });

    return { message: 'Correo de restablecimiento enviado.' };
  }

  async resetPassword(token, newPassword) {
    // Aquí se verificaría el token (tokenHelper.verifyToken ya lanza error si expira o es inválido)
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      throw { message: 'Token de restablecimiento inválido o expirado', code: 'INVALID_RESET_TOKEN', status: 400 };
    }

    if (decoded.purpose !== 'password_reset') {
      throw { message: 'Token inválido para esta operación', code: 'INVALID_TOKEN_PURPOSE', status: 400 };
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(newPassword, salt);

    await UserRepository.update(decoded.id, { password_hash });

    return { message: 'Contraseña actualizada correctamente.' };
  }

  _sanitizeUser(user) {
    const sanitized = user.toJSON();
    delete sanitized.password_hash;
    return sanitized;
  }
}

module.exports = new AuthService();
