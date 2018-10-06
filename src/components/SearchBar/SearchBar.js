import React, { Component } from 'react';

export default class SearchBar extends Component {
  render() {
    return (
      <input className="mr5 pa2 mb5" type="text" placeholder="Search..." onChange={this.props.setSearchExpression} />
    );
  }
}