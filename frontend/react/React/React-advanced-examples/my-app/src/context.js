import React from 'react';
import ReactDOM from 'react-dom';

// Theme context, default to light theme
const ThemeContext = React.createContext('light');

// Signed-in user context
const UserContext = React.createContext({
  name: 'Guest'
});

class App extends React.Component {
  render() {
    // this line will cause bug because this.props is deep obj
    // const {signedInUser, theme} = this.props;
    const signedInUser = this.props.user;
    const theme = this.props.theme;
    // App component provide initial content values
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
    // return <Layout />;
  }
}

function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}

function Sidebar() {
  return (
    <div>
      This is a slidebar
    </div>
  );
}

function ProfilePage(props) {
  return (
    <div>
      <h2>This is profile page</h2>
      <h3>Name: {props.user.name}</h3>
      <h3>Theme: {props.theme}</h3>
    </div>
  );
}

// A component may consume multi context
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

var data = {
  user: {
    name: 'Thanh'
  },
  theme: 'dark',
};
ReactDOM.render(
  <App {...data} />,
  document.getElementById('root')
);