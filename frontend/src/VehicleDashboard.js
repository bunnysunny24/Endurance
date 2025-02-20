import React, { useState } from 'react';
import useVehicleData from './hooks/useVehicleData';
import useSettings from './hooks/useSettings';
import Header from './components/Header';
import SettingsPanel from './components/SettingsPanel';
import ProfilePanel from './components/ProfilePanel';
import Card3D from './components/Card3D';
import FancyGauge from './components/FancyGauge';
import CircularGauge from './components/CircularGauge';
import Alerts from './components/Alerts';
import AnalyticsChart from './components/AnalyticsChart';
import SuspensionStatus from './components/SuspensionStatus';

const VehicleDashboard = () => {
  const data = useVehicleData();
  const [selectedChart, setSelectedChart] = useState('speed');
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const { settings, updateSettings } = useSettings();
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} p-4 transition-colors duration-300`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} setShowProfile={setShowProfile} setShowSettings={setShowSettings} />
      <SettingsPanel darkMode={darkMode} show={showSettings} onClose={() => setShowSettings(false)} settings={settings} updateSettings={updateSettings} />
      <ProfilePanel darkMode={darkMode} show={showProfile} onClose={() => setShowProfile(false)} profile={{ name: 'John Doe', role: 'Driver', profileImage: '/profile.jpg' }} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card3D title="Speed Monitor" icon={<CircularGauge value={data.speed} max={120} label="km/h" color="text-indigo-600" darkMode={darkMode} />} darkMode={darkMode}>
          <FancyGauge value={data.acceleration} max={5} label="ACCELERATION" color="text-green-600" unit="m/s²" darkMode={darkMode} />
        </Card3D>
        <Card3D title="Battery Status" icon={<CircularGauge value={data.battery} max={100} label="%" color="text-green-600" darkMode={darkMode} />} darkMode={darkMode} />
        <Card3D title="Temperature" icon={<CircularGauge value={data.temperature} max={100} label="°C" color="text-orange-600" darkMode={darkMode} />} darkMode={darkMode} />
        <SuspensionStatus suspension={data.suspension} darkMode={darkMode} />
        <Alerts alerts={data.alerts} darkMode={darkMode} />
        <AnalyticsChart data={data} selectedChart={selectedChart} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default VehicleDashboard;
