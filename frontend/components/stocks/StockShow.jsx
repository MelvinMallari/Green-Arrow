import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { debug } from 'util';
import StockChart from '../chart/StockChart';

class StockShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: this.props.stocks,
      interval: '5Y'
    }
  }

  componentDidMount() {
    const { symbol, fetchStock } = this.props;
    fetchStock(symbol);
  }

  computeVolWeightedAvg(sampleData) {
    let sumVolPrice, sumVol, volWeightedAvg;
    sumVolPrice = sumVol = volWeightedAvg = 0;

    for (let i = 0; i < sampleData.length; i++) {
      sumVolPrice += sampleData[i].close * sampleData[i].volume;
      sumVol += sampleData[i].volume;
    }

    volWeightedAvg = (sumVolPrice / sumVol).toFixed(2);
    return volWeightedAvg;
  }

  setInterval(range) {
    this.setState({interval: range});
  }

  setClassName(current) {
    if (this.state.interval === current) {
      return "interval-btn active-interval";
    } else {
      return "interval-btn";
    }
  }

  render() {
    const { symbol, stocks, logout } = this.props;
    const { interval } = this.state;

    // Check if nested fetch has terminated before rendering
    if (!stocks[symbol] || !stocks[symbol].stockNews) return false;
    const stock = stocks[symbol];

    // testing
    const sampleData = stock.stockData.slice(0, 6);
    console.log(this.computeVolWeightedAvg(sampleData));

    return(
      <div>
        <button onClick={logout}>Logout</button>        
        <h1>{stock.companyName}</h1>
        <div>
            <StockChart stock={stock} interval={interval} />
            <nav className="interval-nav">
              <div className="chart-buttons-container">
                <button onClick={() => this.setInterval('1D')} className={this.setClassName('1D')}>1D</button>
                <button onClick={() => this.setInterval('1W')} className={this.setClassName('1W')}>1W</button>
                <button onClick={() => this.setInterval('1M')} className={this.setClassName('1M')}>1M</button>
                <button onClick={() => this.setInterval('3M')} className={this.setClassName('3M')}>3M</button>
                <button onClick={() => this.setInterval('1Y')} className={this.setClassName('1Y')}>1Y</button>
                <button onClick={() => this.setInterval('5Y')} className={this.setClassName('5Y')}>5Y</button>
              </div>
            </nav>
        </div>
      </div>
    );
  }
}

export default StockShow;
