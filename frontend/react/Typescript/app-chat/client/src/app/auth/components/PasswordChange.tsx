import * as React from 'react';

const PasswordChange = () => {
  return (
    <React.Fragment>
      <div className="change-passwrod-form">
        <h2>Change Password</h2>
        <form action="POST">
          <div className="form-group">
            <label htmlFor="New Password" aria-hidden />
            <input type="password" placeholder="New Password" />
          </div>
          <div className="form-group">
            <label htmlFor="password" aria-hidden />
            <input type="password" placeholder="Confirm New Password" />
          </div>
          <button type="submit">Update Password</button>
        </form>
      </div>
    </React.Fragment>
  )
}

export default PasswordChange;