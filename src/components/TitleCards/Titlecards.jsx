import React, { useEffect, useRef, useState } from 'react';
import "./TitleCards.css";
import { Link } from 'react-router-dom';

const Titlecards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [page, setPage] = useState(1);
  const [myList, setMyList] = useState([]);
  const [addedToList, setAddedToList] = useState({});
  const [notification, setNotification] = useState(""); // ✅ Notification State
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2UwNzJiYTNjYzQ3ZjY0MGJmYWYxMjc3N2FjOGYxNyIsIm5iZiI6MTc0MTY5MDc1MC4yMDMsInN1YiI6IjY3ZDAxNzdlY2UyMGNmMTk3MjYwOGRjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TydX3xKUNiCpeUy3RiSjl3zC8PzWkDDI8mPGAR91prQ'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=${page}`, options)
      .then(response => response.json())
      .then(data => setApiData(data.results || []))
      .catch(err => console.error("API Fetch Error:", err));

    setMyList(JSON.parse(localStorage.getItem("myList")) || []);
  }, [category, page]);

  const saveToMyList = (movie) => {
    let updatedList = JSON.parse(localStorage.getItem("myList")) || [];

    if (!updatedList.find((item) => item.id === movie.id)) {
      updatedList.push(movie);
      localStorage.setItem("myList", JSON.stringify(updatedList));
      setMyList(updatedList);

      // ✅ Show notification instead of alert
      setNotification(`${movie.title || movie.original_title} added to My List!`);
      setTimeout(() => setNotification(""), 3000); // ✅ Auto-hide after 3 seconds

      // ✅ Change "+" to "✔" for 2 seconds
      setAddedToList((prev) => ({ ...prev, [movie.id]: true }));
      setTimeout(() => {
        setAddedToList((prev) => ({ ...prev, [movie.id]: false }));
      }, 2000);
    } else {
      setNotification("Already in My List!"); // ✅ Notification instead of alert
      setTimeout(() => setNotification(""), 3000); // ✅ Auto-hide after 3 seconds
    }
  };

  return (
    <div className='title-cards' style={{ position: 'relative' }}>
      <h2>{title ? title : "Popular on Netflix"}</h2>

      {/* ✅ Notification Message */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <div key={index} className="card" style={{ position: "relative", textAlign: "center" }}>
            <Link to={`/player/${card.id}`} style={{ textDecoration: "none" }}>
              <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path || card.poster_path}`} alt={card.title} />
              <p>{card.original_language === "en" ? card.original_title : card.title}</p>
            </Link>

            {/* "+ List" Button */}
            <button 
              onClick={() => saveToMyList(card)}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                backgroundColor: addedToList[card.id] ? "green" : "rgba(255, 215, 0, 0.8)",
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
        ))}
      </div>

      {/* Floating Pagination Buttons */}
      <button className='left-page-btn  pagination-btn' 
        onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))} 
        disabled={page === 1} 
        style={{ 
          position: 'absolute',
          left: '10px', 
          top: '60%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(74, 66, 66, 0.8)', 
          color: 'white', 
          fontSize: '28px', 
          borderRadius: '7px', 
          padding: '10px 15px',
          cursor: page === 1 ? 'not-allowed' : 'pointer', 
          zIndex: 10, 
          border: 'none',
          transition: 'background-color 0.3s ease',
          opacity: page === 1 ? 0.5 : 1
        }}
        onMouseEnter={(e) => { if (page !== 1) e.target.style.backgroundColor = 'rgba(139, 0, 0, 0.9)'; }}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(74, 66, 66, 0.8)'}
      >
        ‹
      </button>

      <button 
        onClick={() => setPage((prevPage) => prevPage + 1)} 
         className="pagination-btn"
        style={{ 
          position: 'absolute',
          right: '10px',
          top: '60%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(74, 66, 66, 0.8)', 
          color: 'white', 
          fontSize: '28px', 
          borderRadius: '7px', 
          padding: '10px 15px',
          cursor: 'pointer',
          zIndex: 10, 
          border: 'none',
          transition: 'background-color 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(139, 0, 0, 0.9)'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(74, 66, 66, 0.8)'}
      >
        ›
      </button>
    </div>
  );
};

export default Titlecards;
