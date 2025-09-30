import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CustomFileInput extends Component {
  render() {
    return (
      <div>
        <input type="file" name={this.props.name} onChange={this.props.onChange} />
      </div>
    );
  }
}

CustomFileInput.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

CustomFileInput.defaultProps = {
  value: '',
  name: '',
  onChange: () => {}
};

export default CustomFileInput;