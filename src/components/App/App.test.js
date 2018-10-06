import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import AppHeader from '../AppHeader/AppHeader';
import SearchableSortableTable from '../SearchableSortableTable/SearchableSortableTable';

describe('the component', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('renders a wrapping div', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div.tc')).toHaveLength(1);
  });

  it('renders one <AppHeader /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(AppHeader)).toHaveLength(1);
  });

  it('renders one <SearchableSortableTable /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(SearchableSortableTable)).toHaveLength(1);
  });
});

describe('the wrapping div of the component', () => {
  it('contains the <AppHeader /> component', () => {
    const wrapper = shallow(<App />);
    const wrappingDiv = wrapper.find('div.tc').first();
    expect(wrappingDiv.containsMatchingElement(<AppHeader />)).toBe(true);
  });

  it('contains the <SearchableSortableTable /> component', () => {
    const wrapper = shallow(<App />);
    const wrappingDiv = wrapper.find('div.tc').first();
    expect(wrappingDiv.containsMatchingElement(<SearchableSortableTable />)).toBe(true);
  });
});