import { connect } from 'react-redux';
import SplashSideBarIndex from "./SplashSideBarIndex";
import { fetchStocks } from '../../actions/stock_actions';

const mapStateToProps = (state, ownProps) => ({
    stocks: state.entities.stocks,
  });

const mapDispatchToProps = dispatch => ({
  fetchStocks: () => dispatch(fetchStocks()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashSideBarIndex);
