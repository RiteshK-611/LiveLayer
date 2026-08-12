import React from 'react';
import { open } from '@tauri-apps/plugin-shell';
import { FiGithub, FiGlobe, FiHeart, FiDownload } from 'react-icons/fi';

const About: React.FC = () => {
  return (
    <div className="wallpaper-container">
      <div className="section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2.6rem' }}>
        <img src="/livelayer.png" alt="LiveLayer Logo" style={{ width: '80px', height: '80px', marginBottom: '1rem' }} />
        <h2 style={{ fontFamily: '"Borel", cursive', fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 400 }}>livelayer</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Version 2.4.6</p>

        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', width: '100%' }}>
          <button
            className="btn"
            style={{ justifyContent: 'center', padding: '0.75rem 1.5rem' }}
            onClick={() => open('https://livelayerapp.com')}
          >
            <FiGlobe style={{ fontSize: '1.2rem' }} /> Website
          </button>

          <button
            className="btn"
            style={{ justifyContent: 'center', padding: '0.75rem 1.5rem' }}
            onClick={() => open('https://github.com/riteshk-611/livelayer')}
          >
            <FiGithub style={{ fontSize: '1.2rem' }} /> GitHub
          </button>

          <button
            className="btn"
            style={{ justifyContent: 'center', padding: '0.75rem 1.5rem', background: 'var(--accent-blue)', color: '#1a1a2e', border: 'none', fontWeight: 600 }}
            onClick={() => open('https://livelayerapp.com/wallpapers')}
          >
            <FiDownload style={{ fontSize: '1.2rem' }} /> Get Wallpapers
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
