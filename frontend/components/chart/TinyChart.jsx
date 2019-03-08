import React from 'react';
import {
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
} from 'recharts';

const TinyChart = props => {

  const calcDomain = data => (
    [Math.min(...data), Math.min(...data)]
  );

  const { data } = props;

  return (
        <LineChart
          width={60}
          height={16}
          data={data}
          cursor="pointer"
          margin={{ top: 0, right: 0, left: 0, bottom: 0, }} >
            <CartesianGrid 
              strokeDasharray="3 3" 
              horizontal={false} 
              vertical={false} />
            <XAxis 
              dataKey="date" 
              hide={true} />
            <YAxis 
              hide={true}
              domain={calcDomain(data)} />
            <Tooltip 
              cursor="false"
              active="false"
              content={<div />} />
            <Line 
              animationDuration={0} 
              dataKey="close" 
              stroke="#21ce99" 
              activeDot={false}
              dot={false} 
              strokeWidth={1}/>
       </LineChart>
  );

}

export default TinyChart;