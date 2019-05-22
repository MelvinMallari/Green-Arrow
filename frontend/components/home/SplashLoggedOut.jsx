import React from 'react';
import { Link } from 'react-router-dom';
import GreetingContainer from '../greeting/GreetingContainer';
import LinksFooter from '../LinksFooter';

class SplashLoggedOut extends React.Component {
  render() {
    return (
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
                      <span> Green Arrow allows you to make money moves, for free. </span>
                    </div>
                    <Link to="/demo">
                      {' '}
                      <span className="r-button">Demo</span>{' '}
                    </Link>
                  </div>
                  <div className="splash-image-bg">
                    <div className="splash-image">
                      <img
                        src="https://d2ue93q3u507c2.cloudfront.net/assets-about/a4a80e964c803ddb7a9fc7459e0eac01.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <LinksFooter />
      </div>
    );
  }
}

export default SplashLoggedOut;
