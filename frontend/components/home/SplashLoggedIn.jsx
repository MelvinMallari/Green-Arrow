import React from 'react';
import  { fetchStockData, fetchStock } from '../../util/stock_api_util';
import {
  LineChart, Line, XAxis, YAxis 
} from 'recharts';

class SplashLoggedIn extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStockData('TSLA');
  }

  render() {
    const { logout } = this.props;
    return(
      <div>
        <h1>HELLO WORLD</h1>
        <button onClick={logout}>Logout</button>        
      </div>
    );
  }
}

export default SplashLoggedIn;