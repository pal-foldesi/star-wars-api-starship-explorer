import React, { Component } from 'react';

import SearchBar from '../SearchBar/SearchBar';
import Table from '../Table/Table';
import MoreButton from '../MoreButton/MoreButton';

import mapShip from '../../util';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

library.add(faSpinner);

export default class SearchableSortableTable extends Component {
  constructor(props) {
    super(props);
    this.fetchShips = this.fetchShips.bind(this);
    this.filterShips = this.filterShips.bind(this);
    this.setSearchExpression = this.setSearchExpression.bind(this);
    this.setSort = this.setSort.bind(this);
    this.state = {
      ships: [],
      filteredShips: [],
      searchExpression: '',
      reverseSort: false
    };
  }

  render() {
    return (
      this.state.error ?
        <div>
          <div>There was a problem fetching the ships, sorry.</div>
          <div>{this.state.error}</div>
        </div>
        :
        this.state.ships.length === 0 ? <div><h4>Loading...</h4><FontAwesomeIcon icon="spinner" className="fa-pulse fa-3x" /></div> :
          <div>
            <div>
              <SearchBar setSearchExpression={this.setSearchExpression} />
              <MoreButton className="di" url={this.state.nextUrl} fetchShips={this.fetchShips} />
            </div>
            <div>
              <Table ships={this.state.filteredShips} setSort={this.setSort} sortBy={this.state.columnName} reverse={this.state.reverseSort} />
            </div>
          </div>
    );
  }

  componentDidMount() {
    this.fetchShips(this.props.url);
  }

  async fetchShips(url) {
    try {
      const response = await fetch(url);
      if (response['status'] && response['status'] === 200) {
        const json = await response.json();
        const ships = json['results'].map(mapShip);
        this.setState({
          ships: this.state.ships.concat(ships),
          nextUrl: json['next']
        }, () => {
          this.sortShips();
        });
      } else {
        this.setState({ error: `${response['status']} ${response['statusText']}` });
      }
    } catch (error) {
      this.setState({ error: `${error.name} ${error.message}` });
    }
  }

  filterShips() {
    const filteredShips = this.state.ships.filter(ship => {
      return Object.values(ship).some(shipProp => shipProp.includes(this.state['searchExpression']))
    });
    this.setState({
      filteredShips: filteredShips
    });
  }

  setSearchExpression(event) {
    this.setState({ searchExpression: event.target.value },
      () => this.filterShips());
  }

  setSort(event) {
    if (event['currentTarget']['attributes']['name'] && event['currentTarget']['attributes']['name']['nodeValue']) {
      const columnName = event['currentTarget']['attributes']['name']['nodeValue'];
      this.setState({
        columnName,
        reverseSort: columnName === this.state.columnName ? !this.state.reverseSort : false
      }, () => {
        this.sortShips();
      });
    }
  }

  sortShips() {
    if (this.state.columnName) {
      const sortedShips = this.state.ships.sort((a, b) => {
        const propA = a[this.state.columnName];
        const propB = b[this.state.columnName];
        if (!isNaN(+propA)) {
          return this.state.reverseSort ? Number(propB) - Number(propA) : Number(propA) - Number(propB);
        }
        return this.state.reverseSort ? propB.localeCompare(propA) : propA.localeCompare(propB);
      });
      this.setState({ ships: sortedShips });
    }
    this.filterShips();
  }
}