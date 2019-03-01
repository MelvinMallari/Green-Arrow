import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { debug } from 'util';

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
    const data = stocks[symbol].stockData;

    return(
      <div>
        <h1>Welcome to {symbol} show page.</h1>
        <button onClick={logout}>Logout</button>        
        <LineChart
         width={722}
         height={315}
         data={data}
         margin={{
           top: 5, right: 30, left: 20, bottom: 5,
         }} >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
          <XAxis dataKey="date" hide={true} padding={{top:0, bottom:0}}/>
          <YAxis hide={true} padding={{left:0, right: 0}}/>
          <Tooltip  isAnimationActive={false} />
          {/* <Legend /> */}
          <Line  dataKey="close" stroke="#21ce99" dot={false}/>
       </LineChart>
      </div>
    );
  }
}

export default StockShow;

// import React, { PureComponent } from 'react';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
// } from 'recharts';

// const data = [
//   {
//     name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
//   },
//   {
//     name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
//   },
//   {
//     name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
//   },
//   {
//     name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
//   },
//   {
//     name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
//   },
//   {
//     name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
//   },
//   {
//     name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
//   },
// ];

// export default class Example extends PureComponent {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

//   render() {
//     return (
//       <LineChart
//         width={500}
//         height={300}
//         data={data}
//         margin={{
//           top: 5, right: 30, left: 20, bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
//         <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//       </LineChart>
//     );
//   }
// }