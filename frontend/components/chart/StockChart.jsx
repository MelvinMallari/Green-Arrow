
import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import ToolTip from '../chart/ToolTip';

class StockChart extends React.Component {
  constructor(props) {
    super(props);
  }

  calcEndIndex(data, end) {
    return data.length < end ? data.length : end;
  }

  calcDomain(data) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    return [min, max];
  }

  filterData(dayRange) {
    // returns relevant section of data given amount of data points
    const { stock, interval  } = this.props

    let data;
    // handle dataSet differently for intraday data
    if (interval === '1D') {
      data = stock.stockIntradayData;
      // Handle intraday data in 5 minute increments
      return data.filter((_, i) => { if (i === 0 || i % 5 === 0) return true; });
    } else {
      data = stock.stockData.slice(0);
      let end = this.calcEndIndex(data, dayRange);
      return data.reverse().slice(0, end).reverse();
    }
  }

  parseData() {
    const { interval } = this.props;
    const intervalToDataPointsMap = {
      '5Y': 1258,
      '1Y': 254,
      '3M': 64,
      '1M': 24,
      '1W': 5,
      '1D': 390
    };

    let range = intervalToDataPointsMap[interval];
    return this.filterData(range);
  }

  render() {
    let data = this.parseData();

    return(
      <div>
        <LineChart
         width={676}
         height={196}
         data={data}
         margin={{
           top: 0, right: 0, left: 0, bottom: 0,
         }} >
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
            content={<ToolTip interval={this.props.interval} />}
            isAnimationActive={false}
            offset={-35}
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