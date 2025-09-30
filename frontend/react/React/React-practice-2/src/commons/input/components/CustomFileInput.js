import React, { Component } from 'react';

class CustomFileInput extends Component {
  render() {
    return (
      <div>
        <input type="file" name={this.props.name} onChange={this.props.onChange} />
      </div>
    );
  }
}

export default CustomFileInput;