import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Browse.css";

const Browse = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [myList, setMyList] = useState([]);
  const [addedToList, setAddedToList] = useState({});
  const [notification, setNotification] = useState(""); // ✅ Notification state
  const [page, setPage] = useState(1);
  const movieRef = useRef();
  const tvShowRef = useRef();
  const navigate = useNavigate(); // ✅ For navigation

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2UwNzJiYTNjYzQ3ZjY0MGJmYWYxMjc3N2FjOGYxNyIsIm5iZiI6MTc0MTY5MDc1MC4yMDMsInN1YiI6IjY3ZDAxNzdlY2UyMGNmMTk3MjYwOGRjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TydX3xKUNiCpeUy3RiSjl3zC8PzWkDDI8mPGAR91prQ",
    },
  };

  useEffect(() => {
    // ✅ Fetch Movies
    fetch(
      `https://api.themoviedb.org/3/discover/movie?with_original_language=${selectedLanguage}&language=en-US&page=${page}`,
      options
    )
      .then((response) => response.json())
      .then((data) => setMovies(data.results || []));

    // ✅ Fetch TV Shows
    fetch(
      `https://api.themoviedb.org/3/discover/tv?with_original_language=${selectedLanguage}&language=en-US&page=${page}`,
      options
    )
      .then((response) => response.json())
      .then((data) => setTvShows(data.results || []));

    setMyList(JSON.parse(localStorage.getItem("myList")) || []);
  }, [selectedLanguage, page]);

  const saveToMyList = (item) => {
    let updatedList = JSON.parse(localStorage.getItem("myList")) || [];

    if (!updatedList.find((listItem) => listItem.id === item.id)) {
      updatedList.push(item);
      localStorage.setItem("myList", JSON.stringify(updatedList));
      setMyList(updatedList);

      // ✅ Show notification
      setNotification(`${item.title || item.name} added to My List!`);
      setTimeout(() => setNotification(""), 3000); // ✅ Auto-hide after 3 seconds

      // ✅ Change "+" to "✔" for 2 seconds
      setAddedToList((prev) => ({ ...prev, [item.id]: true }));
      setTimeout(() => {
        setAddedToList((prev) => ({ ...prev, [item.id]: false }));
      }, 2000);
    } else {
      setNotification("Already in My List!"); // ✅ Show notification instead of alert
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="browse-container">
      {/* ✅ Back to Home Button */}
      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Back to Home
      </button>

      <h2>Browse by Language</h2>

      {/* ✅ Notification Box */}
      {notification && <div className="notification-box">{notification}</div>}

      {/* ✅ Language Dropdown */}
      <div className="dropdown-container">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="language-dropdown"
        >
          <option value="en">English</option>
          <option value="ja">Japanese</option>
          <option value="zh">Chinese</option>
          <option value="hi">Hindi</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="ko">Korean</option>
        </select>
      </div>

      {/* ✅ Movies Section */}
      <h3>Movies ({selectedLanguage.toUpperCase()})</h3>
      <div className="browse-wrapper">
        <button className="scroll-btn left-btn" onClick={() => scrollLeft(movieRef)}>‹</button>
        <div className="browse-results" ref={movieRef}>
          {movies.map((movie) => (
            <div key={movie.id} className="browse-card" style={{ position: "relative" }}>
              <Link to={`/player/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`} alt={movie.title} />
              </Link>
              <p>{movie.title}</p>

              {/* ✅ "+" Button on Each Card */}
              <button
                className="add-btn"
                onClick={() => saveToMyList(movie)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  backgroundColor: addedToList[movie.id] ? "green" : "rgba(255, 215, 0, 0.9)",
                  color: "black",
                  fontSize: "16px",
                  borderRadius: "50%",
                  padding: "5px 8px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                }}
              >
                {addedToList[movie.id] ? "✔" : "+"}
              </button>
            </div>
          ))}
        </div>
        <button className="scroll-btn right-btn" onClick={() => scrollRight(movieRef)}>›</button>
      </div>

      {/* ✅ Pagination Buttons */}
      <div className="pagination-container">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1} className="pagination-btn">
          ‹ Prev
        </button>
        <button onClick={() => setPage((prev) => prev + 1)} className="pagination-btn">
          Next ›
        </button>
      </div>

      {/* ✅ TV Shows Section */}
      <h3>TV Shows ({selectedLanguage.toUpperCase()})</h3>
      <div className="browse-wrapper">
        <button className="scroll-btn left-btn" onClick={() => scrollLeft(tvShowRef)}>‹</button>
        <div className="browse-results" ref={tvShowRef}>
          {tvShows.map((show) => (
            <div key={show.id} className="browse-card" style={{ position: "relative" }}>
              <Link to={`/player/${show.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500${show.poster_path || show.backdrop_path}`} alt={show.name} />
              </Link>
              <p>{show.name}</p>

              {/* ✅ "+" Button on Each Card */}
              <button
                className="add-btn"
                onClick={() => saveToMyList(show)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  backgroundColor: addedToList[show.id] ? "green" : "rgba(255, 215, 0, 0.9)",
                  color: "black",
                  fontSize: "16px",
                  borderRadius: "50%",
                  padding: "5px 8px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                }}
              >
                {addedToList[show.id] ? "✔" : "+"}
              </button>
            </div>
          ))}
        </div>
        <button className="scroll-btn right-btn" onClick={() => scrollRight(tvShowRef)}>›</button>
      </div>
    </div>
  );
};

export default Browse;
