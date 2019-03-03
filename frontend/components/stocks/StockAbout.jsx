import React from 'react';

class StockAbout extends React.Component {
  render() {
    const { stock } = this.props;
    return(
      <section className="stock-about-container">
        <header >
          <div>
            <h2>About</h2>
          </div>
        </header>
        <div className="about-description">
          <h3>{stock.description}</h3>
        </div>
        <div className="about-info">
          <div>
            <div>CEO</div>
            <div>{stock.ceo}</div>
          </div>
          <div>
            <div>Industry</div>
            <div>{stock.industry}</div>
          </div>
          <div>
            <div>Exchange</div>
            <div>{stock.exchange}</div>
          </div>
          <div>
            <div>Website</div>
            <div><a href={stock.website}>{stock.website}</a></div>
          </div>
          <div>
            <div>Market Cap</div>
            <div>{stock.marketcap}</div>
          </div>
          <div>
            <div>Price-Earnings Ratio</div>
            <div>{stock.peRatio}</div>
          </div>
          <div>
            <div>Dividend Yield</div>
            <div>{stock.dividendYield}</div>
          </div>
          <div>
            <div>Short Ratio</div>
            <div>{stock.shortRatio === null ? `-` : stock.shortRatio}</div>
          </div>

        </div>

      </section>
    );
  }
}

export default StockAbout;
