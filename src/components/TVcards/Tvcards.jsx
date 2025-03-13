import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Tvcards.css";

const TVCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [page, setPage] = useState(1);
  const [myList, setMyList] = useState([]);
  const [addedToList, setAddedToList] = useState({});
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(""); // ✅ Notification state
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2UwNzJiYTNjYzQ3ZjY0MGJmYWYxMjc3N2FjOGYxNyIsIm5iZiI6MTc0MTY5MDc1MC4yMDMsInN1YiI6IjY3ZDAxNzdlY2UyMGNmMTk3MjYwOGRjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TydX3xKUNiCpeUy3RiSjl3zC8PzWkDDI8mPGAR91prQ"
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${category ? category : "popular"}?language=en-US&page=${page}`, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.results) {
          setApiData(data.results);
        } else {
          setError("No data available");
        }
      })
      .catch(err => {
        console.error("API Fetch Error:", err);
        setError(err.message);
      });

    setMyList(JSON.parse(localStorage.getItem("myList")) || []);
  }, [category, page]);

  const saveToMyList = (movie) => {
    let updatedList = JSON.parse(localStorage.getItem("myList")) || [];

    if (!updatedList.find((item) => item.id === movie.id)) {
      updatedList.push(movie);
      localStorage.setItem("myList", JSON.stringify(updatedList));
      setMyList(updatedList);

      // ✅ Show notification
      setNotification(`${movie.name || movie.original_name} added to My List!`);
      setTimeout(() => setNotification(""), 3000); // ✅ Auto-hide after 3 seconds

      // ✅ Change "+" to "✔" for 2 seconds
      setAddedToList((prev) => ({ ...prev, [movie.id]: true }));
      setTimeout(() => {
        setAddedToList((prev) => ({ ...prev, [movie.id]: false }));
      }, 2000);
    } else {
      setNotification("Already in My List!"); // ✅ Show notification instead of alert
      setTimeout(() => setNotification(""), 3000);
    }
  };

  return (
    <div className="tv-cards" style={{ position: "relative" }}>
      <h2>{title ? title : "Popular TV Shows"}</h2>

      {/* ✅ Notification Box */}
      {notification && (
        <div className="notification-box">
          {notification}
        </div>
      )}

      {/* ✅ Error Handling */}
      {error ? (
        <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>
      ) : (
        <div className="tv-card-list" ref={cardsRef}>
          {apiData.length > 0 ? (
            apiData.map((card, index) => (
              <div key={index} className="cardtv" style={{ position: "relative", textAlign: "center" }}>
                <Link to={`/player/${card.id}`} style={{ textDecoration: "none" }}>
                  <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path || card.poster_path}`} alt={card.name} />
                  <p>{card.name || card.original_name}</p>
                </Link>

                {/* ✅ "+ List" Button */}
                <button
                  onClick={() => saveToMyList(card)}
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    backgroundColor: addedToList[card.id] ? "green" : "rgba(255, 215, 0, 0.9)",
                    color: "black",
                    fontSize: "16px",
                    borderRadius: "50%",
                    padding: "5px 8px",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  {addedToList[card.id] ? "✔" : "+"}
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: "gray", textAlign: "center" }}>Loading...</p>
          )}
        </div>
      )}

      {/* ✅ Pagination Buttons */}
      <button
        onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
        disabled={page === 1}
        className="pagination-btn"
        style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(74, 66, 66, 0.8)",
          color: "white",
          fontSize: "24px",
          borderRadius: "8px",
          padding: "10px 15px",
          cursor: page === 1 ? "not-allowed" : "pointer",
          zIndex: 10,
          border: "none",
          transition: "background-color 0.3s ease",
          opacity: page === 1 ? 0.5 : 1
        }}
        onMouseEnter={(e) => { if (page !== 1) e.target.style.backgroundColor = "rgba(139, 0, 0, 0.9)"; }}
        onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(74, 66, 66, 0.8)"}
      >
        ‹
      </button>

      <button
        onClick={() => setPage((prevPage) => prevPage + 1)}
        className="pagination-btn"
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(74, 66, 66, 0.8)",
          color: "white",
          fontSize: "24px",
          borderRadius: "8px",
          padding: "10px 15px",
          cursor: "pointer",
          zIndex: 10,
          border: "none",
          transition: "background-color 0.3s ease"
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(139, 0, 0, 0.9)"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(74, 66, 66, 0.8)"}
      >
        ›
      </button>
    </div>
  );
};

export default TVCards;
