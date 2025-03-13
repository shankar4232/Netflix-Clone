import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./TvShows.css";
import logo from '../../assets/logo.png';
import TVCards from '../../components/TVcards/Tvcards';
import TrendCards from '../../components/TrendCards/TrendCards';
import ListCard from '../../components/ListCards/ListCards';

const TvShows = () => {
  const navigate = useNavigate();
  const [myList, setMyList] = useState([]);

  // ✅ Load My List from localStorage
  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("myList")) || [];
    setMyList(savedList);
  }, []);

  return (
    <div className='tvshows'>
      <img src={logo} alt="Netflix Logo" className='tvshows-logo' />
      <button className='back-btn' onClick={() => navigate('/')}>⬅ Back to Home</button>
      <div className='tvshows-container'>
        <h1>TV Shows</h1>

        {/* ✅ Add ListCard Component */}
      

        {/* Categories and TV Cards Section */}
        <TVCards title="Trending TV Shows" category="popular" />
        <TrendCards title="Trending WebSeries" category="tv"/>
        <TVCards title="Top Rated Shows" category="top_rated" />
        <ListCard myList={myList} />
        <TVCards title="Airing Today" category="airing_today" />
        <TVCards title="On The Air" category="on_the_air" />
      </div>
    </div>
  );
};

export default TvShows;
