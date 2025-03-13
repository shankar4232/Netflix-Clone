import { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import TvShows from './pages/TvShows/TvShows';
import Movies from './pages/Movies/Movies';
import NetflixIntro from './assets/Netflix_in.mp4'; // ✅ Import the video
import SearchResults from './pages/SearchResults'
import NewPop from './pages/NewPop/NewPop';
import MyList from './pages/MyList/MyList';
import Browse from './pages/Browse/Browse';


function App() {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('Logged In');
        navigate('/');
      } else {
        console.log('Logged Out');
        navigate('/login');
      }
    });

    // ✅ Show intro video for 5 seconds before showing Home
    setTimeout(() => {
      setShowIntro(false);
    }, 5000);
  }, []);

  return (
    <div>
      <ToastContainer theme='dark' />
      {showIntro ? (
        <video autoPlay unmuted className='fullscreen-video'>
          <source src={NetflixIntro} type='video/mp4' />
        </video>
      ) : (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/player/:id' element={<Player />} />
          <Route path='/tvshows' element={<TvShows />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/newpop' element={<NewPop />} />
          <Route path="/mylist" element={<MyList/>}/>
          <Route path='/browse' element={<Browse/>} />

          <Route path='/search' element={<SearchResults />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
