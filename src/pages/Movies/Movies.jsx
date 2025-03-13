import React from 'react';
import { useNavigate } from 'react-router-dom';
// import "./TvShows.css";
import logo from '../../assets/logo.png';
import TVCards from '../../components/TVcards/Tvcards';
import TrendCards from '../../components/TrendCards/TrendCards';
import Titlecards from '../../components/TitleCards/Titlecards';
import PersonCards from '../../components/PersonCards/PersonCards'

const Movies = () => {
  const navigate = useNavigate();

  return (
    <div className='tvshows'>
      <img src={logo} alt="Netflix Logo" className='tvshows-logo' />
      <button className='back-btn' onClick={() => navigate(-1)}>⬅ Back to Home</button>
      <div className='tvshows-container'>
        <h1>Movies</h1>
        
        {/* Categories and TV Cards Section */}
     
        <TrendCards title="Trending Movies" category="movie"/>
        {/* <PersonCards title="ALL time pics Movies" category="popular"/> */}
        
        <Titlecards title={"BlockBuster Movies"} category={"top_rated"}/>
        <Titlecards title={"Newly Added Movies"} category={"upcoming"}/>
        <Titlecards title={"Only on Netflix"} category={"popular"}/>
      </div>
    </div>
  );
};

export default Movies;
