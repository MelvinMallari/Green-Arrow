import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { formatMoney } from '../../util/util.js';
import ToolTip from './ToolTip';

const INTERVAL_TO_AMOUNT_DATAPOINTS = {
  '5Y': 1258,
  '1Y': 254,
  '3M': 64,
  '1M': 24,
  '1W': 5,
  '1D': 390,
};

class StockChart extends React.Component {
  calcDomain(data) {
    return [Math.min(...data), Math.max(...data)];
  }

  calcEndIndex(data, end) {
    return data.length < end ? data.length : end;
  }

  findReference(data) {
    const values = Object.values(data);
    for (let i = 0; i < data.length - 1; i++) {
      const reference = values[i];
      if (reference) return reference.close;
    }
    return 0;
  }

  calcInitPrice(stock) {
    const { stockIntradayData } = stock;
    let currentPrice;

    if (!stockIntradayData.length) {
      // Edge case for when API's down and no data pulled
      currentPrice = 0;
    } else {
      let i = stockIntradayData.length - 1;
      while (!stockIntradayData[i].close) {
        i--;
      }
      currentPrice = stockIntradayData[i].close.toFixed(2);
    }
    const initPrice = parseFloat(currentPrice);
    return initPrice;
  }

  initialStockData(stock, reference) {
    const { companyName } = stock;
    const initPrice = this.calcInitPrice(stock);
    const priceDifferential = parseFloat((initPrice - reference).toFixed(2));
    const pctDifferential = (((initPrice - reference) / reference) * 100).toFixed(2);
    return [companyName, formatMoney(initPrice), formatMoney(priceDifferential), pctDifferential];
  }

  filterData() {
    const { interval, stock } = this.props;

    // returns relevant section of data given interval
    const range = INTERVAL_TO_AMOUNT_DATAPOINTS[interval];

    let data;
    if (interval === '1D') {
      data = this.parseData(stock.stockIntradayData.intraday);
      // Handle intraday data in 5 minute increments
      return data.filter((stock, i) => {
        if (i % 5 === 0 && stock.close) return true;
      });
    }

    data = this.parseData(stock.stockData.history);
    const end = this.calcEndIndex(data, range);
    return data
      .reverse()
      .slice(0, end)
      .reverse();
  }

  parseData(dataJSON) {
    const data = [];
    const dataKeys = Object.keys(dataJSON);
    for (let i = 0; i < dataKeys.length; i++) {
      const key = dataKeys[i];
      const tempObj = dataJSON[key];
      tempObj.date = key;
      data.push(tempObj);
    }
    return data;
  }

  renderThemeChanges(initPctDiff) {
    if (initPctDiff < 0) {
      document.body.classList.add('red-theme');
    } else {
      document.body.classList.remove('red-theme');
    }
  }

  render() {
    const data = this.filterData();
    const diffReference = this.findReference(data);
    const { stock } = this.props;
    const [companyName, initPrice, initPriceDiff, initPctDiff] = this.initialStockData(stock, diffReference);

    const theme = initPctDiff < 0 ? '#f45531' : '#21ce99';

    this.renderThemeChanges(initPctDiff);
    return (
      <div>
        <header className="stock-info">
          <h1 className="company-name">{companyName}</h1>
          <div>
            <span id="price">{initPrice}</span>
          </div>
          <div className="price-diff">
            <span id="price-diff" className="diff">
              {' '}
              {initPriceDiff}
            </span>
            <span id="pct-diff" className="diff pct-diff">
              ({initPctDiff})%
            </span>
          </div>
        </header>
        <LineChart width={676} height={196} data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
          <XAxis dataKey="date" hide />
          <YAxis hide dataKey="close" domain={this.calcDomain(data)} />
          <Tooltip
            content={<ToolTip interval={this.props.interval} diffReference={diffReference} />}
            isAnimationActive={false}
            offset={-37}
            position={{ y: -20 }}
          />
          <Line animationDuration={850} dataKey="close" stroke={theme} dot={false} strokeWidth={2} />
        </LineChart>
      </div>
    );
  }
}

export default StockChart;
