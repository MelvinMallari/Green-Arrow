import { connect } from 'react-redux';
import SessionForm from './SessionForm';
import { login, clearErrors } from '../../actions/session_actions';

const mapStateToProps = ({ errors }) => {
  return ({
    errors: errors.session,
    formType: "Login",
  });
}

const mapDispatchToProps = dispatch => ({
  processForm: (user) => dispatch(login(user)),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);