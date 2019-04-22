import React from 'react';
import NavBarContainer from '../nav_bar/NavBarContainer';
import ReactLoading from 'react-loading';
import NewsIndex from '../news/NewsIndex';
import SplashSideBarIndex from '../sidebar/SplashSideBarIndex';
import PortfolioChart from '../chart/PortfolioChart';
import LinksFooter from '../LinksFooter';
import { debug } from 'util';

class SplashLoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { interval: '5Y', }
  }

  componentDidMount() {
    const { 
      currentUser, 
      fetchSplashNews, 
      fetchUserData, 
      fetchStocks, 
      splashNews, 
      stocks } = this.props;

    fetchStocks();
    fetchUserData(currentUser.id);
    if (!splashNews.articles) fetchSplashNews();
  }
  
  componentDidUpdate(oldProps) {
    const { currentUser } = this.props;
    let oldUserInfo = oldProps.currentUser;
    if (oldUserInfo !== currentUser) this.fetchRelevantStocks();
  }

  fetchRelevantStocks() {
    const { currentUser, fetchStockIntradayData } = this.props;
    let shares = currentUser.portfolioShares;
    let portfolioSymbols = Object.keys(shares);

    // Pull the stocks in portfolio stocks and watchlist
    portfolioSymbols = portfolioSymbols.filter(symbols => shares[symbols] > 0);
    let watchedSymbols = currentUser.watchedStocks;

    // Merge and de-duplicate the two portfolio and watch list stocks
    let relevantStocks = portfolioSymbols.concat(watchedSymbols.filter(stock => {
      return portfolioSymbols.indexOf(stock) < 0;
    }));

    // Only fetch portfolio symbols that that are owned. 
    for (let i = 0; i < relevantStocks.length; i++) {
      fetchStockIntradayData(relevantStocks[i]);
    }
  }

  renderIntervalButtons() {
    return ['1D', '1W', '1M', '3M', '1Y', '5Y'].map(interval => (
        <button 
          onClick={() => this.setInterval(interval)} 
          className={this.setClassName(interval)}>{interval}</button>
      ))
  }

  setInterval(range) {
    this.setState({interval: range});
  }

  setClassName(current) {
    const { interval } = this.state;
    return "interval-btn " + (interval === current ? "active-button" : "");
  }

  render() {
    const { interval } = this.state;
    const { splashNews, currentUser, stocks } = this.props;
    const articles = splashNews.articles;

    if (!currentUser.oneDayPortfolio 
        || !articles 
        || !currentUser.portfolioShares
        || !Object.keys(stocks).length) {
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
          <NavBarContainer />
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
                        {this.renderIntervalButtons()}
                      </div>
                    </nav>
                    {/* <span className="attention-msg">
                      *Attention: Our current API provider, <a href="https://iextrading.com/developer/docs/#getting-started">IEX</a> is currently in the process of sunsetting endpoints used in this app as of April 19, 2019. As a result, we are currently unable to display intraday data. Please reference <a href="https://github.com/MelvinMallari/Green-Arrow">this link</a> to view a gif of the full functionality while we work to incorporate a replacement provider. Thank you for your patience!
                    </span> */}
                  <section> <NewsIndex articles={articles} /> </section>
                </section>
              </div>
              <SplashSideBarIndex
                currentUser={currentUser}
                stocks={stocks} />
          </main>
          <LinksFooter />
        </div>
      );
    }
  }
}

export default SplashLoggedIn;