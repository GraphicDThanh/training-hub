import React, { Component } from 'react';
import Input from './../commons/components/input/Input';
import { connect } from 'react-redux';

/**
 * HOC (higher-order component)
 * @param {component} WrappedComponent
 */

const withSearch = (WrappedComponent, mapStateToProps, mapDispatchToProps) => {
  class FilterableData extends Component {
    handleSearchChange = e => {
      e.persist();
      this.props.handleSearch(e.target.value);
    }

    render() {
      return (
        <div>
          <div>
            <Input
              searchbar
              type="text"
              onChange={this.handleSearchChange}
              value={this.props.textFilter}
              placeholder="Typing for search"
            />
          </div>
          <WrappedComponent searchTerm={this.props.textFilter} {...this.props}/>
        </div>
      );
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(FilterableData);
}


export default withSearch;