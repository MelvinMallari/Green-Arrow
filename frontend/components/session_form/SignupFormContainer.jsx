import { connect } from 'react-redux';
import SessionForm from './SessionForm';
import { signup } from '../../actions/session_actions';

const mapStateToProps = ({ errors }) => {
  return ({
    errors: errors.session,
    formType: "Sign Up",
  });
}

const mapDispatchToProps = dispatch => ({
  processForm: (user) => dispatch(signup(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);