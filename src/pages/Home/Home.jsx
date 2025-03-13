import React, { useEffect, useState } from 'react';
import "./Home.css";
import Navbar from '../../components/Navbar/Navbar';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import Titlecards from '../../components/TitleCards/Titlecards';
import TVCards from '../../components/TVcards/Tvcards';
import TrendCards from '../../components/TrendCards/TrendCards';
import Footer from '../../components/Footer/Footer';
import ListCards from '../../components/ListCards/ListCards'
import Modal from 'react-modal';
import ReactPlayer from 'react-player';

// Import your images for the slideshow
import hero_banner1 from '../../assets/pushpa.jpg';
import hero_banner2 from '../../assets/SOLO (2).jpg';
import hero_banner3 from '../../assets/arcane.jpeg'; 
import hero_banner4 from '../../assets/gk.jpg'; 
import hero_banner5 from '../../assets/dw1.jpg'; 
import hero_banner6 from '../../assets/kalki.jpeg'; 
import hero_banner7 from '../../assets/sime.jpg'; 
import hero_banner8 from '../../assets/ze.jpg'; 
import hero_banner9 from '../../assets/wed.jpg'; 
import hero_banner10 from '../../assets/groot.jpg'; 
import hero_banner11 from '../../assets/loki.jpg'; 
import hero_banner12 from '../../assets/ava.jpg'; 
import hero_banner13 from '../../assets/dan.png'; 
import hero_banner14 from '../../assets/st.jpg'; 
import hero_banner15 from '../../assets/hxh.jpg'; 
import hero_banner16 from '../../assets/last.jpg'; 
import hero_banner17 from '../../assets/onep.jpg'; 
import hero_banner18 from '../../assets/wanda.jpg'; 
import hero_banner19 from '../../assets/jj.jpg'; 
import hero_banner20 from '../../assets/one.jpg'; 
import hero_banner21 from '../../assets/squ.png'; 
import hero_banner22 from '../../assets/chain.jpg'; 
import hero_banner23 from '../../assets/cap.jpg'; 
import hero_banner24 from '../../assets/got.jpg'; 
import hero_banner25 from '../../assets/black.jpg'; 





// Import your title images
import title_image1 from '../../assets/pushpa_title.png';
import title_image2 from '../../assets/solot.jpg';
import title_image3 from '../../assets/arcanet.png';
import title_image4 from '../../assets/gkt.jpg';
import title_image5 from '../../assets/dwt.png';
import title_image6 from '../../assets/kalikit.jpg'; 
import title_image7 from '../../assets/simlet.png'; 
import title_image8 from '../../assets/zet.jpg'; 
import title_image9 from '../../assets/wedt.png'; 
import title_image10 from '../../assets/groott.png'; 
import title_image11 from '../../assets/lokit.png'; 
import title_image12 from '../../assets/avat.png'; 
import title_image13 from '../../assets/dant1.jpg'; 
import title_image14 from '../../assets/stt.png'; 
import title_image15 from '../../assets/hxht.png'; 
import title_image16 from '../../assets/lastt.png'; 
import title_image17 from '../../assets/onept.png'; 
import title_image18 from '../../assets/momt.png'; 
import title_image19 from '../../assets/jjt.png'; 
import title_image20 from '../../assets/onet.jpg'; 
import title_image21 from '../../assets/sqt.jpg'; 
import title_image22 from '../../assets/chaint.jpg'; 
import title_image23 from '../../assets/capt.jpg'; 
import title_image24 from '../../assets/gott.jpg'; 
import title_image25 from '../../assets/blackt.png'; 


