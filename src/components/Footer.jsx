import React, { useContext } from 'react';
import { ColorModeContext } from '../context/ToggleColorMode.jsx'; 

const Footer = () => {
  const { mode } = useContext(ColorModeContext);

  const isDark = mode === 'dark';

  const styles = {
    backgroundColor: isDark ? '#111' : '#f0f0f0',
    color: isDark ? '#eee' : '#333',
    padding: '30px 20px',
    textAlign: 'center',
    marginTop: '30px'
  };

  const linkStyle = {
    textDecoration: 'none',
    fontWeight: 500
  };

  return (
    <footer style={styles}>
      <h2 style={{ marginBottom: 10 }}>🎬 MovieWorld</h2>
      <p style={{ marginBottom: 8 }}>Открой для себя мир кино — от классики до новинок</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 10 }}>
        <a
          href="https://www.imdb.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...linkStyle, color: '#f5c518' }}
        >
          IMDb
        </a>
        <a
          href="https://www.rottentomatoes.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...linkStyle, color: '#fa320a' }}
        >
          Rotten Tomatoes
        </a>
        <a
          href="https://www.letterboxd.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...linkStyle, color: '#00b3e6' }}
        >
          Letterboxd
        </a>
      </div>
      <p style={{ marginTop: 20, fontSize: 14, color: isDark ? '#777' : '#666' }}>
        &copy; {new Date().getFullYear()} MovieWorld. Все права защищены.
      </p>
    </footer>
  );
};

export default Footer;
