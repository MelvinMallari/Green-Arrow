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
      interval: '5Y'
    }
  }


  componentDidMount() {
    const { symbol, fetchStock } = this.props;
    fetchStock(symbol);
  }

  setInterval(range) {
    this.setState({interval: range});
  }

  setClassName(tab) {
    if (this.state.interval === tab) {
      return "interval-btn active";
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

    return(
      <div>
        <h1>Welcome to {symbol} show page.</h1>
        <button onClick={logout}>Logout</button>        
        <StockChart stock={stock} interval={interval} />
        <nav className="interval-nav">
          <button onClick={() => this.setInterval('1W')} className={this.setClassName('1W')}>1W</button>
          <button onClick={() => this.setInterval('1M')} className={this.setClassName('1M')}>1M</button>
          <button onClick={() => this.setInterval('3M')} className={this.setClassName('3M')}>3M</button>
          <button onClick={() => this.setInterval('1Y')} className={this.setClassName('1Y')}>1Y</button>
          <button onClick={() => this.setInterval('5Y')} className={this.setClassName('5Y')}>5Y</button>
        </nav>
      </div>
    );
  }
}

export default StockShow;
