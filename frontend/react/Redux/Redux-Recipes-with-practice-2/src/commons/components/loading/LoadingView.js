import React, { Component } from 'react';
import { LoadingStyled } from '../styles/LoadingStyled.js';

class LoadingView extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isLoading: false
  //   };
  // }

  // use for testing loading view
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       isLoading: true
  //     });
  //   }, 1000);
  // }

  render() {
    return (
      this.props.bootstraped ? this.props.children : <LoadingStyled>Loadding ...</LoadingStyled>
    );
  }
}

export default LoadingView;