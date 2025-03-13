import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import TVCards from '../../components/TVcards/Tvcards';
import TrendCards from '../../components/TrendCards/TrendCards';
import Titlecards from '../../components/TitleCards/Titlecards';
import ListCards from '../../components/ListCards/ListCards';

const NewPop = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  // ✅ Function to show notifications instead of alerts
  const showNotification = (message) => {
    const id = new Date().getTime(); // Unique ID for each notification
    setNotifications((prev) => [...prev, { id, message }]);

    // Remove notification after 3 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 3000);
  };

  return (
    <div className='tvshows'>
      <img src={logo} alt="Netflix Logo" className='tvshows-logo' />
      <button className='back-btn' onClick={() => navigate(-1)}>⬅ Back to Home</button>

      {/* ✅ Notifications Container */}
      <div className="notifications-container">
        {notifications.map((notif) => (
          <div key={notif.id} className="notification">
            {notif.message}
          </div>
        ))}
      </div>

      <div className='tvshows-container'>
        <h1>New and Popular</h1>

        {/* ✅ Pass showNotification function to child components */}
        <Titlecards title="Popular Movies" category="top_rated" showNotification={showNotification} />
        <Titlecards title="Newly Added Movies" category="upcoming" showNotification={showNotification} />
        <TVCards title="Newly Added TV Shows" category="popular" showNotification={showNotification} />
        <ListCards title="Your List" />
        <Titlecards title="Only on Netflix" category="popular" showNotification={showNotification} />
        <TrendCards title="Trending All" category="all" showNotification={showNotification} />
      </div>
    </div>
  );
};

export default NewPop;
