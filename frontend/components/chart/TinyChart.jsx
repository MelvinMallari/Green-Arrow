import React from 'react';
import { LineChart, Line, XAxis, YAxis, } from 'recharts';
const TinyChart = props => {
  const calcDomain = data => ( [Math.min(...data), Math.min(...data)] );

  const findReference = data =>  {
    let values = Object.values(data);
    for (let i = 0; i < data.length; i++) {
      if (values[i]) return values[i].close;
    }
    return 0;
  }

  const calcInitPrice = data => {
    if (data.length === 0 ) return 0;
    let i = data.length - 1;
    while (!data[i].close) { i--; }
    return parseFloat(data[i].close.toFixed(2));
  }

  const calcDiff = () => {
    const diffReference = findReference(props.data);
    const initPrice = calcInitPrice(props.data);
    return ((initPrice - diffReference) / diffReference * 100).toFixed(2);
  }

  const initPctDiff = calcDiff();
  const theme = initPctDiff < 0 ? '#f45531' : '#21ce99';

  return (
        <LineChart
          width={60}
          height={16}
          data={props.data}
          cursor="pointer"
          margin={{ top: 0, right: 0, left: 0, bottom: 0, }} >
            <XAxis 
              dataKey="date" 
              hide={true} />
            <YAxis 
              hide={true}
              domain={calcDomain(props.data)} />
            <Line 
              animationDuration={0} 
              dataKey="close" 
              stroke={theme} 
              activeDot={false}
              dot={false} 
              strokeWidth={1}/>
       </LineChart>
  );
}

export default TinyChart;