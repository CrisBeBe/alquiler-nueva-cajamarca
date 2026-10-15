import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import {
  HiUser, HiMail, HiLockClosed, HiPhone,
  HiArrowRight, HiCheckCircle, HiXCircle,
  HiEye, HiEyeOff, HiBadgeCheck
} from 'react-icons/hi';

// ─── Password strength helpers ──────────────────────────────────────────────
const getStrengthScore = (validations) => {
  const keys = ['length', 'uppercase', 'lowercase', 'number', 'special'];
  return keys.filter((k) => validations[k]).length;
};

const strengthMeta = [
  { label: 'Débil',   color: 'bg-rose-500',   text: 'text-rose-500'   },
  { label: 'Regular', color: 'bg-orange-400',  text: 'text-orange-400' },
  { label: 'Buena',   color: 'bg-yellow-400',  text: 'text-yellow-400' },
  { label: 'Fuerte',  color: 'bg-emerald-500', text: 'text-emerald-500' },
];

const StrengthBar = ({ score }) => {
  // score 0-5 → 4 levels: 0-1 = débil, 2 = regular, 3 = buena, 4-5 = fuerte
  const level = score <= 1 ? 0 : score === 2 ? 1 : score === 3 ? 2 : 3;
  const meta = strengthMeta[level];
  const filledBars = level + 1; // 1..4

  if (score === 0) return null;

  return (
    <div className="mt-2 px-1 space-y-1">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i < filledBars ? meta.color : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-semibold ${meta.text}`}>
        Fortaleza: {meta.label}
      </p>
    </div>
  );
};

// ─── Validation item ─────────────────────────────────────────────────────────
const ValidationItem = ({ label, isMet }) => (
  <div
    className={`flex items-center space-x-2 text-xs font-medium transition-colors ${
      isMet ? 'text-emerald-500' : 'text-rose-400'
    }`}
  >
    {isMet ? (
      <HiCheckCircle className="text-sm shrink-0" />
    ) : (
      <HiXCircle className="text-sm shrink-0" />
    )}
    <span>{label}</span>
  </div>
);

// ─── Loading dots animation ───────────────────────────────────────────────────
const loadingMessages = [
  'Validando datos...',
  'Creando tu cuenta...',
  'Enviando código de verificación...',
  'Casi listo...',
];

const Registro = () => {
  const location = useLocation();

  const [userData, setUserData] = useState({
    email:           location.state?.email           || '',
    password:        location.state?.password        || '',
    confirmPassword: '',
    nombre_completo: location.state?.nombre_completo || '',
    telefono:        location.state?.telefono        || '',
    tipo_usuario:    'inquilino',
  });

  const [showPassword, setShowPassword]           = useState(false);
  const [showConfirm, setShowConfirm]             = useState(false);
  const [success, setSuccess]                     = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx]         = useState(0);

  const [validations, setValidations] = useState({
    length:        false,
    uppercase:     false,
    lowercase:     false,
    number:        false,
    special:       false,
    phone:         false,
    passwordMatch: false,
    emailValid:    false,
  });

  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // ── Live validations ────────────────────────────────────────────────────
  useEffect(() => {
    const { password, confirmPassword, telefono, email } = userData;
    setValidations({
      length:        password.length >= 8,
      uppercase:     /[A-Z]/.test(password),
      lowercase:     /[a-z]/.test(password),
      number:        /[0-9]/.test(password),
      special:       /[!@#$%^&*]/.test(password),
      phone:         /^9\d{8}$/.test(telefono),
      passwordMatch: password.length > 0 && password === confirmPassword,
      emailValid:    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !/\s/.test(email),
    });
  }, [userData]);

  // ── Loading message cycling ─────────────────────────────────────────────
  useEffect(() => {
    if (!loading) { setLoadingMsgIdx(0); return; }
    const interval = setInterval(() => {
      setLoadingMsgIdx((prev) =>
        prev < loadingMessages.length - 1 ? prev + 1 : prev
      );
    }, 900);
    return () => clearInterval(interval);
  }, [loading]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // ── Submit ──────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validations.emailValid) {
      toast.error('El correo electrónico no es válido o contiene espacios');
      return;
    }

    if (!validations.passwordMatch) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    const requiredValidations = ['length', 'uppercase', 'lowercase', 'number', 'special', 'phone'];
    const allValid = requiredValidations.every((k) => validations[k]);
    if (!allValid) {
      toast.error('Por favor cumple con todos los requisitos de validación');
      return;
    }

    setLoading(true);
    try {
      const res = await register(payload);
      setSuccess(true);
      setTimeout(() => {
        navigate('/verificar-correo', { 
          state: { 
            email: userData.email, 
            ...userData,
            verificationCode: res?.verificationCode 
          } 
        });
      }, 1600);
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Error en el registro';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const strengthScore = getStrengthScore(validations);

  // ── Success overlay ─────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="max-w-xl mx-auto mt-12 animate-fade-in">
        <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-50 relative overflow-hidden flex flex-col items-center justify-center min-h-[340px] gap-6">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-primary-500" />
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center animate-bounce">
            <HiBadgeCheck className="text-emerald-500 text-5xl" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black text-slate-900 mb-1">¡Cuenta creada!</h2>
            <p className="text-slate-400 text-sm font-medium">
              Redirigiendo para verificar tu correo…
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Main form ───────────────────────────────────────────────────────────
  return (
    <div className="max-w-xl mx-auto mt-12 animate-fade-in">
      <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-primary-500" />

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Crear Cuenta</h1>
          <p className="text-slate-400 font-medium italic text-sm">
            Únete a la mejor red de alquileres de Nueva Cajamarca.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ── Nombre Completo ── */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Nombre Completo
            </label>
            <div className="relative group">
              <HiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
              <input
                type="text"
                name="nombre_completo"
                required
                value={userData.nombre_completo}
                className="input-minimal !pl-14"
                placeholder="Ej: Juan Pérez"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ── Email ── */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Correo Electrónico
            </label>
            <div className="relative group">
              <HiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
              <input
                type="email"
                name="email"
                required
                value={userData.email}
                className="input-minimal !pl-14"
                placeholder="tu@email.com"
                onChange={handleChange}
              />
            </div>
            {userData.email.length > 0 && (
              <div className="px-1">
                <ValidationItem label="Correo válido y sin espacios" isMet={validations.emailValid} />
              </div>
            )}
          </div>

          {/* ── Teléfono ── */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Teléfono
            </label>
            <div className="relative group">
              <HiPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
              <input
                type="text"
                name="telefono"
                required
                value={userData.telefono}
                className="input-minimal !pl-14"
                placeholder="912345678"
                onChange={handleChange}
              />
            </div>
            <div className="px-1">
              <ValidationItem label="9 dígitos (empieza con 9)" isMet={validations.phone} />
            </div>
          </div>

          {/* ── Tipo de usuario ── */}
          <div className="space-y-3 md:col-span-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Soy…
            </label>
            <div className="flex gap-4">
              {[
                { value: 'propietario', label: '🏠 Propietario', desc: 'Publico inmuebles en alquiler' },
                { value: 'inquilino',   label: '🔑 Inquilino',   desc: 'Busco un inmueble para alquilar' },
              ].map(({ value, label, desc }) => (
                <label
                  key={value}
                  className={`flex-1 flex flex-col items-center gap-1 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 select-none ${
                    userData.tipo_usuario === value
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="tipo_usuario"
                    value={value}
                    checked={userData.tipo_usuario === value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-base font-black">{label}</span>
                  <span className="text-xs text-center leading-tight opacity-80">{desc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* ── Contraseña ── */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Contraseña
            </label>
            <div className="relative group">
              <HiLockClosed className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={userData.password}
                className="input-minimal !pl-14 !pr-14"
                placeholder="••••••••"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary-500 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiEyeOff className="text-xl" /> : <HiEye className="text-xl" />}
              </button>
            </div>

            {/* Strength bar */}
            <StrengthBar score={strengthScore} />

            <div className="grid grid-cols-2 gap-2 px-1 pt-1">
              <ValidationItem label="Mínimo 8 caracteres"     isMet={validations.length}    />
              <ValidationItem label="Una mayúscula"           isMet={validations.uppercase}  />
              <ValidationItem label="Una minúscula"           isMet={validations.lowercase}  />
              <ValidationItem label="Un número"               isMet={validations.number}     />
              <ValidationItem label="Carácter especial (!@#$%^&*)" isMet={validations.special} />
            </div>
          </div>

          {/* ── Confirmar Contraseña ── */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Confirmar Contraseña
            </label>
            <div className="relative group">
              <HiLockClosed className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                required
                value={userData.confirmPassword}
                className="input-minimal !pl-14 !pr-14"
                placeholder="••••••••"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary-500 transition-colors"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <HiEyeOff className="text-xl" /> : <HiEye className="text-xl" />}
              </button>
            </div>
            {userData.confirmPassword.length > 0 && (
              <div className="px-1">
                <ValidationItem label="Las contraseñas coinciden" isMet={validations.passwordMatch} />
              </div>
            )}
          </div>

          {/* ── Submit ── */}
          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  {/* Spinner */}
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12" cy="12" r="10"
                      stroke="currentColor" strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  <span className="transition-all duration-300">
                    {loadingMessages[loadingMsgIdx]}
                  </span>
                </span>
              ) : (
                <>
                  Registrarme Ahora
                  <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm font-medium">
            ¿Ya tienes una cuenta? <br />
            <Link to="/login" className="text-primary-600 font-black hover:underline mt-2 inline-block">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registro;
