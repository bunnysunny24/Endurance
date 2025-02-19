import React from 'react';

const ProfilePanel = ({ darkMode, show, onClose, profile, updateNotification }) => {
  return (
    <div className={`fixed right-0 top-20 bottom-0 w-80 ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-xl p-4 z-10 transform transition-transform duration-300 ${show ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-lg font-medium ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>My Profile</h3>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700">✖</button>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-indigo-300">
          <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h4 className="text-xl font-bold text-gray-800 dark:text-white">{profile.name}</h4>
        <p className="text-sm text-indigo-600 dark:text-indigo-300">{profile.role}</p>
      </div>
    </div>
  );
};

export default ProfilePanel;
