import React from 'react';
import { formatMoney } from '../../util/util.js';

class StockSideBar extends React.Component {
  // TODO: Figure out how to render given transaction
  constructor(props) {
    super(props);
    const { currentUser, watched } = this.props;

    this.state = {
      transactionType: "buy",
      shareDifference: 0,
      sharePrice: 0,
      estimateTotal: 0,
      currentBuyingPower: currentUser.currentBuyingPower,
      watched,
    };

    this.handleTransactionSubmit = this.handleTransactionSubmit.bind(this); 
    this.handleWatchlistSubmit = this.handleWatchlistSubmit.bind(this);
  }

  handleTransactionSubmit(e) {
    e.preventDefault();
    const { shareDifference, sharePrice, transactionType } = this.state;
    const { currentUser, createTransaction, stock } = this.props;
    const sign = (transactionType === "buy" ? 1 : -1);

    let transaction = {
      user_id: currentUser.id,
      share_difference: shareDifference*sign,
      share_price: sharePrice,
      ticker_symbol: stock.tickerSymbol,
    };

    if (shareDifference === 0) return null;
    createTransaction(transaction);
  }

  handleWatchlistSubmit(e) {
    e.preventDefault();
    const { addWatch, removeWatch, currentUser, stock, watched } = this.props;
    const watch = { user_id: currentUser.id, ticker_symbol: stock.tickerSymbol };
    watched ? removeWatch(watch) : addWatch(watch);
  }

  handleTab(e, transactionType) {
    e.preventDefault();
    this.props.clearErrors();
    this.setState({transactionType,});
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
    const { stock, currentUser: { portfolioShares } } = this.props;
    const res = portfolioShares[stock.tickerSymbol];
    return res ? res : 0;
  }

  componentDidMount() {
    const { stock } = this.props;
    this.setState({sharePrice: this.calcMarketPrice(stock)});
  }

  renderErrors() {
    const { errors } = this.props;
    return(
      <div className="tx-error-container">
        <ul>
          {
            errors.map((error, i) => ( 
              <li key={`${i}`} className="tx-error-list-item">
                <i class="fas fa-exclamation-circle"></i>
                {error}
              </li>))
          }
        </ul>
      </div>
    );
  }
  
  setClassName(type) {
    const { transactionType } = this.state;
    return transactionType === type ? "interval-btn active-button" : "interval-btn";
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
    const { stock, currentUser, watched } = this.props;
    const marketPrice = formatMoney(this.calcMarketPrice(stock));
    const transactionTotal = formatMoney(sharePrice*shareDifference);
    const buyingPower = currentUser.currentBuyingPower;
    const watchListStatus = watched ? 
            "watch-list-btn watch-list-active" : "watch-list-btn";

    if (!buyingPower) return null;

    this.calcSharesOwned();

    return (
      <div className="stock-sidebar-container">
        <div className="stock-sidebar">
          <header>
            <button 
              onClick={e => this.handleTab(e, 'buy')}
              className={this.setClassName('buy')}>
              BUY {stock.tickerSymbol}
            </button>
            <button 
              onClick={e => this.handleTab(e, 'sell')}
              className={this.setClassName('sell')}>
              SELL {stock.tickerSymbol}
            </button>
          </header>

          <form 
            onSubmit={this.handleTransactionSubmit} 
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
            {this.renderErrors()}
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

          <button 
            onClick={this.handleWatchlistSubmit}
            className={watchListStatus}>
            {watched ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
      </div>

    );
  }
}

export default StockSideBar;
