import * as React from 'react';
import { validateEmail } from '../../../utils';
import ModalError from '../../../app/chat-app/components/ModalError';
import ModalLoading from '../../../app/chat-app/components/ModalLoading';

type Props = {
  error: object,
  loading: any[],
  signUp: (email: string, password: string) => {}
}

type State = {
  email: string,
  password: string,
  passwordConfirm: string,
  errorMessage: string,
}

class SignUp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      errorMessage: ''
    }
  }

  private handleSignUp = () => {
    const { signUp } = this.props;
    const { email, password, passwordConfirm } = this.state;
    const validEmail = validateEmail(email);
    const matchPassword = password === passwordConfirm;
    const conditionSignUp = validEmail && password && passwordConfirm && matchPassword;

    if (conditionSignUp) {
      signUp(email, password);
    } else {
      if (!validEmail) {
        this.setState({
          errorMessage: 'Email invalid!'
        });
      } else if (!matchPassword) {
        this.setState({
          errorMessage: 'Password not match!'
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

  private handleChangePasswordConfirm = (e: any) => {
    this.setState({
      passwordConfirm: e.target.value
    });
  }

  render() {
    const {
      email,
      password,
      passwordConfirm,
      errorMessage,
    } = this.state;
    const {
      loading,
      error
    } = this.props;

    let isLoading = loading && loading.length ? true : false,
        isError = error && Object.keys(error).length ? true : false;

    return (
      <React.Fragment>
        <div className="container center authentication sign-up cute-bg">
          <div className="content-wrapper">
            <h2>Sign Up</h2>
            <div className="form-sign-up">
              { errorMessage && <span className="error-message">{errorMessage}</span>}
              <div className="form-group">
                <label htmlFor="Email" aria-hidden />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email Address"
                  value={email}
                  data-attr="email"
                  onChange={this.handleChangeEmail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" aria-hidden />
                <input
                  type="password"
                  data-attr="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChangePassword}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" aria-hidden />
                <input
                  type="password"
                  data-attr="passwordConfirm"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={passwordConfirm}
                  onChange={this.handleChangePasswordConfirm}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleSignUp}
              >
                Sign Up
              </button>
            </div>
            <p>
              Have an account already, go
              <a href="/login">
                Log In
              </a>
            </p>
          </div>
        </div>
        {
          isLoading && <ModalLoading message={loading}/>
        }
        {
          isError && <ModalError error={error}/>
        }
      </React.Fragment>
    )
  }
}

export default SignUp;