import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // ✅ Added useNavigate for Back Button
import "./SearchResults.css";
import { Link } from 'react-router-dom';

const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2UwNzJiYTNjYzQ3ZjY0MGJmYWYxMjc3N2FjOGYxNyIsIm5iZiI6MTc0MTY5MDc1MC4yMDMsInN1YiI6IjY3ZDAxNzdlY2UyMGNmMTk3MjYwOGRjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TydX3xKUNiCpeUy3RiSjl3zC8PzWkDDI8mPGAR91prQ"; // ✅ Replace with your TMDb API key

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Navigation for Back Button
  const query = new URLSearchParams(location.search).get("q"); // ✅ Extract search query from URL
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&language=en-US`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: API_KEY,
        },
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => setResults(data.results || []))
        .catch(err => console.error("Error fetching search results:", err));
    }
  }, [query]);

  return (
    <div className="search-results">
      {/* ✅ Back to Home Button */}
      <button className="back-btn" onClick={() => navigate('/')}>
        ⬅ Back to Home
      </button>

      <h1>Search Results for "{query}"</h1>
      
      <div className="results-grid">
        {results.length > 0 ? (
          results.map((item) => (
            <Link key={item.id} to={item.media_type === "movie" ? `/player/${item.id}` : `/player/${item.id}`} className="search-card">
              <img
                src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : `https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                alt={item.title || item.name}
              />
              <p>{item.title || item.name}</p>
            </Link>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
