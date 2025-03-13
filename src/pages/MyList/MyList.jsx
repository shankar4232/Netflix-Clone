import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"; // Ensure the path is correct
import "./MyList.css"; // ✅ New CSS file for My List

const MyList = () => {
  const [myList, setMyList] = useState([]);
  const navigate = useNavigate(); // ✅ Fix navigate error

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("myList")) || [];
    setMyList(savedList);
  }, []);

  const removeFromMyList = (id) => {
    const updatedList = myList.filter((item) => item.id !== id);
    setMyList(updatedList);
    localStorage.setItem("myList", JSON.stringify(updatedList));
  };

  return (
    <div className="mylist-container"> 
      {/* ✅ Back Button (Now in Left Corner) */}
      <button className="mylist-back-btn" onClick={() => navigate(-1)}>⬅ Back to Home</button>

      <img src={logo} alt="Netflix Logo" className="mylist-logo" />

      <div className="mylist-content">
        <h1 className="mylist-title">My List</h1>

        {myList.length === 0 ? (
          <p className="mylist-empty">No movies/shows saved yet!</p>
        ) : (
          <div className="mylist-cards">
            {myList.map((item) => (
              <div key={item.id} className="mylist-card">
                <Link to={`/player/${item.id}`} className="mylist-link">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`}
                    alt={item.title || item.name}
                    className="mylist-image"
                  />
                </Link>
                <p className="mylist-name">{item.title || item.name}</p>
                <button className="mylist-remove-btn" onClick={() => removeFromMyList(item.id)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;
