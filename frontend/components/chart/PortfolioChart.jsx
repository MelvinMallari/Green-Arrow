import React from 'react'
import {
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
} from 'recharts';
import ToolTip from '../chart/ToolTip';

const INTERVAL_TO_AMOUNT_DATAPOINTS = {
  '5Y': 1258,
  '1Y': 254,
  '3M': 64,
  '1M': 24,
  '1W': 5,
  '1D': 390
};

class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);
  }

  calcDomain(data) {
    return [Math.min(...data), Math.max(...data)];
  }

  calcEndIndex(data, end) {
    return data.length < end ? data.length : end;
  }

  findReference(data) {
    let values = Object.values(data);

    for (let i = 0; i < data.length - 1; i++) {
      let reference = values[i]
      if (reference) return reference;
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

  initialDisplayData(intradayData, reference) {
    const initPrice = this.calcInitPrice(intradayData);
    const priceDifferential = parseFloat((initPrice - reference).toFixed(2));
    const pctDifferential = ((initPrice - reference) / reference).toFixed(2);

    return [this.formatMoney(initPrice), this.formatMoney(priceDifferential), pctDifferential]
  }

  structureData(data, interval) {
    // structures data for charting. 
    let res = [];
    let dataPoint;
    const labels = Object.keys(data);
    for (let i = 0; i < labels.length - 1; i++) {
      if (interval === '1D') {
        dataPoint = { label: labels[i], close: data[labels[i]] };
      } else {
        dataPoint = { date: labels[i], close: data[labels[i]] };
      }
      res.push(dataPoint)
    }
    return res;
  }

  filterData() {
    let { interval, oneDayPortfolioData, fiveYearPortfolioData } = this.props;

    // returns relevant section of data given amount of data points
    let range = INTERVAL_TO_AMOUNT_DATAPOINTS[interval];

    // handle dataSet differently for intraday data
    if (interval === '1D') {
      oneDayPortfolioData = this.structureData(oneDayPortfolioData, interval);
      // Handle intraday data in 5 minute increments
      return oneDayPortfolioData.filter(
              (_, i) => { if (i === 0 || i % 5 === 0 || i === 390) return true; });
    } else {
      fiveYearPortfolioData = this.structureData(fiveYearPortfolioData, interval);
      let data = fiveYearPortfolioData.slice(0);
      let end = this.calcEndIndex(data, range);
      return data.reverse().slice(0, end).reverse();
    }
  }

  formatMoney(number) {
    // credits: https://stackoverflow.com/questions/40426965/javascript-function-to-format-as-money
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  render() {
    let initPrice, initPriceDiff, initPctDiff, diffReference;
    const filteredData = this.filterData();
    if (Object.keys(this.props.oneDayPortfolioData).length) {
      diffReference = this.findReference(filteredData).close;
      [initPrice, initPriceDiff, initPctDiff] = this.initialDisplayData(filteredData, diffReference);
    } else {
      [initPrice, initPriceDiff, initPctDiff, diffReference] = [0, 0, 0, 0];
    }

    return(
      <div>
        <header className="stock-info">
          <h1 className="company-name">Portfolio</h1>
          <div><span id="price">{initPrice}</span></div>
          <div className="price-diff">
            <span id="price-diff" className="diff"> {initPriceDiff}</span>
            <span id="pct-diff" className="diff pct-diff">({initPctDiff})%</span>
          </div>
        </header>
        <LineChart
          width={676}
          height={196}
          data={filteredData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0, }} >
          <CartesianGrid 
            strokeDasharray="3 3" 
            horizontal={false} 
            vertical={false} />
          <XAxis 
            dataKey="label" 
            hide={true} />
          <YAxis 
            hide={true}
            dataKey="close" 
            domain={this.calcDomain(filteredData)} />
          <Tooltip  
            content={<ToolTip 
                      interval={this.props.interval} 
                      diffReference={diffReference} />}
            isAnimationActive={false}
            offset={-37}
            position={{y: -20}} />
          <Line 
            animationDuration={850} 
            dataKey="close" 
            stroke="#21ce99" 
            dot={false} 
            strokeWidth={2}/>
       </LineChart>
      </div>
    );
  }
}

export default PortfolioChart;