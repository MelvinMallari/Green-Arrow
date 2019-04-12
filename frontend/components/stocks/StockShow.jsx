import React from 'react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend, 
} from 'recharts';
import StockChart from '../chart/StockChart';
import ReactLoading from 'react-loading';
import StockAbout from './StockAbout';
import NewsIndex from '../news/NewsIndex';
import StockSideBarContainer from '../sidebar/StockSideBarContainer';
import NavBarContainer from '../nav_bar/NavBarContainer';

class StockShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { interval: '5Y'};
  }

  componentDidMount() {
    const { symbol, 
      fetchStock, 
      fetchUserData, 
      currentUser, 
    } = this.props;
    // if (!stocks) fetchStocks();
    if (!currentUser.watchedStocks) fetchUserData(currentUser.id);
    fetchStock(symbol);
  }

  componentDidUpdate(oldProps) {
    if (oldProps.match.params !== this.props.match.params) {
      window.location.reload();
    }
  }

  setInterval(range) {
    this.setState({interval: range});
  }

  setClassName(current) {
    const { interval } = this.state;
    return "interval-btn " + (interval === current ? "active-button" : "");
  }

  render() {
    const { symbol, stocks, currentUser } = this.props;
    const { interval } = this.state;
    const stock = stocks[symbol];

    // Check if nested fetch has terminated before rendering
    if (!stocks[symbol] || !stocks[symbol].stockNews || !currentUser.watchedStocks) {
      return (
        <div className='loader-container'>
          <div className='loader'>
            <ReactLoading 
              type={"spinningBubbles"} 
              color={"#21ce99"} 
              height={125} 
              width={125} />
          </div>
        </div>
      )
    } else {
      const articles = stock.stockNews.articles
      return(
        <div className="stock-show-container">
          <NavBarContainer />
          <main className="main-container">
            <div className="stock-info-container">
              <section className="chart-container">
                  <StockChart stock={stock} interval={interval} />
                    <nav className="interval-nav">
                      <div className="chart-buttons-container">
                        <button 
                          onClick={() => this.setInterval('1D')} 
                          className={this.setClassName('1D')}>1D</button>
                        <button 
                          onClick={() => this.setInterval('1W')} 
                          className={this.setClassName('1W')}>1W</button>
                        <button 
                          onClick={() => this.setInterval('1M')} 
                          className={this.setClassName('1M')}>1M</button>
                        <button 
                          onClick={() => this.setInterval('3M')} 
                          className={this.setClassName('3M')}>3M</button>
                        <button 
                          onClick={() => this.setInterval('1Y')} 
                          className={this.setClassName('1Y')}>1Y</button>
                        <button 
                          onClick={() => this.setInterval('5Y')} 
                          className={this.setClassName('5Y')}>5Y</button>
                      </div>
                    </nav>
              </section>
              <section> <StockAbout stock={stock}/> </section>
              <section> <NewsIndex articles={articles} /> </section>
            </div>
            <StockSideBarContainer
              stock={stock} 
              currentUser={currentUser}
              />
          </main>
        </div>
      );
    }
  }
}

export default StockShow;
