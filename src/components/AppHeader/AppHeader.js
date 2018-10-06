import React, { Component } from 'react';

import './AppHeader.css';
import aWing from './a-wing.png';

export default class AppHeader extends Component {
  render() {
    return (
      <header className="header">
        <img src={aWing} alt="A-Wing starship"/>
        <h1 className="title">Star Wars Starship Explorer</h1>
        <img src={aWing} alt="A-Wing starship" className="flip"/>
      </header>
    )
  }
}