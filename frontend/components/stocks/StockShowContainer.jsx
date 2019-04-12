import { connect } from 'react-redux';
import { fetchStock, fetchStocks } from '../../actions/stock_actions';
import { fetchUserData } from '../../actions/session_actions';
import StockShow from './StockShow';

const mapStateToProps = (state, ownProps) => {
  const symbol = ownProps.match.params.symbol;
  return ({
    symbol: symbol,
    stocks: state.entities.stocks,
    users: state.entities.users,
    currentUser: state.entities.users[state.session.id],
  });
}

const mapDispatchToProps = dispatch => ({
  fetchStock: symbol => dispatch(fetchStock(symbol)),
  fetchUserData: userId =>  dispatch(fetchUserData(userId)),
  fetchStocks: () => dispatch(fetchStocks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StockShow);