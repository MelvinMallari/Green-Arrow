import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import NavBar from './NavBar';

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

const mapStateToProps = state => ({
  stocks: state.entities.stocks
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);