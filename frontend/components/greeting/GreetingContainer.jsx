import { connect } from 'react-redux';
import Greeting from './Greeting';
import { logout } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  return ({
    currentUser: state.entities.users[state.session.id],
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    logout: () => dispatch(logout()),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);