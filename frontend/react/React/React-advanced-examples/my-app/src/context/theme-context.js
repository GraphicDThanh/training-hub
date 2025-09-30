// import React from 'react';

//  export const themes = {
//   light: {
//     foreground: '#000000',
//     background: '#eeeeee'
//   },
//   dark: {
//     foreground: '#ffffff',
//     background: '#222222'
//   },
// };

// export const ThemeContext = React.createContext(
//   themes.dark // default value
// );

import React from 'react';

export const themes = {
  light: {
    textcolor: 'red',
    background: '#fff'
  },
  dark: {
    textcolor: 'blue',
    background: 'pink'
  }
};

export const ThemeContext = React.createContext(themes.dark);