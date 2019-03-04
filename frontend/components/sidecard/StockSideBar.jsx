import React from 'react';


class StockSideBar extends React.Component {
  constructor(props) {
    super(props);
  }


  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="stock-sidebar-container">
        <div className="stock-sidebar">
          <header> BUY | SELL </header>
          <form 
            onSubmit={this.handleSubmit} 
            className="stock-sidebar-form">
            <div>
              <div className="stock-sidebar-shares sidebar-label">
                <label for="share-input">Shares</label>
                <input type="number" placeholder="0" id="share-input"/>
              </div>
              <div className="stock-sidebar-price sidebar-label">
                <span>Market Price</span>
                <span className="sidebar-output">$0</span>
              </div>
              <div className="stock-sidebar-cost sidebar-label">
                <span >Estimate Cost</span>
                <span className="sidebar-output">$0</span>
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
