import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg">🌱</span>
          <span className="font-bold text-slate-200">Agromate Platform</span>
        </div>
        <p>© 2026 Agromate. Empowering farmers and agricultural workers directly with transparent wages.</p>
      </div>
    </footer>
  );
};
