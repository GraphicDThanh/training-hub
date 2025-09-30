import React from 'react';
import ReactDOM from 'react-dom';
import Protypes from 'prop-types';

//- propTypes
/*class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.classes}</h1>
    );
  }
}

Greeting.propTypes = {
  classes: Protypes.array
};

ReactDOM.render(
  <Greeting classes={[1, 2, 3]} />,
  document.getElementById('root')
);*/

//- Requiring Single Child
/*class MyComponent extends React.Component {
  render() {
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: Protypes.element.isRequired
};

ReactDOM.render(
  <MyComponent>
    <p>Hello 1</p>
  </MyComponent>,
  document.getElementById('root')
);*/

//- Default prop values
class Greeting extends React.Component {
  // static defaultProps = {
  //   name: 'Stranger'
  // }
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.defaultProps = {
  name: 'Stranger'
};

ReactDOM.render(
  <Greeting />,
  document.getElementById('root')
);



