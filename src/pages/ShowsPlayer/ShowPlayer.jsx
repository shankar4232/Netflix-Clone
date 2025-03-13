import React, { useEffect, useState } from 'react';
import './ShowsPlayer.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const ShowsPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2UwNzJiYTNjYzQ3ZjY0MGJmYWYxMjc3N2FjOGYxNyIsIm5iZiI6MTc0MTY5MDc1MC4yMDMsInN1YiI6IjY3ZDAxNzdlY2UyMGNmMTk3MjYwOGRjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TydX3xKUNiCpeUy3RiSjl3zC8PzWkDDI8mPGAR91prQ'
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0 && res.results[0].key) {
          setApiData(res.results[0]);
        } else {
          setApiData(null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='shows-player'>
      <img src={back_arrow_icon} alt="Back" onClick={() => navigate(-1)} />
      {loading ? (
        <p>Loading...</p>
      ) : apiData ? (
        <>
          <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder="0" allowFullScreen></iframe>
          <div className="player-info">
            <p>{apiData.published_at?.slice(0, 10)}</p>
            <p>{apiData.name}</p>
            <p>{apiData.type}</p>
          </div>
        </>
      ) : (
        <p>Video is not available</p>
      )}
    </div>
  );
};

export default ShowsPlayer;