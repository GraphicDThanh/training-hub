import React from 'react';
import ReactDOM from 'react-dom';

import ThemedButton from './context/themed-button';
import {ThemeContext, themes} from './context/theme-context';

function Toolbar(props) {
  return (
    <div style={{
          border: '1px solid #ccc'}}>
      <h3>This is deeper component:</h3>
      <ThemedButton
        value="Switch Theme By Click"
        onClick={props.changeTheme}
      />
    </div>

  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: themes.light
    }

    this.toggleTheme = this.toggleTheme.bind(this);
  }

  toggleTheme() {
    // this.setState({
    //   theme: this.state.theme === themes.dark ? themes.light : themes.dark
    // });

    this.setState(state => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark
    }));
  }

  render() {
    return (
      <div>
        <div>
          <h2>Modify state button by context</h2>
          <ThemeContext.Provider value={this.state.theme}>
            <Toolbar changeTheme={this.toggleTheme}/>
          </ThemeContext.Provider>
        </div>
        <div>
          <h2>Default state of button is dark:</h2>
          <ThemedButton value="Default Theme State"/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
/*import React from 'react';
import ReactDOM from 'react-dom';

import {ThemeContext, themes} from './context/theme-context';
import ThemedButton from './context/themed-button';

function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    }
  }

  render () {
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <section>
          <ThemedButton />
        </section>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);*/