import React from 'react'
import TinyChart from '../chart/TinyChart';

class SplashSideBarIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { symbol, fetchStockIndexItemTest} = this.props;
    fetchStockIndexItemTest(symbol);
  }

  findLatestValidClose(data) {
    // Accounts for fact that intraday close sometimes null
    let sampleData = data.slice().reverse();
    let i = 0;
    while (!sampleData[i].close) {
      i++;
    }
    return sampleData[i].close;
  }

  formatMoney(number) {
    // credits: https://stackoverflow.com/questions/40426965/javascript-function-to-format-as-money
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  render() {
    const { stock } = this.props;
    if (stock === undefined || stock.stockIntradayData === undefined) return null;
    const data = stock.stockIntradayData;
    const close = this.findLatestValidClose(data);
    return(
      <div>
        <span>{this.props.symbol}</span>
        <TinyChart data={data}/>
        <span>{this.formatMoney(close)}</span>
      </div>
    );
  }
}

export default SplashSideBarIndexItem;