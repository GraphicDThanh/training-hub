import React from 'react';
import ReactDOM from 'react-dom';
import styled, { ThemeProvider, keyframes, css } from 'styled-components';

// const render = (component) => {
//   ReactDOM.render(
//     component,
//     document.getElementById('root')
//   );
// }
// example using extend
const ButtonModify = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 1em;
  font-size: 1em;
  color: palevioletred;
  border: 2px solid palevioletred;
`;

export default ButtonModify;
/*const TomatoButton = Button.extend`
  color: tomato;
  border-color: tomato;
`;

ReactDOM.render(
  <div>
    <Button>Normal button</Button>
    <Button primary>Primary button</Button>
  </div>,
  document.getElementById('root')
);*/

// example using additional props
/*const Input = styled.input.attrs({
  type: 'password',

  margin: props => props.size || '1em',
  padding: props => props.size || '1em'
})`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  margin: ${props => props.margin};
  padding: ${props => props.padding};
`;

ReactDOM.render(
  <div>
    <Input placeholder="A small text input" size="1em" />
    <br />
    <Input placeholder="A bigger text input" size="2em" />
  </div>,
  document.getElementById('root')
);*/

// example with animation
/*const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

ReactDOM.render(
  <Rotate>&lt; 💅 &gt;</Rotate>,
  document.getElementById('root')
);*/

// example for theming
/*const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;

const theme = {
  main: 'palevioletred'
};

ReactDOM.render(
  <div>
    <Button theme={{ main: 'royalblue' }}>Ad hoc theme</Button>
    <ThemeProvider theme={theme}>
      <div>
        <Button>Theme</Button>
        <Button theme={{ main: 'darkorange' }}>Overridden</Button>
      </div>
    </ThemeProvider>
  </div>,
  document.getElementById('root')
);*/

// example for media templates
// const sizes = {
//   desktop: 992,
//   tablet: 768,
//   phone: 376
// };
// const media = Object.keys(sizes).reduce((acc, label) => {
//   console.log('testing acc', acc);
//   console.log('testing label', label);
//   acc[label] = (...args) => css`
//     @media (max-width: ${sizes[label] / 16}em) {
//       ${css(...args)}
//     }
//   `
//   console.log('testng acc', acc);
//   return acc;
// }, {});
// const Content = styled.div`
//   background: papayawhip;
//   height: 3em;
//   width: 3em;

//   ${media.desktop`background: dodgerblue;`}
//   ${media.tablet`background: mediumseagreen;`}
//   ${media.phone`background: palevioletred;`}
// `;

// render(<Content />);