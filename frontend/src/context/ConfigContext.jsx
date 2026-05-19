import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({
    modoSolidario: false,
    loading: true
  });

  const fetchConfig = async () => {
    try {
      const response = await api.get('/config/public');
      setConfig({
        ...response.data.data,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching config', error);
      setConfig(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const updateSetting = async (key, value) => {
    try {
      await api.put('/config/update', { key, value });
      await fetchConfig();
      return true;
    } catch (error) {
      console.error('Error updating setting', error);
      return false;
    }
  };

  return (
    <ConfigContext.Provider value={{ ...config, refreshConfig: fetchConfig, updateSetting }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
