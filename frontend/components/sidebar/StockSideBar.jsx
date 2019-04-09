import React from 'react';
import { formatMoney } from '../../util/util.js';

class StockSideBar extends React.Component {
  // TODO: Figure out how to render given transaction
  constructor(props) {
    super(props);
    this.state = {
      transactionType: "buy",
      shareDifference: 0,
      sharePrice: 0,
      estimateTotal: 0,
      currentBuyingPower: this.props.currentUserInfo.currentBuyingPower
    }
    this.handleSubmit = this.handleSubmit.bind(this);
}


  handleSubmit(e) {
    e.preventDefault();
    const { shareDifference, sharePrice, transactionType } = this.state;
    const { currentUserInfo, createTransaction, stock } = this.props;
    let transaction;
    const sign = (transactionType === "buy" ? 1 : -1)

    transaction = {
      user_id: currentUserInfo.id,
      share_difference: shareDifference*sign,
      share_price: sharePrice,
      ticker_symbol: stock.tickerSymbol,
    }

    if (shareDifference === 0) return null;
    createTransaction(transaction);
    // this.setState({
    //     shareDifference: 0,
    //     currentBuyingPower: currentUserInfo.currentBuyingPower,})
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

  calcSharesOwned() {
    const { stock, currentUserInfo: { portfolioShares } } = this.props;
    const res = portfolioShares[stock.tickerSymbol]
    return res ? res : 0;
  }

  componentDidMount() {
    const { stock } = this.props;
    this.setState({sharePrice: this.calcMarketPrice(stock)});
  }

  
  setClassName(type) {
    if (this.state.transactionType === type) {
      return "interval-btn active-button";
    } else {
      return "interval-btn";
    }
  }

  update(field) {
    if (field === "shareDifference") {
      return e => { 
        let input = (e.currentTarget.value === "" ? '0' : e.currentTarget.value);
        this.setState({ [field]: parseInt(input) });
      };
    } else {
      return e => this.setState({ [field]: e.currentTarget.value });
    }
  }

  render() {
    const {sharePrice, shareDifference, transactionType} = this.state;
    const { stock, currentUserInfo } = this.props;
    const marketPrice = formatMoney(this.calcMarketPrice(stock));
    const transactionTotal = formatMoney(sharePrice*shareDifference);
    const buyingPower = currentUserInfo.currentBuyingPower;

    if (!buyingPower) return null;

    this.calcSharesOwned();

    return (
      <div className="stock-sidebar-container">
        <div className="stock-sidebar">
          <header>
            <button 
              onClick={() => this.setState({transactionType: "buy"})}
              className={this.setClassName('buy')}>
              BUY {stock.tickerSymbol}
            </button>
            <button 
              onClick={() => this.setState({transactionType: "sell"})}
              className={this.setClassName('sell')}>
              SELL {stock.tickerSymbol}
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
                  value={this.state.shareDifference}
                  id="share-input" 
                  onChange={this.update('shareDifference')}/>
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
                {
                  this.state.transactionType === 'buy' ? (
                    `${formatMoney(buyingPower)} Buying Power Available`
                  ) : (
                    `${this.calcSharesOwned()} Shares Owned`
                  )
                }
              </span>
            </div>
          </form>
        </div>
      </div>

    );
  }
}

export default StockSideBar;
