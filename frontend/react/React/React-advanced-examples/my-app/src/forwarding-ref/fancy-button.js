import React from 'react';

function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('testing old props: ', prevProps);
      console.log('testing new props: ', this.props);
    }

    render() {
      const {forwardedRef, ...rest} = this.props;
      console.log('testing forwardedRef', forwardedRef);
      console.log('testing ...rest', ...rest);
      return <Component ref={forwardedRef} {...rest} />
    }
  }

  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}

class FancyButton extends React.Component {
  constructor(props) {
    super(props);
    console.log('testing Fancy Button props', this.props);
    console.log('testing Fancy Button ref', this.props.forwardedRef);
    this.ref = React.createRef();
  }

  focus() {
    console.log('calling focus function', this.ref.current);
  }

  render() {
    return (
      <button ref={this.ref}>Hello</button>
    );
  }
}

export default logProps(FancyButton);