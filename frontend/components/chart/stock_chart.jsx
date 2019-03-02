
import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class StockChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.stock.stockData,
      interval: this.props.interval,
    }
    this.renderFiveYear = this.renderFiveYear.bind(this);
    this.renderOneYear = this.renderOneYear.bind(this);
    this.renderThreeMonths = this.renderThreeMonths.bind(this);
    this.renderOneMonth = this.renderOneMonth.bind(this);
    this.renderOneWeek = this.renderOneWeek.bind(this);
  }

  calcEndIndex(data, end) {
    return data.length < end ? data.length : end;
  }

  componentDidMount() {
    const { interval } = this.state;
    const renderMap = {
      '5Y': this.renderFiveYear,
      '1Y': this.renderOneYear,
      '3M': this.renderThreeMonths,
      '1M': this.renderOneMonth,
      '1W': this.renderOneWeek
    };

    // invoke function based on passed in interval
    renderMap[interval]();
    
  }

  determineRender(dayRange) {
    let data = this.state.data.slice(0);
    let end = this.calcEndIndex(data, dayRange);
    data = data.reverse().slice(0, end).reverse();
    this.setState({data: data});
  }

  renderFiveYear() {
    const fiveYearRange = 1258;
    this.determineRender(fiveYearRange);
  }

  renderOneYear() {
    const oneYearRange = 254;
    this.determineRender(oneYearRange);
  }

  renderThreeMonths() {
    const threeMonthRange = 64;
    this.determineRender(threeMonthRange);
  }

  renderOneMonth() {
    const oneMonthRange = 24;
    this.determineRender(oneMonthRange);
  }

  renderOneWeek() {
    const oneWeekRange = 5;
    this.determineRender(oneWeekRange);
  }

  renderOneDay() {

  }

  render() {
    const { data } = this.state;
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