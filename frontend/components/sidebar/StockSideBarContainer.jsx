import { connect } from 'react-redux';
import StockSideBar from './StockSideBar';

const mapStateToProps = (state, ownProps) => {
  return ({
    transactions: state.entities.transactions    
  });
}

export default connect(mapStateToProps)(StockSideBar);