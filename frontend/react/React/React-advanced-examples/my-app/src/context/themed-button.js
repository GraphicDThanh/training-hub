/*import React from 'react';
import {ThemeContext} from './theme-context';

function ThemedButton(props) {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <button
          {...props}
          style={{backgroundColor: theme.background}}
        />
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemedButton;*/

import React from 'react';
import {ThemeContext} from './theme-context';

function ThemedButton(props) {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <button
          {...props}
          style={{
            color: theme.textcolor,
            backgroundColor: theme.background}}
        >{props.value}</button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemedButton;
