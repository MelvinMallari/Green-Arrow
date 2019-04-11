import React from 'react';
import {
  LineChart, Line, XAxis, YAxis 
} from 'recharts';
import NavBarContainer from '../nav_bar/NavBarContainer';
import ReactLoading from 'react-loading';
import NewsIndex from '../news/NewsIndex';
import SplashSideBarIndex from '../sidebar/SplashSideBarIndex';
import PortfolioChart from '../chart/PortfolioChart';

class SplashLoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      interval: '5Y',
    }
  }

  componentDidMount() {
    const { 
      currentUser, 
      fetchSplashNews, 
      fetchUserData, 
      fetchStocks } = this.props;
    
    fetchUserData(currentUser.id);
    fetchStocks();
    fetchSplashNews();
  }
  
  componentDidUpdate(oldProps) {
    if (oldProps.currentUser !== this.props.currentUser) {
      this.fetchRelevantStocks();
    }
  }

  fetchRelevantStocks() {
    const { currentUser, fetchStockIntradayData } = this.props;
    let shares = currentUser.portfolioShares;
    let portfolioSymbols = Object.keys(shares);

    // Pull the stocks in portfolio stocks and watchlist
    portfolioSymbols = portfolioSymbols.filter(symbols => shares[symbols] > 0);
    let watchedSymbols = currentUser.watchedStocks.map(stock => stock.ticker_symbol);

    // Merge and de-duplicate the two portfolio and watch list stocks
    let relevantStocks = portfolioSymbols.concat(watchedSymbols.filter(stock => {
      return portfolioSymbols.indexOf(stock) < 0;
    }))

    // Only grab portfolio symbols that that are owned. 
    for (let i = 0; i < relevantStocks.length; i++) {
      fetchStockIntradayData(relevantStocks[i]);
    }
  }

  setInterval(range) {
    this.setState({interval: range});
  }

  setClassName(current) {
    if (this.state.interval === current) {
      return "interval-btn active-button";
    } else {
      return "interval-btn";
    }
  }

  render() {
    const { interval } = this.state;
    const { 
      splashNews,
      currentUser, 
      stocks, 
      fetchStockIntradayData } = this.props;
    const articles = splashNews.articles;

    if (!currentUser.oneDayPortfolio || !articles || ! currentUser.portfolioShares) {
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
      return(
        <div>
          <NavBarContainer
            stocks={this.props.stocks} />
          <main className="main-container">
              <div className="stock-info-container">
                <section className="chart-container">
                    <PortfolioChart 
                      currentUser={currentUser}
                      oneDayPortfolioData={currentUser.oneDayPortfolio}
                      fiveYearPortfolioData={currentUser.fiveYearPortfolio}
                      interval={interval}/>
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
                  <section> <NewsIndex articles={articles} /> </section>
                </section>
              </div>
              <SplashSideBarIndex
                currentUser={currentUser}
                stocks={stocks} />
          </main>
        </div>
      );
    }
  }
}

export default SplashLoggedIn;