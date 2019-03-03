import React from 'react'

const MONTHS = {
  "01": "JAN",
  "02": "FEB",
  "03": "MAR",
  "04": "APR",
  "05": "MAY",
  "06": "JUN",
  "07": "JUL",
  "08": "AUG",
  "09": "SEP",
  "10": "OCT",
  "11": "NOV",
  "12": "DEC",
}

class ToolTip extends React.Component {
  formatDate(date) {
    const [year, month, day] = date.split("-");
    return `${MONTHS[month]} ${day}, ${year}`
  }

  updateDisplay(payload) {
    const { diffReference } = this.props;
    const price = document.getElementById('price');
    const priceDifferential = document.getElementById('price-differential');

    price.innerHTML = payload.close.toFixed(2).toString();
    priceDifferential.innerHTML =  (payload.close - diffReference).toFixed(2);

  }

  render() {
    let { interval } = this.props;
    if (!this.props.payload.length) return null;
    
    // grab the relevant information from the payload Tooltip passes in
    const payload =  this.props.payload[0].payload;
  
    this.updateDisplay(payload);

    return(
      <div>
        <span className="tooltip"> 
          {
            interval === '1D' ? 
            (`${payload.label} ET`) : 
            (this.formatDate(payload.date)
          )
          } </span>
      </div>
    );
  }
}

export default ToolTip;