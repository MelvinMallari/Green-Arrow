import React from 'react';

class StockAbout extends React.Component {

  formatMoney(number) {
    // credits: https://stackoverflow.com/questions/40426965/javascript-function-to-format-as-money
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  render() {
    const { stock } = this.props;
    return(
      <section className="stock-about-container">
        <header >
          <div>
            <h2>About</h2>
          </div>
        </header>
        <div className="about-description-container">
          <h3 className="about-description-header">{stock.description}</h3>
        </div>
        <div className="about-info">
          <div>
            <div className="about-info-label">CEO</div>
            <div>{stock.ceo}</div>
          </div>
          <div>
            <div className="about-info-label">Industry</div>
            <div>{stock.industry}</div>
          </div>
          <div>
            <div className="about-info-label">Exchange</div>
            <div>{stock.exchange}</div>
          </div>
          <div>
            <div className="about-info-label">Website</div>
            <div><a href={stock.website} className='website-link'>{stock.website}</a></div>
          </div>
          <div>
            <div className="about-info-label">Market Cap</div>
            <div>{this.formatMoney(stock.marketcap)}</div>
          </div>
          <div>
            <div className="about-info-label">Price-Earnings Ratio</div>
            <div>{stock.peRatio}</div>
          </div>
          <div>
            <div className="about-info-label">Dividend Yield</div>
            <div>{stock.dividendYield.toFixed(2)}</div>
          </div>
          <div>
            <div className="about-info-label">Short Ratio</div>
            <div>{stock.shortRatio === null ? `-` : stock.shortRatio}</div>
          </div>
        </div>

      </section>
    );
  }
}

export default StockAbout;