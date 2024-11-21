import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeScreen.css';
import leaf1 from '../images/1.png';
import leaf2 from '../images/2.png';
import leaf3 from '../images/3.png';
import leaf4 from '../images/4.png';
import res from '../images/res.jpg';
import res2 from '../images/res2.jpg';
import res3 from '../images/res3.jpg';

function HomeScreen() {
  const navigate = useNavigate();

  const goToMenuPage = (restaurantId) => {
    navigate(`/menu/${restaurantId}`);
  };

  return (
    <div className="home-screen">
      <div className="home-screen-left">
        <h1>PESUCafe</h1>
        <div className="image-links">
          <div className="image-container" onClick={() => goToMenuPage(1)}>
            <img src={res} alt="Restaurant Link 1" className="link-image" />
            <div className="restaurant-name">Cantina</div>
          </div>
          <div className="image-container" onClick={() => goToMenuPage(2)}>
            <img src={res2} alt="Restaurant Link 2" className="link-image" />
            <div className="restaurant-name">Food Court</div>
          </div>
          <div className="image-container" onClick={() => goToMenuPage(3)}>
            <img src={res3} alt="Restaurant Link 3" className="link-image" />
            <div className="restaurant-name">HornBill</div>
          </div>
        </div>
        <h2>Pesucafe - A Taste of Excellence</h2>
        <p className="description">
          Enjoy a wide variety of dishes curated specially for you.
        </p>
        <button className="learn-more-button" onClick={() => navigate('/about')}>Learn More</button>  {/* Fixed path */}
      </div>
      <img src={leaf1} alt="Leaf 1" className="leaf leaf1" />
      <img src={leaf2} alt="Leaf 2" className="leaf leaf2" />
      <img src={leaf3} alt="Leaf 3" className="leaf leaf3" />
      <div className="home-screen-right">
        <img src={leaf4} alt="Leaf 4" className="leaf leaf4" />
      </div>
    </div>
  );
}

export default HomeScreen;
