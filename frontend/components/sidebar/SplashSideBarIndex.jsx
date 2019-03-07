import React from 'react';
import SplashSideBarIndexItemContainer from './SplashSideBarIndexItemContainer';

class SplashSideBarIndex extends React.Component {
  componentDidMount() {
    const { prefetchStock, currentUser } = this.props;
    const portfolioSymbols = Object.keys(currentUser.portfolioShares);
    for (let i = 0; i < portfolioSymbols.length; i++) {
      prefetchStock(portfolioSymbols[i]);
    }
 }

  generateSymbols(stocksIndex) {
    return stocksIndex.map(stock => stock.symbol);
  }
  
  render() {
    const { stocks, currentUser } = this.props;
    const portfolioSymbols = Object.keys(currentUser.portfolioShares);
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
                <SplashSideBarIndexItemContainer symbol={symbol} />))
            }
          </ul>
        </div>
      </div> 
    )
  }
}

export default SplashSideBarIndex;