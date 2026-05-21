import { useState, useEffect } from 'react';
import { HiDownload, HiX } from 'react-icons/hi';

const PWAPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // Prevent the default browser prompt
      e.preventDefault();
      // Save the event to trigger it later
      setInstallPrompt(e);
      // Check if we should show our custom prompt (e.g., not already installed)
      const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
      if (!isInstalled) {
        setIsVisible(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    
    setIsVisible(false);
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    setInstallPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[200] md:left-auto md:max-w-sm animate-bounce-in">
      <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2">
          <button onClick={() => setIsVisible(false)} className="text-slate-400 hover:text-white transition-colors">
            <HiX className="text-xl" />
          </button>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-primary-900/50">
            <img src="/brand-logo-nc.svg" alt="Logo" className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-black text-lg tracking-tight">Instalar AlquilerNC</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">¡Llévanos en tu pantalla!</p>
          </div>
        </div>
        
        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          Instala nuestra App para encontrar tu próximo hogar más rápido y recibir notificaciones.
        </p>
        
        <button 
          onClick={handleInstall}
          className="w-full bg-white text-slate-900 py-3 rounded-xl font-black flex items-center justify-center group hover:bg-primary-500 hover:text-white transition-all shadow-lg"
        >
          <HiDownload className="mr-2 text-xl group-hover:animate-bounce" />
          Añadir a Pantalla de Inicio
        </button>
      </div>
    </div>
  );
};

export default PWAPrompt;
