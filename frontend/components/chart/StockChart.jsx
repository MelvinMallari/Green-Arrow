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

class StockChart extends React.Component {

  calcDomain(data) {
    return [Math.min(...data), Math.max(...data)];
  }

  calcEndIndex(data, end) {
    return data.length < end ? data.length : end;
  }

  calcDiffReference() {
    const { interval, stock } = this.props;

    let data = stock.stockData.slice(0);
    if (interval === '1D') {
      let i = 0;
      while (!stock.stockIntradayData[i].close) {
        i++
      }
      return stock.stockIntradayData[i].close;
    } else if (interval === '5Y') {
      return data[0].close;
    } else {
      data = stock.stockData.slice(0);
      const start = INTERVAL_TO_AMOUNT_DATAPOINTS[interval] + 1;
      const end = 2*INTERVAL_TO_AMOUNT_DATAPOINTS[interval] + 1;

      const prevData = data.reverse().slice(start, end).reverse();
      return this.calcVolWeightedAvg(prevData); 
    }
  }

  calcVolWeightedAvg(sampleData) {
    let sumVolPrice, sumVol, volWeightedAvg;
    sumVolPrice = sumVol = volWeightedAvg = 0;

    for (let i = 0; i < sampleData.length; i++) {
      sumVolPrice += sampleData[i].close * sampleData[i].volume;
      sumVol += sampleData[i].volume;
    }

    volWeightedAvg = (sumVolPrice / sumVol).toFixed(2);
    return volWeightedAvg;
  }

  calcInitPrice(stock) {
    const stockIntradayData = stock.stockIntradayData;
    let i = stockIntradayData.length - 1;
    while (!stockIntradayData[i].close) {
      i--;
    }
    
    let currentPrice = stockIntradayData[i].close.toFixed(2);
    const initPrice = parseFloat(currentPrice);
    return initPrice;
  }

  initialStockData(stock, reference) {
    const companyName = stock.companyName;
    const initPrice = this.calcInitPrice(stock);
    const priceDifferential = parseFloat((initPrice - reference).toFixed(2));
    const pctDifferential = ((initPrice - reference) / reference).toFixed(2);


    return [companyName, this.formatMoney(initPrice), this.formatMoney(priceDifferential), pctDifferential]
  }

  filterData() {
    const { interval, stock  } = this.props;

    // returns relevant section of data given amount of data points
    let range = INTERVAL_TO_AMOUNT_DATAPOINTS[interval];

    let data;
    // handle dataSet differently for intraday data
    if (interval === '1D') {
      data = stock.stockIntradayData;
      // Handle intraday data in 5 minute increments
      return data.filter((_, i) => { if (i === 0 || i % 5 === 0 || i === 390) return true; });
    } else {
      data = stock.stockData.slice(0);
      let end = this.calcEndIndex(data, range);
      return data.reverse().slice(0, end).reverse();
    }
  }

  formatMoney(number) {
    // credits: https://stackoverflow.com/questions/40426965/javascript-function-to-format-as-money
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  render() {
    const data = this.filterData();
    const diffReference = this.calcDiffReference();
    const { stock } = this.props;

    const [companyName, initPrice, initPriceDiff, initPctDiff] = this.initialStockData(stock, diffReference);

    return(
      <div>
        <header className="stock-info">
          <h1 className="company-name">{companyName}</h1>
          <div><span id="price">{initPrice}</span></div>
          <div className="price-diff">
            <span id="price-diff" className="diff"> {initPriceDiff}</span>
            <span id="pct-diff" className="diff pct-diff">({initPctDiff})%</span>
          </div>
        </header>
        <LineChart
          width={676}
          height={196}
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0, }} >
          <CartesianGrid 
            strokeDasharray="3 3" 
            horizontal={false} 
            vertical={false} />
          <XAxis 
            dataKey="date" 
            hide={true} />
          <YAxis 
            hide={true}
            domain={this.calcDomain(data)} />
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

export default StockChart;