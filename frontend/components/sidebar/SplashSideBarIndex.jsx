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
    debugger;
    if (!stocksIndex) return null;
    const symbols = this.generateSymbols(stocksIndex);
    return (
      <ul>
        {
          symbols.map(symbol => <SplashSideBarIndexItemContainer symbol={symbol} />)
        }
      </ul>
    );
  }
}

export default SplashSideBarIndex;