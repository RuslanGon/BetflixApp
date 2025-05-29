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
    <div style={{ padding: 70 }}>
      <h2>Результаты поиска по запросу: "{query}"</h2>
      {filteredMovies.length === 0 ? (
        <p>По вашему запросу ничего не найдено.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
          {filteredMovies.map((movie) => (
            <div key={movie.imdbID}>
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/180x270?text=No+Image"
                }
                alt={movie.Title}
                style={{ width: 180, height: 270, objectFit: "cover" }}
              />
              <h4>{movie.Title}</h4>
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
