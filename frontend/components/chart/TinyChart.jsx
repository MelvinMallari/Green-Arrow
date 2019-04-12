import React from 'react';
import { LineChart, Line, XAxis, YAxis, } from 'recharts';
const TinyChart = props => {
  const calcDomain = data => ( [Math.min(...data), Math.min(...data)] );
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
              stroke="#21ce99" 
              activeDot={false}
              dot={false} 
              strokeWidth={1}/>
       </LineChart>
  );
}

export default TinyChart;