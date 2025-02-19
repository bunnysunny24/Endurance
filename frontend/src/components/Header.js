import React from 'react';
import { Car, Clock, Sun, Moon, User, Settings } from 'lucide-react';

const Header = ({ darkMode, setDarkMode, setShowProfile, setShowSettings }) => {
  return (
    <header className={`backdrop-blur-md ${darkMode ? 'bg-slate-800/80' : 'bg-white/70'} mb-6 p-4 rounded-xl shadow-lg flex justify-between items-center sticky top-0 z-20`}>
      <div className="flex items-center">
        <div className={`p-2 ${darkMode ? 'bg-indigo-900/30' : 'bg-indigo-100'} rounded-lg mr-3`}>
          <Car className={`h-6 w-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Vehicle Telemetry Dashboard
          </h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Real-time monitoring system</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className={`flex items-center ${darkMode ? 'bg-slate-700/60' : 'bg-white/70'} p-2 rounded-lg`}>
          <Clock className={`h-4 w-4 ${darkMode ? 'text-indigo-300' : 'text-indigo-500'} mr-2`} />
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{new Date().toLocaleTimeString()}</span>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg transition-colors">
          {darkMode ? <Sun className="h-5 w-5 text-amber-300" /> : <Moon className="h-5 w-5 text-indigo-600" />}
        </button>
        <button onClick={() => setShowProfile(true)} className="p-2 rounded-lg transition-colors">
          <User className={`h-5 w-5 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} />
        </button>
        <button onClick={() => setShowSettings(true)} className="p-2 rounded-lg transition-colors">
          <Settings className={`h-5 w-5 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} />
        </button>
      </div>
    </header>
  );
};

export default Header;
