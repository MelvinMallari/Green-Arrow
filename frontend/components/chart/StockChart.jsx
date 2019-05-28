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
    const stockIntradayData = stock.stockIntradayData.intraday;
    const stockIntradayDataKeys = Object.keys(stock.stockIntradayData.intraday);

    // API down edge case
    if (!stockIntradayDataKeys.length) return 0;

    for (let i = stockIntradayDataKeys.length - 1; i > 0; i--) {
      const date = stockIntradayDataKeys[i];
      if (stockIntradayData[date].close) {
        const initPrice = stockIntradayData[date].close;
        return parseFloat(initPrice);
      }
    return 0;
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
    if (interval === '1D') {
      return this.parseData(stock.stockIntradayData.intraday).reverse();
    }
    // returns relevant section of data given interval
    const range = INTERVAL_TO_AMOUNT_DATAPOINTS[interval];
    const data = this.parseData(stock.stockData.history);
    const end = this.calcEndIndex(data, range);
    return data.slice(0, end).reverse();
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
    const { stock, interval } = this.props;
    const [companyName, initPrice, initPriceDiff, initPctDiff] = this.initialStockData(stock, diffReference);

    debugger;
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
            content={<ToolTip interval={interval} diffReference={diffReference} />}
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
