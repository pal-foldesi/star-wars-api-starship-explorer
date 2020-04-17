import React, { Component } from 'react';

import SearchableSortableTable from '../SearchableSortableTable/SearchableSortableTable';
import AppHeader from '../AppHeader/AppHeader';

import './App.css';


class App extends Component {
  render() {
    return (
      <div className="tc">
        <AppHeader />
        <SearchableSortableTable url={'https://swapi.dev/api/starships/'} />
      </div>
    );
  }
}

export default App;
