const PasswordStrength = ({ password }) => {
  const getStrength = (pass) => {
    let score = 0;
    if (!pass) return { score: 0, label: '', color: '' };
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[!@#$%^&*]/.test(pass)) score++;

    const levels = [
      { score: 0, label: '', color: '', bg: 'bg-slate-200' },
      { score: 1, label: 'Muy débil', color: 'text-red-500', bg: 'bg-red-400' },
      { score: 2, label: 'Débil', color: 'text-orange-500', bg: 'bg-orange-400' },
      { score: 3, label: 'Regular', color: 'text-yellow-500', bg: 'bg-yellow-400' },
      { score: 4, label: 'Buena', color: 'text-blue-500', bg: 'bg-blue-400' },
      { score: 5, label: 'Fuerte 💪', color: 'text-emerald-500', bg: 'bg-emerald-400' },
    ];
    return levels[score] || levels[4];
  };

  const strength = getStrength(password);
  const width = password ? `${(strength.score / 5) * 100}%` : '0%';

  if (!password) return null;

  return (
    <div className="space-y-1">
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${strength.bg}`}
          style={{ width }}
        />
      </div>
      {strength.label && (
        <p className={`text-xs font-bold ${strength.color}`}>Contraseña: {strength.label}</p>
      )}
    </div>
  );
};

export default PasswordStrength;
