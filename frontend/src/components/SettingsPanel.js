import React from 'react';

const SettingsPanel = ({ darkMode, show, onClose, settings, updateSettings }) => {
  const themes = [
    { id: 'indigo', from: 'from-indigo-600', to: 'to-purple-600' },
    { id: 'cyan', from: 'from-cyan-600', to: 'to-blue-600' },
    { id: 'green', from: 'from-green-600', to: 'to-teal-600' }
  ];

  return (
    <div className={`fixed right-0 top-20 bottom-0 w-64 ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-xl p-4 z-10 transform transition-transform duration-300 ${show ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-medium ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>Dashboard Settings</h3>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700">
          ✖
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Refresh Rate</label>
          <select 
            value={settings.refreshRate}
            onChange={(e) => updateSettings('refreshRate', parseInt(e.target.value))}
            className="w-full bg-gray-100 dark:bg-slate-700 rounded-lg border-none p-2 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
          >
            <option value={500}>Real-time (500ms)</option>
            <option value={1000}>Fast (1s)</option>
            <option value={2000}>Normal (2s)</option>
            <option value={5000}>Slow (5s)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
