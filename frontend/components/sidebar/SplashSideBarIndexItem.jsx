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

  render() {
    const { stock } = this.props;
    if (stock === undefined || stock.stockIntradayData === undefined) return null;
    const data = stock.stockIntradayData;
    const close = this.findLatestValidClose(data);
    return(
      <div>
        <span>{this.props.symbol}</span>
        <TinyChart data={data}/>
        <span>{close}</span>
      </div>
    );
  }
}

export default SplashSideBarIndexItem;