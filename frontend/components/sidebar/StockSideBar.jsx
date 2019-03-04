import React from 'react';


class StockSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionType: "buy",
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

  render() {
    return (
      <div className="stock-sidebar-container">
        <div className="stock-sidebar">
          <header>
            <button 
              onClick={() => this.setState({transactionType: "buy"})}
              className={this.setClassName('buy')}>
              BUY AAPL
            </button>
            <button 
              onClick={() => this.setState({transactionType: "sell"})}
              className={this.setClassName('sell')}>
              SELL AAPL
            </button>
          </header>
          <form 
            onSubmit={this.handleSubmit} 
            className="stock-sidebar-form">
            <div className="sidebar-output">
              <div className="stock-sidebar-shares sidebar-label">
                <label htmlFor="share-input">Shares</label>
                <input type="number" placeholder="0" id="share-input"/>
              </div>
              <div className="stock-sidebar-price sidebar-label">
                <span>Market Price</span>
                <span className="sidebar-output-label">$0</span>
              </div>
              <div className="stock-sidebar-cost sidebar-label">
                <span >Estimate Cost</span>
                <span className="sidebar-output-label">$0</span>
              </div>
            </div>
            <div className="submit-btn-container">
              <input 
                type="submit" 
                value="SUBMIT ORDER" 
                className="submit-order-btn"/>
            </div>
          </form>
        </div>
      </div>

    );
  }
}

export default StockSideBar;
