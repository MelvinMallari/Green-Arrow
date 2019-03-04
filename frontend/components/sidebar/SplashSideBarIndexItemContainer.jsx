import { connect } from 'react-redux';
import { fetchStockIndexItemTest } from '../../actions/stock_actions';
import SplashSideBarIndexItem from '../sidebar/SplashSideBarIndexItem';


const mapStateToProps = (state, ownProps) => {
  const symbol = ownProps.symbol;
  const stock = state.entities.stocks[symbol];
  return ({
    symbol: symbol,
    stock: stock,
  });
}

const mapDispatchToProps = dispatch => ({
  fetchStockIndexItemTest: (symbol) => dispatch(fetchStockIndexItemTest(symbol)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashSideBarIndexItem);