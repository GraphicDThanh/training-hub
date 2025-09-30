import React, { Component } from 'react';
import Input from './../commons/input/components/Input.js';

/**
 * HOC (higher-order component)
 * @param {component} WrappedComponent
 */
const withSearch = (WrappedComponent) => {

  return class extends Component {
    state = {
      searchTerm: ''
    }

    handleSearch = e => {
      this.setState({
        searchTerm: e.target.value
      });
    }

    render() {
      return (
        <div>
          <div>
            <Input searchbar type="text" onChange={this.handleSearch} value={this.state.searchTerm} placeholder="Typing for search" />
          </div>
          <WrappedComponent searchTerm={this.state.searchTerm} {...this.props}/>
        </div>
      );
    }
  }
}

export default withSearch;