import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/ppf1.jpg';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';

const Navbar = () => {
  const navRef = useRef(null); // ✅ Ensure navRef starts as null
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) { // ✅ Check if navRef.current exists
        if (window.scrollY > 80) {
          navRef.current.classList.add('nav-dark');
        } else {
          navRef.current.classList.remove('nav-dark');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll); // ✅ Cleanup event listener
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?q=${searchQuery}`); // ✅ Navigate to search results page
    }
  };

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="Netflix Logo" />
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tvshows" className='head-tv'>Tv Shows</Link></li>
          <li><Link to="/movies" className='head-tv'>Movies</Link></li>
          <li><Link to="/newpop" className='head-tv'>New & Popular</Link></li>
          <li> <Link to="/mylist" className="head-tv">My List</Link></li>
          <li> <Link to="/browse" className="head-tv">Browse By Language</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <img src={search_icon} alt="Search Icon" className='icons' />
          </button>
        </form>
        <p>Shankar</p>
        <img src={bell_icon} alt="Bell Icon" className='icons' />
        <div className="navbar-profile">
          <img src={profile_img} alt="Profile" className='profile' />
          <img src={caret_icon} alt="Caret Icon" />
          <div className='dropdown'>
            <p onClick={() => logout()}>Sign Out Of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
