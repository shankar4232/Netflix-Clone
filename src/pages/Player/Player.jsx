import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2UwNzJiYTNjYzQ3ZjY0MGJmYWYxMjc3N2FjOGYxNyIsIm5iZiI6MTc0MTY5MDc1MC4yMDMsInN1YiI6IjY3ZDAxNzdlY2UyMGNmMTk3MjYwOGRjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TydX3xKUNiCpeUy3RiSjl3zC8PzWkDDI8mPGAR91prQ'
    }
  };
  
  useEffect(() => {
    // Try fetching as a movie first
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0]);
        } else {
          // If no movie data found, try fetching as a TV show
          fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, options)
            .then(res => res.json())
            .then(res => {
              if (res.results && res.results.length > 0) {
                setApiData(res.results[0]);
              } else {
                setApiData(null);
              }
            })
            .catch(err => console.error(err));
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="Back" onClick={() => navigate(-1)} />
      {apiData ? (
        <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder="0" allowFullScreen></iframe>
      ) : (
        <p>Video Trailer is Lodaing/not available</p>
      )}
      <div className="player-info">
        {apiData && (
          <>
            <p>{apiData.published_at?.slice(0, 10)}</p>
            <p>{apiData.name}</p>
            <p>{apiData.type}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Player;
