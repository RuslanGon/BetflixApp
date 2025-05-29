import React from "react";
import { useOutletContext } from "react-router-dom";

const MoviesPage = () => {
  const { movies, loading, error, hasMore, onLoadMore } = useOutletContext();

  // Фильтрация фильмов про любовь
  const loveMovies = movies.filter(movie =>
    movie.Title.toLowerCase().includes("love") ||
    movie.Title.toLowerCase().includes("романтик")
  );
  console.log(movies.map(m => m.Title));
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 70 }}>
      {loveMovies.length === 0 && !loading && !error && (
        <p style={{ color: "inherit" }}>Фильмы про любовь не найдены</p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "center",
        }}
      >
        {loveMovies.map((movie) => (
          <div
            key={movie.imdbID}
            style={{
              flex: "0 0 calc((100% - 40px) / 3)",
              border: "1px solid #ccc",
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              transition: "transform 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/180x270?text=No+Image"
              }
              alt={movie.Title}
              style={{ width: "100%", height: 270, objectFit: "cover" }}
            />
            <div style={{ padding: 10 }}>
              <h4 style={{ margin: "0 0 8px 0", fontSize: 16, color: "#000" }}>
                {movie.Title}
              </h4>
              <p style={{ margin: 0, color: "#555" }}>{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>

      {loading && <p>Загрузка...</p>}

      {!loading && hasMore && loveMovies.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20, marginBottom: 30 }}>
          <button
            onClick={onLoadMore}
            style={{
              padding: "10px 20px",
              fontSize: 16,
              cursor: "pointer",
              borderRadius: 4,
              border: "none",
              backgroundColor: "#1976d2",
              color: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1565c0")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1976d2")}
          >
            Загрузить ещё
          </button>
        </div>
      )}

      {!hasMore && loveMovies.length > 0 && (
        <p style={{ marginTop: 20, textAlign: "center" }}>Больше фильмов нет</p>
      )}

      {error && (
        <p style={{ marginTop: 20, color: "red", textAlign: "center" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default MoviesPage;
