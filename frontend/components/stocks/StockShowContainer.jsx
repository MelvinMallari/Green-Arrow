import { connect } from 'react-redux';
import StockShow from './StockShow';
import { fetchStock } from '../../actions/stock_actions';
import { logout } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  const symbol = ownProps.match.params.symbol;
  return ({
    symbol: symbol,
    stocks: state.entities.stocks,
  });
}

const mapDispatchToProps = dispatch => ({
  fetchStock: symbol => dispatch(fetchStock(symbol)),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(StockShow);