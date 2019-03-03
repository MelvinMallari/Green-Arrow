import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { debug } from 'util';
import StockChart from '../chart/StockChart';
import ReactLoading from 'react-loading';

class StockShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: '5Y',
    }
  }

  componentDidMount() {
    const { symbol, fetchStock } = this.props;
    fetchStock(symbol);
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
    const stock = stocks[symbol];

    // Check if nested fetch has terminated before rendering
    if (!stocks[symbol] || !stocks[symbol].stockNews) {
      return (
        <div className='loader-container'>
          <div className='loader'>
            <ReactLoading 
              type={"spinningBubbles"} 
              color={"#21ce99"} 
              height={125} 
              width={125} />
          </div>
        </div>
      )
    } else {
      return(
        <div>
          <button onClick={logout}>Logout</button>        
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
}

export default StockShow;
