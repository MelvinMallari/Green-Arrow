import React from 'react';
import { Link } from 'react-router-dom';


class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoUsername = this.demoUsername.bind(this);
    this.demoPassword = this.demoPassword.bind(this);
  }

  componentDidMount() {
    const { demoUser } = this.props;
    if (demoUser) this.demo(demoUser);
  }

  demo(user) {
    const intervalSpeed = 50;
    const { username, password } = user;
    const demoUsernameTime = username.length*intervalSpeed;
    const demoPasswordTime = password.length*intervalSpeed;
    const buffer = intervalSpeed * 3;
    const totalDemoTime = demoUsernameTime + demoPasswordTime + buffer;

    this.demoUsername(username, intervalSpeed);
    setTimeout(() => this.demoPassword(password, intervalSpeed), demoUsernameTime);
    setTimeout(() => this.props.processForm(this.state), totalDemoTime);
  }

  demoUsername(username, intervalSpeed) {
    let i = 0;

    setInterval(() => {
      if (i <= username.length ) {
        this.setState({username: username.slice(0,i)})
        i++;
      } else {
        clearInterval();
      }
    }, intervalSpeed);
      
  }

  demoPassword(password, intervalSpeed) {
    let j = 0;

    setInterval(() => {
      if (j <= password.length ) {
        this.setState({password: password.slice(0, j)})
        j++;
      } else {
        clearInterval();
      }
    }, intervalSpeed);

  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  renderErrors() {
    const { errors } = this.props;
    return(
      <ul>
        {
          errors.map((error, i) => (
            <li key={`${i}`}>{error}</li>
          ))
        }
      </ul>
    );
  }

  render() {

    return (
      <div className="session-form">
        <div className="session-form-img">
        </div>
        <div className="session-form-display">
          <div className="session-form-submit">
            <h1>Welcome to Green Arrow</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="session-form-vertical">
                <label>
                  <div className='session-label'>Username</div>
                  <div className="input-container">
                    <input 
                      type="text"
                      value={this.state.username}
                      onChange={this.update('username')}
                      className="session-input" />
                  </div>
                </label>
                <label>
                  <div className='session-label'>Password</div>
                  <input 
                    type="password"
                    value={this.state.password}
                    onChange={this.update('password')}
                    className="session-input" />
                </label>
              </div>
              {this.renderErrors()}
              <input 
                type="submit" 
                value={this.props.formType}
                className="submit-btn" />
            </form>
          </div>
        </div>
      </div>

    );
  }
}

export default SessionForm;