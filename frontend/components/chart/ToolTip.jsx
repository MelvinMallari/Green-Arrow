import React from 'react'

class ToolTip extends React.Component {
  render() {
    let { interval } = this.props;
    if (!this.props.payload.length) return null;
  
    // grab the relevant information from the payload Tooltip passes in
    const payload =  this.props.payload[0].payload;
    return(
      <div>
        <span> {interval === '1D' ? payload.minute : payload.label} </span>
      </div>
    );
  }
}

export default ToolTip;