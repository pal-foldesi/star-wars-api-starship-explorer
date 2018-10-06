import React, { Component } from 'react';

import TableHeader from '../TableHeader/TableHeader';
import Row from '../Row/Row';

export default class Table extends Component {
  render() {
    const ships = this.props.ships ?
      <table className="fl w-100 mb3">
        <thead>
          <tr>
            <TableHeader text={'Name'} name='name' onClick={this.props.setSort} sortBy={this.props.sortBy} reverse={this.props.reverse} />
            <TableHeader text={'Manufacturer'} name='manufacturer' onClick={this.props.setSort} sortBy={this.props.sortBy} reverse={this.props.reverse} />
            <TableHeader text={'Cost'} name='cost_in_credits' onClick={this.props.setSort} sortBy={this.props.sortBy} reverse={this.props.reverse} />
            <TableHeader text={'Class'} name='starship_class' onClick={this.props.setSort} sortBy={this.props.sortBy} reverse={this.props.reverse} />
          </tr>
        </thead>
        <tbody>
          {this.props.ships.map((ship, index) => <Row ship={ship} key={index} />)}
        </tbody>
      </table>
      : 'No ships available.'
    return (
      <div>
        {ships}
      </div>
    );
  }
}
