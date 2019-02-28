import React from 'react';
import GreetingContainer from "../greeting/GreetingContainer";
import { Link } from 'react-router-dom';

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

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
                      <span>Invest in stocks, ETFs, options, and cryptocurrencies, all commission-free, right from your phone or desktop.</span>
                    </div>
                    <Link to="/demo"> <span className="r-button"> Demo Login </span> </Link>
                  </div>
                  <div className="splash-image">
                    <img src="https://d2ue93q3u507c2.cloudfront.net/assets-about/a4a80e964c803ddb7a9fc7459e0eac01.png" alt=""/>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;