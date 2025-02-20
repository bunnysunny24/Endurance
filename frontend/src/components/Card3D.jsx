import React from "react";

const Card3D = ({ title, children }) => {
  return (
    <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform-gpu hover:scale-105 hover:rotate-1">
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      {children}
      {/* 3D Shadow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg shadow-2xl blur-lg opacity-30"></div>
    </div>
  );
};

import React from "react";

const Card3D = ({ title, children }) => {
  return (
    <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform-gpu hover:scale-105 hover:rotate-1">
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      {children}
      {/* 3D Shadow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg shadow-2xl blur-lg opacity-30"></div>
    </div>
  );
};


  );
};

export default Card3D;