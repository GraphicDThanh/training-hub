import React, { Component } from 'react';
import { InputFormControlStyled } from '../styles/InputStyled.js';
import PropTypes from 'prop-types';

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

Input.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  searchbar: PropTypes.bool
};

Input.defaultProps = {
  type: 'text',
  value: '',
  name: '',
  placeholder: '',
  onChange: () => {},
  searchbar: false
};

export default Input;