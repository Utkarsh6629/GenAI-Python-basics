import React from 'react';
import { Terminal, Search, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

export const Navbar = ({ searchQuery, setSearchQuery, progressPercent, onOpenPlayground }) => {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <Sparkles size={22} className="brand-icon" />
        <span>Python & Gen AI Bootcamp</span>
      </div>

      <div className="navbar-search">
        <Search size={16} color="#64748b" />
        <input
          type="text"
          placeholder="Search lessons, concepts, operators..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="navbar-actions">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen size={16} color="#94a3b8" />
          <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 600 }}>
            Progress: {progressPercent}%
          </span>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <button className="btn-primary" onClick={onOpenPlayground}>
          <Terminal size={16} />
          <span>Python Sandbox</span>
        </button>
      </div>
    </header>
  );
};
