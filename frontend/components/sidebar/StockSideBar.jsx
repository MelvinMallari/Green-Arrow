import React from 'react';

class StockSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionType: "buy",
      share_difference: 0,
      share_price: 0,
      ticker_symbol: "",
      estimateTotal: 0,
      currentUserBuyingPower: 0
    }
  }
  

  componentDidMount() {
    const { stock } = this.props;
    this.setState({share_price: this.calcMarketPrice(stock)});
  }

  componentDidUpdate(oldProps) {
    if (oldProps !== this.props) {
      const { currentUserInfo } = this.props;
      this.setState({
        currentUserBuyingPower: currentUserInfo.current_buying_power
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  setClassName(type) {
    if (this.state.transactionType === type) {
      return "interval-btn active-button";
    } else {
      return "interval-btn";
    }
  }

  formatMoney(number) {
    // credits: https://stackoverflow.com/questions/40426965/javascript-function-to-format-as-money
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  calcMarketPrice(stock) {
    const stockIntradayData = stock.stockIntradayData;
    let i = stockIntradayData.length - 1;
    while (!stockIntradayData[i].close) {
      i--;
    }
    
    let currentPrice = stockIntradayData[i].close.toFixed(2);
    const initPrice = parseFloat(currentPrice);
    return initPrice;
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  render() {
    const {share_price, share_difference, transactionType} = this.state;
    const { stock, currentUserInfo } = this.props;
    const marketPrice = this.formatMoney(this.calcMarketPrice(stock));
    const transactionTotal = this.formatMoney(share_price*share_difference);
    const buyingPower = currentUserInfo.current_buying_power;

    if (buyingPower === undefined) return null;
    return (
      <div className="stock-sidebar-container">
        <div className="stock-sidebar">
          <header>
            <button 
              onClick={() => this.setState({transactionType: "buy"})}
              className={this.setClassName('buy')}>
              BUY {stock.ticker_symbol}
            </button>
            <button 
              onClick={() => this.setState({transactionType: "sell"})}
              className={this.setClassName('sell')}>
              SELL {stock.ticker_symbol}
            </button>
          </header>
          <form 
            onSubmit={this.handleSubmit} 
            className="stock-sidebar-form">
            <div className="sidebar-output">
              <div className="stock-sidebar-shares sidebar-label">
                <label htmlFor="share-input">Shares</label>
                <input 
                  type="number" 
                  placeholder="0" 
                  id="share-input" 
                  onChange={this.update('share_difference')}/>
              </div>
              <div className="stock-sidebar-price sidebar-label">
                <span>Market Price</span>
                <span className="sidebar-output-label">{marketPrice}</span>
              </div>
              <div className="stock-sidebar-cost sidebar-label">
                <span >Estimate Cost</span>
                <span className="sidebar-output-label">{transactionTotal}</span>
              </div>
            </div>
            <div className="submit-btn-container">
              <input 
                type="submit" 
                value={transactionType === "sell" ? "Submit Sell" : "Submit Buy"}
                className="submit-order-btn"/>
            </div>
            <div className="buying-power-container">
              <span>
                {this.formatMoney(buyingPower)} Buying Power Available
              </span>
            </div>
          </form>
        </div>
      </div>

    );
  }
}

export default StockSideBar;
