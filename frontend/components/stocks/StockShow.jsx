import React from 'react';
import ReactLoading from 'react-loading';
import StockChart from '../chart/StockChart';
import StockAbout from './StockAbout';
import NewsIndex from '../news/NewsIndex';
import StockSideBarContainer from '../sidebar/StockSideBarContainer';
import NavBarContainer from '../nav_bar/NavBarContainer';
import LinksFooter from '../LinksFooter';

class StockShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { interval: '5Y' };
  }

  componentDidMount() {
    const {
      symbol, fetchStock, fetchUserData, currentUser,
    } = this.props;
    if (!currentUser.watchedStocks) fetchUserData(currentUser.id);
    fetchStock(symbol);
  }

  componentDidUpdate(oldProps) {
    if (oldProps.match.params !== this.props.match.params) {
      window.location.reload();
    }
  }

  setClassName(current) {
    const { interval } = this.state;
    const res = `interval-btn ${interval === current ? 'active-button' : ''}`;
    return res;
  }

  setInterval(range) {
    this.setState({ interval: range });
  }

  renderIntervalButtons() {
    return ['1D', '1W', '1M', '3M', '1Y', '5Y'].map(interval => (
      <button onClick={() => this.setInterval(interval)} className={this.setClassName(interval)}>
        {interval}
      </button>
    ));

  render() {
    const { symbol, stocks, currentUser } = this.props;
    const { interval } = this.state;
    const stock = stocks[symbol];
    const numStocksSlices = 17;

    // Check if nested fetch has terminated before rendering
    if (!stocks[symbol] || Object.keys(stocks[symbol]).length < numStocksSlices || !currentUser.watchedStocks) {
      return (
        <div className="loader-container">
          <div className="loader">
            <ReactLoading type="spinningBubbles" color="#21ce99" height={125} width={125} />
          </div>
        </div>
      );
    }
    const { articles } = stock.stockNews;
    return (
      <div className="stock-show-container">
        <NavBarContainer />
        <main className="main-container">
          <div className="stock-info-container">
            <section className="chart-container">
              <StockChart stock={stock} interval={interval} />
              <nav className="interval-nav">
                <div className="chart-buttons-container">{this.renderIntervalButtons()}</div>
              </nav>
            </section>
            <section>
              {' '}
              <StockAbout stock={stock} />
              {' '}
            </section>
            <section>
              {' '}
              <NewsIndex articles={articles} />
              {' '}
            </section>
          </div>
          <StockSideBarContainer stock={stock} currentUser={currentUser} />
        </main>
        <LinksFooter />
      </div>
    );
  }
}

export default StockShow;
