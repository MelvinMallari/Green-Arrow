import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { debug } from 'util';
import StockChart from '../chart/stock_chart';

class StockShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: this.props.stocks,
      interval: '1Y'
    }
    this.renderInterval = this.renderInterval.bind(this);
  }

  renderInterval(range) {
    this.setState({interval: range});
  }

  componentDidMount() {
    const { symbol, fetchStock } = this.props;
    fetchStock(symbol);
  }

  render() {
    const { symbol, stocks, logout } = this.props;
    const { interval } = this.state;
    // Check if nested fetch has terminated before rendering
    if (!stocks[symbol] || !stocks[symbol].stockNews) return false;
    const stock = stocks[symbol];
    // debugger;
    return(
      <div>
        <h1>Welcome to {symbol} show page.</h1>
        <button onClick={logout}>Logout</button>        
        <StockChart stock={stock} interval={interval} />
        <ul>
          <li><button onClick={() => this.renderInterval('5Y')}>5Y</button></li>
          <li><button onClick={() => this.renderInterval('1Y')}>1Y</button></li>
          <li><button onClick={() => this.renderInterval('3M')}>3M</button></li>
          <li><button onClick={() => this.renderInterval('1M')}>1M</button></li>
          <li><button onClick={() => this.renderInterval('1W')}>1W</button></li>
        </ul>
      </div>
    );
  }
}

export default StockShow;

// renderChart(range) {
//   let { dailyData } = this.state.initialData;
//   let data = [];
//   let startIdx = RANGES[range].length;
//   if (startIdx > dailyData.length) startIdx = dailyData.length;
//   let lastIdx;
//   for(let i = dailyData.length - startIdx; i < dailyData.length; i+=RANGES[range].increment) {
//     if (i < 0) i = 0;
//     let time = this.formatDate(dailyData[i].date);
//     data.push({
//       time,
//       price: dailyData[i].close
//     });
//     lastIdx = i;
//   }

//   // Set last date as most recent data point regardless
//   if (lastIdx !== dailyData.length - 1) {
//     let time = this.formatDate(dailyData[dailyData.length-1].date);
//     data.push({
//       time,
//       price: dailyData[dailyData.length - 1].close
//     });
//   }

//   let { max, min, neg, currPrice, openPrice, priceFlux, priceFluxPercentage } = this.calculateDailyPriceData(data, dailyData.length - startIdx - 1);
//   this.setState({
//     currData: {
//       data,
//       currPrice,
//       openPrice,
//       priceFlux,
//       priceFluxPercentage,
//       min,
//       max,
//       neg,
//       dailyData,
//     },
//     active: range
//   });
// }
//          <LineChart width={710} height={195} data={data}
//             margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
//             <YAxis
//               hide={true}
//               domain={[min, max]}
//               />
//             <Tooltip
//               content={<CustomStockTooltip price={currPrice} priceFlux={priceFlux} priceFluxPercentage={priceFluxPercentage} openPrice={openPrice} neg={neg}/>}
//               offset={-40}
//               position={{y: -20}}
//               isAnimationActive={false}
//             />
//             <Line type="linear" dataKey="price" stroke={color} dot={false} strokeWidth={2} />
//           </LineChart>
//           <ul className="chart-range stock">
//             <li><a className={this.state.active === '1D' ? 'chart-choice active' : 'chart-choice'} onClick={this.render1DChart}>1D</a></li>
//             <li><a className={this.state.active === '1W' ? 'chart-choice active' : 'chart-choice'} onClick={() => this.renderChart('1W')}>1W</a></li>
//             <li><a className={this.state.active === '1M' ? 'chart-choice active' : 'chart-choice'} onClick={() => this.renderChart('1M')}>1M</a></li>
//             <li><a className={this.state.active === '3M' ? 'chart-choice active' : 'chart-choice'} onClick={() => this.renderChart('3M')}>3M</a></li>
//             <li><a className={this.state.active === '1Y' ? 'chart-choice active' : 'chart-choice'} onClick={() => this.renderChart('1Y')}>1Y</a></li>
//             <li><a className={this.state.active === '5Y' ? 'chart-choice active' : 'chart-choice'} onClick={() => this.renderChart('5Y')}>5Y</a></li>
//           </ul>