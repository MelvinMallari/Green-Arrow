
import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class StockChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.stock.stockData,
    }
  }

  calcEndIndex(data, end) {
    return data.length < end ? data.length : end;
  }

  componentDidMount() {
    this.renderOneYear();
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