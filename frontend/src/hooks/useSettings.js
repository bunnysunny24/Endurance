import { useState } from 'react';

const useSettings = () => {
  const [settings, setSettings] = useState({
    refreshRate: 500,
    theme: 'indigo',
    units: 'metric'
  });

  const updateSettings = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return { settings, updateSettings };
};

export default useSettings;
