import React from 'react';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import TinyChart from '../chart/TinyChart';
import { formatMoney } from '../../util/util.js';

class SplashSideBarIndexItem extends React.Component {
  findLatestValidClose(data) {
    // Accounts for fact that intraday close sometimes null
    const sampleData = data.slice().reverse();
    for (let i = 0; i < sampleData.length; i++) {
      if (sampleData[i].close) return sampleData[i].close;
    }
    return 0;
  }

  filterData(data) {
    const returnData = this.parseData(data);
    return returnData
      .filter((stock, i) => {
        if ((i + 1) % 5 === 0 && stock.close) return true;
      })
      .reverse();
  }

  parseData(dataJSON) {
    const data = [];
    const dataKeys = Object.keys(dataJSON);
    for (let i = 0; i < dataKeys.length; i++) {
      let key = dataKeys[i];
      const tempObj = dataJSON[key];

      // Handle intraday case
      const parsedKey = key.split(' ');
      key = parsedKey.length > 1 ? parsedKey[1] : parsedKey[0];

      tempObj.date = key;
      data.push(tempObj);
    }
    return data;
  }

  render() {
    const { stock, numShares } = this.props;
    if (stock === undefined || stock.stockIntradayData === undefined) {
      return (
        <li className="splash-index-item-wrapper">
          <div className="splash-index-loader-container">
            <ReactLoading type="bubbles" color="#21ce99" height={85} width={85} />
          </div>
        </li>
      );
    }
    const data = this.filterData(stock.stockIntradayData.intraday);
    const close = this.findLatestValidClose(data);
    return (
      <li className="splash-index-item-wrapper">
        <Link to={`/stocks/${this.props.symbol}`}>
          <div className="splash-index-item-container">
            <div className="splash-index-item-label">
              <span className="sidebar-symbol">{this.props.symbol}</span>
              <span className="num-shares">{numShares > 0 ? `${numShares} shares` : ``}</span>
            </div>
            <TinyChart data={data} className="tiny-chart" />
            <span className="sidebar-closing-price">{formatMoney(close)}</span>
          </div>
        </Link>
      </li>
    );
  }
}

export default SplashSideBarIndexItem;
