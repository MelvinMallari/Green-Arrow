import React from 'react';
import SplashSideBarIndexItemContainer from './SplashSideBarIndexItemContainer';

class SplashSideBarIndex extends React.Component {

  render() {
    const { stocks, currentUser} = this.props;
    let shares = currentUser.portfolioShares;
    let portfolioSymbols = Object.keys(shares);

    // Only grab portfolio symbols that that are owned. 
    portfolioSymbols = portfolioSymbols.filter(symbol => shares[symbol] > 0);
    
    // Grab watched Stocks
    let watchedSymbols = currentUser.watchedStocks.map(stock => stock.ticker_symbol);

    if ( Object.keys(stocks).length < portfolioSymbols.length) return null;
    return(
      <div className="splash-sidebar-container">
        <div className="splash-sidebar-wrapper">
          <header className="splash-sidebar-index-header">
            Portfolio
          </header>
          <ul>
            {
              portfolioSymbols.map(symbol => (
                <SplashSideBarIndexItemContainer 
                  numShares={shares[symbol]}
                  symbol={symbol}
                  key={symbol} />))
            }
          </ul>
          <header className="splash-sidebar-index-header">
            Watchlist
          </header>
          <ul>
            {
              watchedSymbols.map(symbol => (
                <SplashSideBarIndexItemContainer 
                  numShares={0}
                  symbol={symbol}
                  key={symbol} />))
            }
          </ul>
        </div>
      </div> 
    )
  }
}

export default SplashSideBarIndex;