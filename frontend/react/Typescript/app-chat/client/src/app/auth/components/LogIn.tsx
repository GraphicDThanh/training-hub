import * as React from 'react';
import { validateEmail } from '../../../utils';

type Props = {
  loginGoogle: () => {},
  login: (email: string, password: string) => {},
}

type State = {
  email: string;
  password: string;
  errorMessage: string;
}
class LogIn extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    }
  }

  private handleLogin = () => {
    const { login } = this.props;
    const { email, password } = this.state;

    const validEmail = validateEmail(email);
    const validPassword = password.length > 5;

    if (validPassword && validEmail) {
      login(email, password);
    } else {
      if (!validEmail) {
        this.setState({
          errorMessage: 'Email invalid!'
        });
      } else if (!validPassword) {
        this.setState({
          errorMessage: 'Password too short!'
        });
      } else {
        this.setState({
          errorMessage: 'Missing data!'
        });
      }
    }
  }

  private handleChangeEmail = (e: any) => {
    this.setState({
      email: e.target.value
    });
  }

  private handleChangePassword = (e: any) => {
    this.setState({
      password: e.target.value
    });
  }

  render() {
    const { email, password, errorMessage } = this.state;

    return (
      <React.Fragment>
        <div className="container center authentication log-in cute-bg">
          <div className="content-wrapper">
            <h2>Log In</h2>
            <div className="form-log-in">
              { errorMessage && <span className="error-message">{errorMessage}</span>}
              <div className="form-group">
                <label htmlFor="Email" aria-hidden />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email Address"
                  value={email}
                  onChange={this.handleChangeEmail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" aria-hidden />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChangePassword}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleLogin}
              >
                Login
              </button>
            </div>
            <p>
              Don't have an account?
              <a href="/signup">
                Sign Up
              </a>
            </p>
          </div>
          </div>
      </React.Fragment>
    )
  }
}

export default LogIn;