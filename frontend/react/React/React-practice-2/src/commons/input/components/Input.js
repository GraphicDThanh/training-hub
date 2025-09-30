import React, { Component } from 'react';
import { InputFormControlStyled } from './../styles/InputStyled.js';

class Input extends Component {
  render() {
    return (
      <InputFormControlStyled
        type={this.props.type}
        name={this.props.name}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
        searchbar={this.props.searchbar}
      />
    );
  }
}

export default Input;