import React from 'react';
import { formatMoney } from '../../util/util.js';

const MONTHS = {
  '01': 'JAN',
  '02': 'FEB',
  '03': 'MAR',
  '04': 'APR',
  '05': 'MAY',
  '06': 'JUN',
  '07': 'JUL',
  '08': 'AUG',
  '09': 'SEP',
  '10': 'OCT',
  '11': 'NOV',
  '12': 'DEC',
};

class ToolTip extends React.Component {
  formatDate(date) {
    const [year, month, day] = date.split('-');
    return `${MONTHS[month]} ${day}, ${year}`;
  }

  updateDisplay(payload) {
    const { diffReference } = this.props;
    const priceElement = document.getElementById('price');
    const priceDiffElement = document.getElementById('price-diff');
    const pctDiffElement = document.getElementById('pct-diff');

    const price = parseFloat(payload.close);
    const priceDiff = parseFloat(price - diffReference);
    const pctDiff = ((priceDiff / diffReference) * 100).toFixed(2);

    priceElement.innerHTML = `${formatMoney(price)}`;
    priceDiffElement.innerHTML = `${formatMoney(priceDiff)}`;
    pctDiffElement.innerHTML = `(${pctDiff}%)`;
  }

  convertTime(time) {
    // Credits: https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

  render() {
    const { interval } = this.props;
    if (!this.props.payload || !this.props.payload.length) return null;

    // grab the relevant information from the payload Tooltip passes in
    const { payload } = this.props.payload[0];

    this.updateDisplay(payload);
    const time = this.convertTime(payload.date);

    return (
      <div>
        <span className="tooltip">{interval === '1D' ? `${time} ET` : this.formatDate(payload.date)} </span>
      </div>
    );
  }
}

export default ToolTip;
