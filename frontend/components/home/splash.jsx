import React from 'react';
import GreetingContainer from "../greeting/GreetingContainer";

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
              <div className="front-splash">
                <div className="splash-text">
                  <div>
                    <h1>Invest for Free</h1>
                  </div>
                  <div>
                    <span>Invest in stocks, ETFs, options, and cryptocurrencies, all commission-free, right from your phone or desktop.</span>
                  </div>
                  <div>
                    <a>Demo Login</a>
                  </div>
                </div>
                <div className="splash-image"></div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;