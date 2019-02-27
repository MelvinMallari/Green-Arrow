import { connect } from 'react-redux';
import SessionForm from './SessionForm';
import { login } from '../../actions/session_actions';

const mapStateToProps = ({ errors }) => {
  return ({
    errors: errors.session,
    formType: "Login",
  });
}

const mapDispatchToProps = dispatch => ({
  processForm: (user) => dispatch(login(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);