import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const TVCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2UwNzJiYTNjYzQ3ZjY0MGJmYWYxMjc3N2FjOGYxNyIsIm5iZiI6MTc0MTY5MDc1MC4yMDMsInN1YiI6IjY3ZDAxNzdlY2UyMGNmMTk3MjYwOGRjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TydX3xKUNiCpeUy3RiSjl3zC8PzWkDDI8mPGAR91prQ' // ✅ Updated API Key
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/person/${category?category:"p"}/?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results))
      .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel);
  }, [category]);

  return (
    <div className='tv-cards'>
      <h2>{title ? title : "Trending"}</h2>
      <div className='tv-card-list' ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="cardtv" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.name} />
            <p>{card.title || card.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TVCards;