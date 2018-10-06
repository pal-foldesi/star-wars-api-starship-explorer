import React, { Component } from 'react';

import './MoreButton.css';

export default class MoreButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { isLoading: false };
  }

  render() {
    return (
      this.state.isLoading ?
        <button className="big-button" disabled>Loading...</button>
        :
        this.props.url === null ?
          <span className="ba bw2 border-sw-gold pa2">No more ships available to fetch.</span> :
          <button className="big-button" onClick={this.handleClick}>More...</button>
    );
  }

  handleClick() {
    this.setState({ isLoading: true }, async () => {
      await this.props.fetchShips(this.props.url);
      this.setState({ isLoading: false });
    });
  }
}
