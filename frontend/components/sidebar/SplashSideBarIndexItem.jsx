import React from 'react'
import TinyChart from '../chart/TinyChart';
import { Link } from 'react-router-dom';
import { formatMoney } from '../../util/util.js';
import ReactLoading from 'react-loading';

class SplashSideBarIndexItem extends React.Component {
  findLatestValidClose(data) {
    // Accounts for fact that intraday close sometimes null
    let sampleData = data.slice().reverse();
    let i = 0;
    while (!sampleData[i].close) { i++; }
    return sampleData[i].close;
  }

  filterData(data) {
    return data.filter( (stock, i) => { 
      if ((i === 0 || i % 5 === 0 || i === 390) && stock.close) {
        return true; 
    }});
  }

  render() {
    const { stock, numShares } = this.props;
    if (stock === undefined || stock.stockIntradayData === undefined) {
      return (
        <li className="splash-index-item-wrapper">
          <div className="splash-index-loader-container">
            <ReactLoading 
              type={"bubbles"} 
              color={"#21ce99"} 
              height={85} 
              width={85} />
          </div>
        </li>
      );
    }
    const data = this.filterData(stock.stockIntradayData);
    const close = this.findLatestValidClose(data);
    return(
      <li className="splash-index-item-wrapper">
        <Link to={`/stocks/${this.props.symbol}`} >
          <div className="splash-index-item-container">
            <div className="splash-index-item-label">
              <span className="sidebar-symbol">
                {this.props.symbol}
              </span>
              <span className="num-shares">
                {numShares > 0 ? `${numShares} shares` : ``}
              </span>
            </div>
            <TinyChart 
              data={data} 
              className="tiny-chart" />
            <span className="sidebar-closing-price">
              {formatMoney(close)}
            </span>
          </div>
        </Link>
      </li>
    );
  }
}

export default SplashSideBarIndexItem;