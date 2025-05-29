import React from "react";
import { useLocation, useOutletContext } from "react-router-dom";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchPage = () => {
  const query = useQuery().get("query")?.toLowerCase() || "";
  const { movies = [] } = useOutletContext() || {};

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(query)
  );

  return (
    <div style={{ padding: 70, maxWidth: 1200, margin: "0 auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#222" }}>
      <h2 style={{ marginBottom: 30, fontWeight: "700", fontSize: 28, textAlign: "center" }}>
        Результаты поиска по запросу: <span style={{ color: "#1976d2" }}>"{query}"</span>
      </h2>

      {filteredMovies.length === 0 ? (
        <p style={{ fontSize: 18, textAlign: "center", color: "#555" }}>
          По вашему запросу ничего не найдено.
        </p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 25, justifyContent: "center" }}>
          {filteredMovies.map((movie) => (
            <div
              key={movie.imdbID}
              style={{
                width: 180,
                borderRadius: 10,
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
                overflow: "hidden",
                backgroundColor: "#fff",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 16px 30px rgba(25, 118, 210, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.12)";
              }}
              title={movie.Title}
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/180x270?text=No+Image"
                }
                alt={movie.Title}
                style={{ width: "100%", height: 270, objectFit: "cover", display: "block" }}
              />
              <div style={{ padding: "12px 10px" }}>
                <h4
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#1976d2",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={movie.Title}
                >
                  {movie.Title}
                </h4>
                <p style={{ margin: 0, color: "#666", fontSize: 14 }}>{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
