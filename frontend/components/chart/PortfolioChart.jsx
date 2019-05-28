import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
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

class PortfolioChart extends React.Component {
  componentDidMount() {
    const { portfolioShares, fetchStockData } = this.props;
    const promises = [];
    const ctx = this;
    this.temp = [];
    this.fiveYearPortfolioData = [];
    this.portfolioSymbols = Object.keys(portfolioShares).filter(share => portfolioShares[share] > 0);
    this.portfolioSymbols.forEach(share => fetchStockData(share));
  }

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

  calcInitPrice(intradayData) {
    let i = intradayData.length - 1;
    while (!intradayData[i].close) {
      i--;
    }
    return parseFloat(intradayData[i].close.toFixed(2));
  }

  initialDisplayData(rawData) {
    const filteredData = this.filterData(rawData);
    const diffReference = this.findReference(filteredData);
    const { currentUser } = this.props;
    let initPrice;
    let priceDifferential;
    let pctDifferential;

    if (filteredData.length) {
      initPrice = this.calcInitPrice(filteredData);
      priceDifferential = parseFloat((initPrice - diffReference).toFixed(2));
      pctDifferential = (((initPrice - diffReference) / diffReference) * 100).toFixed(2);
    } else {
      initPrice = currentUser.currentBuyingPower;
      priceDifferential = pctDifferential = 0;
    }

    return [formatMoney(initPrice), formatMoney(priceDifferential), pctDifferential, filteredData, diffReference];
  }

  structureData(data, interval) {
    // structures data for charting.
    const res = [];
    let dataPoint;
    const labels = Object.keys(data);
    for (let i = 0; i < labels.length - 1; i++) {
      if (interval === '1D') {
        dataPoint = { label: labels[i], close: data[labels[i]] };
      } else {
        dataPoint = { date: labels[i], close: data[labels[i]] };
      }
      res.push(dataPoint);
    }
    return res;
  }

  filterData(rawData) {
    const { interval } = this.props;

    // returns relevant section of data given amount of data points
    const range = INTERVAL_TO_AMOUNT_DATAPOINTS[interval];

    // handle dataSet differently for intraday data
    if (interval === '1D') {
      const oneDayPortfolioData = this.structureData(rawData, interval);
      // Handle intraday data in 5 minute increments
      return oneDayPortfolioData
        .filter((stock, i) => {
          if ((i + 1) % 5 === 0 && stock.close) return true;
        })
        .reverse();
    }
    const data = this.structureData(rawData, interval);
    const end = this.calcEndIndex(data, range);
    return data.slice(0, end).reverse();
  }

  // filterData() {
  //   let { interval, oneDayPortfolioData, fiveYearPortfolioData } = this.props;

  //   // returns relevant section of data given amount of data points
  //   const range = INTERVAL_TO_AMOUNT_DATAPOINTS[interval];

  //   // handle dataSet differently for intraday data
  //   if (interval === '1D') {
  //     oneDayPortfolioData = this.structureData(oneDayPortfolioData, interval);
  //     // Handle intraday data in 5 minute increments
  //     return oneDayPortfolioData.filter((stock, i) => {
  //       if (i % 5 === 0 && stock.close) return true;
  //     });
  //   }
  //   fiveYearPortfolioData = this.structureData(fiveYearPortfolioData, interval);
  //   const data = fiveYearPortfolioData.slice(0);
  //   const end = this.calcEndIndex(data, range);
  //   return data
  //     .reverse()
  //     .slice(0, end)
  //     .reverse();
  // }

  renderCheck() {
    const { stocks } = this.props;
    if (!this.portfolioSymbols || !this.portfolioSymbols.length) return false;
    for (let i = 0; i < this.portfolioSymbols.length; i++) {
      const symbol = this.portfolioSymbols[i];
      if (!stocks[symbol].stockData) return false;
    }
    return true;
  }

  renderThemeChanges(initPctDiff) {
    // Add class to body, css renders differently given body class
    const docBodyClass = document.body.classList;
    initPctDiff < 0 ? docBodyClass.add('red-theme') : docBodyClass.remove('red-theme');
  }

  buildPortfolioData() {
    const { stocks, portfolioShares, interval } = this.props;
    const counterHash = {};

    this.portfolioSymbols.forEach((symbol) => {
      const sharesOwned = portfolioShares[symbol];
      let stockData;
      if (interval === '1D') {
        stockData = stocks[symbol].stockIntradayData.intraday;
      } else {
        stockData = stocks[symbol].stockData.history;
      }
      Object.keys(stockData).forEach((date) => {
        const value = parseFloat(stockData[date].close) * sharesOwned;
        date in counterHash ? (counterHash[date] += value) : (counterHash[date] = value);
      });
    });
    return counterHash;
  }

  render() {
    if (!this.renderCheck()) {
      return (
        <div className="splash-portfolio-loader-container">
          <ReactLoading type="bubbles" color="#21ce99" height={125} width={125} />
        </div>
      );
    }

    const rawData = this.buildPortfolioData();
    const [initPrice, initPriceDiff, initPctDiff, filteredData, diffReference] = this.initialDisplayData(rawData);
    this.renderThemeChanges(initPctDiff);
    const theme = initPctDiff < 0 ? '#f45531' : '#21ce99';

    return (
      <div>
        <header className="stock-info">
          <h1 className="company-name">Portfolio</h1>
          <div>
            {' '}
            <span id="price">{initPrice}</span>{' '}
          </div>
          <div className="price-diff">
            <span id="price-diff" className="diff">
              {' '}
              {initPriceDiff}
            </span>
            <span id="pct-diff" className="diff pct-diff">
              ({initPctDiff === 0 ? '0.00' : initPctDiff})%
            </span>
          </div>
        </header>
        <LineChart width={676} height={196} data={filteredData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
          <XAxis dataKey="label" hide />
          <YAxis hide dataKey="close" domain={this.calcDomain(filteredData)} />
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

const mapStateToProps = ({ entities: { stocks } }) => ({
  stocks,
});

export default connect(mapStateToProps)(PortfolioChart);
