import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "./TVCards.css"; // ✅ Use the same CSS for consistent styling

const ListCards = ({ title }) => {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("myList")) || [];
    setMyList(savedList);
  }, []);

  return (
    <div className="tv-cards"> {/* ✅ Same class as TVCards */}
      <h2>{title ? title : "My List"}</h2>

      <div className="tv-card-list">
        {myList.length > 0 ? (
          myList.map((card, index) => (
            <div key={index} className="cardtv" style={{ position: "relative", textAlign: "center" }}>
              <Link to={`/player/${card.id}`} style={{ textDecoration: "none" }}>
                <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path || card.poster_path}`} alt={card.name} />
                <p>{card.name || card.original_name}</p>
              </Link>

              {/* ✅ Remove from List Button */}
              <button 
                onClick={() => {
                  const updatedList = myList.filter((item) => item.id !== card.id);
                  setMyList(updatedList);
                  localStorage.setItem("myList", JSON.stringify(updatedList));
                }}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  backgroundColor: "#DC143C",
                  color: "white",
                  fontSize: "14px",
                  borderRadius: "50%",
                  padding: "5px 8px",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                X
              </button>
            </div>
          ))
        ) : (
          <p style={{ color: "gray", textAlign: "center", width: "100%" }}>No items in My List</p>
        )}
      </div>
    </div>
  );
};

export default ListCards;
