import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

import './TableHeader.css';

library.add(faChevronUp);
library.add(faChevronDown);

export default class TableHeader extends Component {
  render() {
    const icon = this.props.sortBy === this.props.name ?
      (this.props.reverse ? <FontAwesomeIcon icon="chevron-down" transform="right-10" /> : <FontAwesomeIcon icon="chevron-up" transform="right-10"/>) : '';
    return (
      <th className="header-text" name={this.props.name} onClick={this.props.onClick}>
        {this.props.text}
        {icon}
      </th>
    );
  }
}
