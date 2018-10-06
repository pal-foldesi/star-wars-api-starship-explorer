import React, { Component } from 'react';
import './Row.css';

export default class Row extends Component {
  render() {
    const { name, manufacturer, cost_in_credits, starship_class } = this.props.ship;
    return (
      <tr className="row-text">
        <td>{name}</td>
        <td>{manufacturer}</td>
        <td>{cost_in_credits}</td>
        <td>{starship_class}</td>
      </tr>
    );
  }
}

