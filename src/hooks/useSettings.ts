
import { useState, useEffect } from 'react';

interface Settings {
  lastPrompt: string;
  style: string;
  imageAmount: number[];
  resolution: string[];
  guidanceScale: number[];
  seed: string;
  negativePrompt: string;
}

const defaultSettings: Settings = {
  lastPrompt: '',
  style: 'realistic',
  imageAmount: [4],
  resolution: ['1024'],
  guidanceScale: [7.5],
  seed: '',
  negativePrompt: ''
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('dreamforge-settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('dreamforge-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return { settings, updateSetting };
};
