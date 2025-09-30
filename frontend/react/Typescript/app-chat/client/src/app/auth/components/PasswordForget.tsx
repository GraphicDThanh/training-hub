import * as React from 'react';

const PasswordForget = () => {
  return (
    <React.Fragment>
      <div className="forget-passwrod-form">
        <h2>Reset Password</h2>
        <form action="POST">
          <div className="form-group">
            <label htmlFor="Email Address" aria-hidden />
            <input type="text" placeholder="Email Address" />
          </div>
          <button type="submit">Reset My Password</button>
        </form>
      </div>
    </React.Fragment>
  )
}

export default PasswordForget;