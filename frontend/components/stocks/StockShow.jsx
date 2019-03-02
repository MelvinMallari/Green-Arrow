import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { debug } from 'util';
import StockChart from '../chart/stock_chart';

class StockShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.stocks;
  }

  componentDidMount() {
    const { symbol, fetchStock } = this.props;
    fetchStock(symbol);
  }

  render() {
    const { symbol, stocks, logout } = this.props;

    // Check if nested fetch has terminated before rendering
    if (!stocks[symbol] || !stocks[symbol].stockNews) return false;

    const stock = stocks[symbol];

    return(
      <div>
        <h1>Welcome to {symbol} show page.</h1>
        <button onClick={logout}>Logout</button>        
        <StockChart stock={stock} interval='1M' />
      </div>
    );
  }
}

export default StockShow;