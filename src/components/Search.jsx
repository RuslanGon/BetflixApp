import React from 'react';

const Search = ({ query, setQuery, onSearch }) => {
  return (
    <div style={{ marginBottom: 20, display: 'flex', gap: 10 }}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Введите название фильма"
        style={{
          flexGrow: 1,
          padding: 10,
          fontSize: 16,
          borderRadius: 4,
          border: '1px solid #ccc'
        }}
        onKeyDown={e => { if (e.key === 'Enter') onSearch(); }}
      />
      <button
        onClick={onSearch}
        style={{
          padding: '10px 20px',
          fontSize: 16,
          cursor: 'pointer',
          borderRadius: 4,
          border: 'none',
          backgroundColor: '#1976d2',
          color: '#fff'
        }}
      >
        Поиск
      </button>
    </div>
  );
};

export default Search;
