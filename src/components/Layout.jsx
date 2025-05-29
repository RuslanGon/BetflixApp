import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar.jsx";
import Footer from "./Footer.jsx";

const Layout = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("love");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Синхронизация searchTerm с параметром query из URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlQuery = params.get("query") || "love";

    if (urlQuery !== searchTerm) {
      setSearchTerm(urlQuery);
      setPage(1);
    }
  }, [location.search]);

  const fetchMovies = async (search, pageToLoad = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=b9f938ce&s=${encodeURIComponent(
          search
        )}&type=movie&page=${pageToLoad}`
      );
      const data = await response.json();

      if (data.Response === "False") {
        if (pageToLoad === 1) setMovies([]);
        setHasMore(false);
        setError(data.Error || "Фильмы не найдены");
      } else {
        setMovies((prev) =>
          pageToLoad === 1 ? data.Search : [...prev, ...data.Search]
        );
        setHasMore(data.Search.length === 10);
      }
    } catch (err) {
      setError("Ошибка при загрузке данных");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (searchTerm.trim()) {
      fetchMovies(searchTerm, 1);
    } else {
      setMovies([]);
      setHasMore(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (page > 1) {
      fetchMovies(searchTerm, page);
    }
  }, [page]);

  const handleSearch = () => {
    if (query.trim() !== "") {
      setSearchTerm(query.trim());
      setPage(1);
    }
  };

  return (
    <Container fixed>
      <Navbar query={query} setQuery={setQuery} onSearch={handleSearch} />
      <Outlet
        context={{
          movies,
          loading,
          error,
          hasMore,
          onLoadMore: () => setPage((prev) => prev + 1),
        }}
      />
      <Footer />
    </Container>
  );
};

export default Layout;
