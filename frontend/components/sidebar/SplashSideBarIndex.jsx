import React from 'react';
import SplashSideBarIndexItemContainer from './SplashSideBarIndexItemContainer';

class SplashSideBarIndex extends React.Component {
  renderPortfolio() {
    const shares = this.props.currentUser.portfolioShares;
    let portfolioSymbols = Object.keys(shares);
    portfolioSymbols = portfolioSymbols.filter(symbol => shares[symbol] > 0);
    return (
      <ul>
        {portfolioSymbols.map(symbol => (
          <SplashSideBarIndexItemContainer numShares={shares[symbol]} symbol={symbol} key={symbol} />
        ))}
      </ul>
    );
  }

  renderWatchlist() {
    const watchedSymbols = this.props.currentUser.watchedStocks;
    return (
      <ul>
        {watchedSymbols.map(symbol => (
          <SplashSideBarIndexItemContainer numShares={0} symbol={symbol} key={symbol} />
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="splash-sidebar-container">
        <div className="splash-sidebar-wrapper">
          <header className="splash-sidebar-index-header"> Portfolio </header>
          <div className="portfolio-container">{this.renderPortfolio()}</div>
          <header className="splash-sidebar-index-header"> Watchlist </header>
          <div className="watchlist-container">{this.renderWatchlist()}</div>
        </div>
      </div>
    );
  }
}

export default SplashSideBarIndex;
