
import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class StockChart extends React.Component {
  constructor(props) {
    super(props);
  }

  calcEndIndex(data, end) {
    return data.length < end ? data.length : end;
  }

  filterData(dayRange) {
    // returns relevant section of data given amount of data points
    let data = this.props.stock.stockData.slice(0);
    let end = this.calcEndIndex(data, dayRange);
    return data.reverse().slice(0, end).reverse();
  }

  parseData() {
    // returns 
    const { interval } = this.props;
    const renderMap = {
      '5Y': 1258,
      '1Y': 254,
      '3M': 64,
      '1M': 24,
      '1W': 5
    };

    let range = renderMap[interval];
    return this.filterData(range);
  }

  renderOneDay() {

  }

  render() {
    let data = this.parseData();

    return(
      <div>
        <LineChart
         width={722}
         height={315}
         data={data}
         margin={{
           top: 5, right: 30, left: 20, bottom: 5,
         }} >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
          <XAxis dataKey="date" hide={true} />
          <YAxis hide={true} />
          <Tooltip  isAnimationActive={false} />
          <Line  dataKey="close" stroke="#21ce99" dot={false} strokeWidth={2}/>
       </LineChart>
      </div>
    );
  }
}


export default StockChart;


  // renderFiveYear() {
  //   const fiveYearRange = 1258;
  //   this.determineRender(fiveYearRange);
  // }

  // renderOneYear() {
  //   const oneYearRange = 254;
  //   this.determineRender(oneYearRange);
  // }

  // renderThreeMonths() {
  //   const threeMonthRange = 64;
  //   this.determineRender(threeMonthRange);
  // }

  // renderOneMonth() {
  //   const oneMonthRange = 24;
  //   this.determineRender(oneMonthRange);
  // }

  // renderOneWeek() {
  //   const oneWeekRange = 5;
  //   this.determineRender(oneWeekRange);
  // }