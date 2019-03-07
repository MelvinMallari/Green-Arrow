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
    debugger;
    const [year, month, day] = date.split("-");
    return `${MONTHS[month]} ${day}, ${year}`
  }

  formatMoney(number) {
    // credits: https://stackoverflow.com/questions/40426965/javascript-function-to-format-as-money
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  updateDisplay(payload) {
    const { diffReference } = this.props;
    const priceElement = document.getElementById('price');
    const priceDiffElement = document.getElementById('price-diff');
    const pctDiffElement = document.getElementById('pct-diff');

    const price = parseFloat(payload.close);
    const priceDiff = parseFloat((price - diffReference));
    const pctDiff = ((priceDiff) / diffReference * 100).toFixed(2);

    priceElement.innerHTML = `${this.formatMoney(price)}`;
    priceDiffElement.innerHTML = `${this.formatMoney(priceDiff)}`;
    pctDiffElement.innerHTML = `(${pctDiff}%)`;

  }

  render() {
    let { interval } = this.props;
    if (!this.props.payload.length) return null;
    debugger;
    
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