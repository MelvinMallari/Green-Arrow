import { connect } from 'react-redux';
import { fetchStockIntradayData } from '../../actions/stock_actions';
import SplashSideBarIndexItem from '../sidebar/SplashSideBarIndexItem';


const mapStateToProps = (state, ownProps) => {
  const symbol = ownProps.symbol;
  const stock = state.entities.stocks[symbol];
  return ({
    symbol: symbol,
    stock: stock,
    test: 'hello'
  });
}

const mapDispatchToProps = dispatch => ({
  fetchStockIntradayData: (symbol) => dispatch(fetchStockIntradayData(symbol)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashSideBarIndexItem);