import { connect } from 'react-redux';
import StockSideBar from './StockSideBar';

const mapStateToProps = ({entities: { transactions }}) => {
  return ({
    transactions: transactions,    
  });
}

export default connect(mapStateToProps)(StockSideBar);