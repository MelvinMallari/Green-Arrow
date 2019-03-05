import React from 'react';
import SplashSideBarIndexItemContainer from './SplashSideBarIndexItemContainer';

class SplashSideBarIndex extends React.Component {
  componentDidMount() {
    this.props.fetchStocks();
  }

  generateSymbols(stocksIndex) {
    return stocksIndex.map(stock => stock.symbol);
  }
  
  render() {
    let symbols = Object.keys(this.props.stocks);
    if (symbols.length !== 6) return null;
    return (
      <div className="splash-sidebar-container">
        <div className="splash-sidebar-wrapper">
          <header className="splash-sidebar-index-header">
            Stocks
          </header>
          <ul>
            {
              symbols.map(symbol => <SplashSideBarIndexItemContainer symbol={symbol} />)
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default SplashSideBarIndex;