// Import the JSON file
import bannerData from '../../assets/bannerData.json';
import Browse from '../Browse/Browse';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false); 
  const [intervalId, setIntervalId] = useState(null); // State to hold the interval ID
  
  const heroBanners = [hero_banner1, hero_banner2, hero_banner3, hero_banner4, hero_banner5, hero_banner6, hero_banner7, hero_banner8, hero_banner9,hero_banner10,hero_banner11,hero_banner12,hero_banner13,hero_banner14,hero_banner15,hero_banner16,hero_banner17,hero_banner18,hero_banner19,hero_banner20,hero_banner21,hero_banner22,hero_banner23,hero_banner24,hero_banner25];
  const titleImages = [title_image1, title_image2, title_image3, title_image4, title_image5, title_image6, title_image7, title_image8, title_image9,title_image10,title_image11,title_image12,title_image13,title_image14,title_image15,title_image16,title_image17,title_image18,title_image19,title_image20,title_image21,title_image22,title_image23,title_image24,title_image25];

  useEffect(() => {
    
    const id = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroBanners.length);
    }, 5000); // Change image every 5 seconds

    setIntervalId(id); // Store the interval ID

    return () => clearInterval(id); // Cleanup on unmount
  }, [heroBanners.length]);

  const handlePlayClick = () => {
    setModalIsOpen(true); // Open the modal when the play button is clicked
    clearInterval(intervalId); // Stop the banner slider
  };

  const closeModal = (event) => {
    event.preventDefault(); // Prevent default action
    setModalIsOpen(false); // Close the modal
    const id = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroBanners.length);
    }, 5000); // Resume the banner slider
    setIntervalId(id); // Store the new interval ID
  };

  
  const handleMoreInfoClick = () => {
    setInfoModalIsOpen(true); // Open the More Info modal
    clearInterval(intervalId); // Stop the banner slider
  };

  const closeInfoModal = () => {
    setInfoModalIsOpen(false); // Close the More Info modal
    const id = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
    }, 5000); // Resume the banner slider
    setIntervalId(id); // Store the new interval ID
  };


  return (
    <div className='home'>
      <Navbar />
      <div className="hero">
        <img src={heroBanners[currentIndex]} alt={`Banner ${currentIndex + 1}`} className='banner-img' />
 <div className="hero-caption">
          <img src={titleImages[currentIndex]} alt={`Title ${currentIndex + 1}`} className='caption-img' />
          <p>{bannerData[currentIndex].description}</p>
          <div className="hero-btns">
            <button className='btn' onClick={handlePlayClick}><img src={play_icon} alt="Play" />Play</button>
            <button className='btn dark-btn' onClick={handleMoreInfoClick}><img src={info_icon} alt="More Info" />More Info</button>
          </div>
          <Titlecards />
        </div>
      </div>
      {/* <Browse/> */}
      <div className="more-cards">
        <Titlecards title={"BlockBuster Movies"} category={"top_rated"} />
        <TrendCards title="Trending WebSeries" category="tv" />
        <Titlecards title={"Only on Netflix"} category={"popular"} />
        <TVCards title="Top Rated Shows" category="top_rated" />
        <TrendCards title={"Trending Movies "} category="movie" />
        <ListCards title={"Your List"} />
        <Titlecards title={"Upcoming Movies"} category={"upcoming"} />
        <TVCards title="Trending TV Shows" category="popular" />
        <Titlecards title={"Top Pics for You Movies"} category={"now_playing"} />
        <TrendCards title="Trending ALL" category="all" />
       
      </div>
      <Footer />
      
      {/* Modal for playing the trailer */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Trailer Modal" style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
        content: {
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          padding: '20px',
        }
      }}>
        <button className='close-btn' type="button" onClick={closeModal}>Close</button>
        <ReactPlayer 
          url={bannerData[currentIndex].videoUrl} // Play the video corresponding to the current index
          playing={modalIsOpen}
          controls={true}
          width="100%"
          height="95%"
        />
      </Modal>
       {/* Modal for More Info */}
       <Modal isOpen={infoModalIsOpen} onRequestClose={closeInfoModal} contentLabel="More Info Modal" 
       style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
        content: {
          maxWidth: '1000px',  // Keep the modal width under control
          margin: 'auto', // Center the modal in the viewport
          marginTop: '6%',
          height: 'auto',  // Ensures modal adjusts height based on content
          maxHeight: '550px', // Ensures the modal doesn’t take the entire viewport height
          padding: '20px 30px',
          paddingBottom:'0px',
          borderRadius: '10px',
          backgroundColor: 'black',
          color: 'white',
          textAlign: 'justify',
          overflowY: 'auto', // Allow scrolling if content overflows
        }
      }}>
        <button className='close-btn' type="button" onClick={closeInfoModal}>Close</button>
        <h2 className='info-modal-title'>{bannerData[currentIndex].title[0]}</h2><br />
        <h2>{bannerData[currentIndex].title[1]}</h2>
        <h2>{bannerData[currentIndex].title[2]}</h2>
        <h2>{bannerData[currentIndex].title[3]}</h2>
        <h2>{bannerData[currentIndex].title[4]}</h2><br />
        <h2 className='storyline-head'>{bannerData[currentIndex].title[5]}</h2>
        <p className='storyline-info'>{bannerData[currentIndex].moreInfo}</p>
      </Modal>
    </div>
  );
}

export default Home;