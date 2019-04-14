import React from 'react';
import GreetingContainer from "../greeting/GreetingContainer";
import { Link } from 'react-router-dom';

class SplashLoggedOut extends React.Component {
  render() {
    return(
      <div>
        <GreetingContainer />
        <div className="splash-container">
          <div className="splash-section-container">
            <section className="first-section">
              <div className="front-splash-container">
                <div className="front-splash">
                  <div className="splash-text">
                    <div className="splash-text-header-container">
                      <h1>Invest for Free</h1>
                    </div>
                    <div className="splash-text-phrase-container">
                      <span>
                        Green Arrow allows you to make money moves, for free. 
                        </span>
                    </div>
                    <Link to="/demo"> <span className="r-button">Demo</span> </Link>
                  </div>
                  <div className="splash-image-bg">
                    <div className="splash-image">
                      <img src="https://d2ue93q3u507c2.cloudfront.net/assets-about/a4a80e964c803ddb7a9fc7459e0eac01.png" alt=""/>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <footer className="splash-footer">
          <div className="personal-links-container">
            <div className="personal-links">
              <a href="https://github.com/MelvinMallari/Green-Arrow">
                <i class="fab fa-github-square fa-3x fa-icon"></i>
              </a>
              <a href="https://www.linkedin.com/in/melvinmallari/">
                <i class="fab fa-linkedin fa-3x fa-icon"></i>
              </a>
              <a href="https://melvinmallari.com/">
                <i class="fas fa-address-card fa-3x fa-icon"></i>
              </a>  
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default SplashLoggedOut;