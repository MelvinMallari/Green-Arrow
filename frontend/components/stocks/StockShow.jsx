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

    return(
      <div>
        <h1>Welcome to {symbol} show page.</h1>
        <button onClick={logout}>Logout</button>        
        <StockChart stock={stock} interval={interval} />
        <nav className="interval-nav">
          <button onClick={() => this.renderInterval('5Y')} className="interval-btn">5Y</button>
          <button onClick={() => this.renderInterval('1Y')} className="interval-btn">1Y</button>
          <button onClick={() => this.renderInterval('3M')} className="interval-btn">3M</button>
          <button onClick={() => this.renderInterval('1M')} className="interval-btn">1M</button>
          <button onClick={() => this.renderInterval('1W')} className="interval-btn">1W</button>
        </nav>
      </div>
    );
  }
}

export default StockShow;
