import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchableSortableTable from '../SearchableSortableTable/SearchableSortableTable';
import fetcher200 from '../../mocks/mock-fetch-200';
import fetcher404 from '../../mocks/mock-fetch-404';
import fetcherError from '../../mocks/mock-fetch-error';
import mockShips from '../../mocks/mockShips';
import mapShip from '../../util';

// http://engineering.pivotal.io/post/react-integration-tests-with-enzyme/#waiting-for-asynchronous-events
// https://github.com/kentcdodds/react-testing-library/issues/11#issuecomment-375118702
const asyncFlush = () => new Promise(resolve => setTimeout(resolve, 0));

const mappedShips = mockShips['results'].map(mapShip);

describe('the component', () => {
  it('renders without crashing', () => {
    shallow(<SearchableSortableTable />);
  });

  it('has correct initial state', () => {
    const table = shallow(<SearchableSortableTable />);
    expect(table.state()).toEqual({
      ships: [],
      filteredShips: [],
      searchExpression: '',
      reverseSort: false
    });
  });

  it('has its state set correctly upon a 200 response', async () => {
    const table = shallow(<SearchableSortableTable />);
    const instance = table.instance();

    window.fetch = fetcher200;

    jest.spyOn(instance, 'filterShips');
    jest.spyOn(instance, 'sortShips');

    await table.instance().fetchShips('https://swapi.co/api/starships/');

    expect(table.state()['ships']).toEqual(mappedShips);
    expect(table.state()['nextUrl']).toEqual('https://swapi.co/api/starships/?page=2');

    expect(instance.sortShips).toHaveBeenCalledTimes(1);
  });

  it('has its state set correctly upon a non-200 response', async () => {
    const table = shallow(<SearchableSortableTable />);
    const instance = table.instance();

    window.fetch = fetcher404;

    jest.spyOn(instance, 'filterShips');
    jest.spyOn(instance, 'sortShips');

    await table.instance().fetchShips('https://swapi.co/api/starships/');

    expect(table.state()['error']).toEqual('404 Not found');
    expect(instance.sortShips).toHaveBeenCalledTimes(0);
  });

  it('has its state set correctly upon a NetworkError', async () => {
    const table = shallow(<SearchableSortableTable />);
    const instance = table.instance();

    window.fetch = fetcherError;

    jest.spyOn(instance, 'filterShips');
    jest.spyOn(instance, 'sortShips');

    await table.instance().fetchShips('https://swapi.co/api/starships/');

    expect(table.state()['error']).toEqual('TypeError NetworkError');
    expect(instance.sortShips).toHaveBeenCalledTimes(0);
  });
});

describe('the component', () => {
  it('loads ships', async () => {
    window.fetch = fetcher200;
    const wrapper = mount(<SearchableSortableTable />);
    await asyncFlush();
    wrapper.update();
    const rows = wrapper.find('tbody tr');
    expect(rows.length).toEqual(mappedShips.length);
    for (let i = 0; i < rows.length; i++) {
      const cells = rows.at(i).find('td');
      const name = cells.at(0).text();
      const manufacturer = cells.at(1).text();
      const cost_in_credits = cells.at(2).text();
      const starship_class = cells.at(3).text();
      const mockName = mappedShips[i]['name'];
      const mockManufacturer = mappedShips[i]['manufacturer'];
      const mockCost_in_credits = mappedShips[i]['cost_in_credits'];
      const mockStarship_class = mappedShips[i]['starship_class'];
      expect(name).toEqual(mockName);
      expect(manufacturer).toEqual(mockManufacturer);
      expect(cost_in_credits).toEqual(mockCost_in_credits);
      expect(starship_class).toEqual(mockStarship_class);
    }
  });

  it('updates the ships and renders them when something is typed in the search box', async () => {
    window.fetch = fetcher200;
    const wrapper = mount(<SearchableSortableTable />);
    await asyncFlush();
    wrapper.update();
    const searchBox = wrapper.find('input');
    expect(searchBox).toHaveLength(1);
    searchBox.instance().value = 'ua';
    searchBox.simulate('change');
    const rows = wrapper.find('tbody tr');
    expect(rows.length).toBe(1);
    const cells = rows.at(0).children();
    const name = cells.at(0).text();
    const manufacturer = cells.at(1).text();
    const cost_in_credits = cells.at(2).text();
    const starship_class = cells.at(3).text();
    const mockName = mappedShips[0]['name'];
    const mockManufacturer = mappedShips[0]['manufacturer'];
    const mockCost_in_credits = mappedShips[0]['cost_in_credits'];
    const mockStarship_class = mappedShips[0]['starship_class'];
    expect(name).toEqual(mockName);
    expect(manufacturer).toEqual(mockManufacturer);
    expect(cost_in_credits).toEqual(mockCost_in_credits);
    expect(starship_class).toEqual(mockStarship_class);
  });

  it('updates the ships and sorts them when a table header is clicked', async () => {
    window.fetch = fetcher200;
    const wrapper = mount(<SearchableSortableTable />);
    await asyncFlush();
    wrapper.update();
    //For each table header, click it, check the sorting of the ships, then click it again to reverse the sorting, and check the sorting of the ships again
    //Do this for all four table headers
    //The sorting must be checked manually :)
    const headers = wrapper.find('th');

    headers.at(0).simulate('click');
    let name1, name2, name3;
    const rowsByNameAscending = wrapper.find('tbody tr');
    name1 = rowsByNameAscending.at(0).find('td').at(0).text();
    name2 = rowsByNameAscending.at(1).find('td').at(0).text();
    name3 = rowsByNameAscending.at(2).find('td').at(0).text();
    expect(name1).toEqual('Death Star');
    expect(name2).toEqual('Executor');
    expect(name3).toEqual('Sentinel-class landing craft');

    headers.at(0).simulate('click');
    const rowsByNameDescending = wrapper.find('tbody tr');
    name1 = rowsByNameDescending.at(0).find('td').at(0).text();
    name2 = rowsByNameDescending.at(1).find('td').at(0).text();
    name3 = rowsByNameDescending.at(2).find('td').at(0).text();
    expect(name1).toEqual('Sentinel-class landing craft');
    expect(name2).toEqual('Executor');
    expect(name3).toEqual('Death Star');

    headers.at(1).simulate('click');
    let manufacturer1, manufacturer2, manufacturer3;
    const rowsByManufacturerAscending = wrapper.find('tbody tr');
    manufacturer1 = rowsByManufacturerAscending.at(0).find('td').at(1).text();
    manufacturer2 = rowsByManufacturerAscending.at(1).find('td').at(1).text();
    manufacturer3 = rowsByManufacturerAscending.at(2).find('td').at(1).text();
    expect(manufacturer1).toEqual("Imperial Department of Military Research, Sienar Fleet Systems");
    expect(manufacturer2).toEqual("Kuat Drive Yards, Fondor Shipyards");
    expect(manufacturer3).toEqual("Sienar Fleet Systems, Cyngus Spaceworks");

    headers.at(1).simulate('click');
    const rowsByManufacturerDescending = wrapper.find('tbody tr');
    manufacturer1 = rowsByManufacturerDescending.at(0).find('td').at(1).text();
    manufacturer2 = rowsByManufacturerDescending.at(1).find('td').at(1).text();
    manufacturer3 = rowsByManufacturerDescending.at(2).find('td').at(1).text();
    expect(manufacturer1).toEqual("Sienar Fleet Systems, Cyngus Spaceworks");
    expect(manufacturer2).toEqual("Kuat Drive Yards, Fondor Shipyards");
    expect(manufacturer3).toEqual("Imperial Department of Military Research, Sienar Fleet Systems");

    headers.at(2).simulate('click');
    let cost1, cost2, cost3;
    const rowsByCostAscending = wrapper.find('tbody tr');
    cost1 = rowsByCostAscending.at(0).find('td').at(2).text();
    cost2 = rowsByCostAscending.at(1).find('td').at(2).text();
    cost3 = rowsByCostAscending.at(2).find('td').at(2).text();
    expect(cost1).toEqual("240000"); 
    expect(cost2).toEqual("1143350000");
    expect(cost3).toEqual("1000000000000");

    headers.at(2).simulate('click');
    const rowsByCostDescending = wrapper.find('tbody tr');
    cost1 = rowsByCostDescending.at(0).find('td').at(2).text();
    cost2 = rowsByCostDescending.at(1).find('td').at(2).text();
    cost3 = rowsByCostDescending.at(2).find('td').at(2).text();
    expect(cost1).toEqual("1000000000000");
    expect(cost2).toEqual("1143350000");
    expect(cost3).toEqual("240000"); 

    headers.at(3).simulate('click');
    let class1, class2, class3;
    const rowsByClassAscending = wrapper.find('tbody tr');
    class1 = rowsByClassAscending.at(0).find('td').at(3).text();
    class2 = rowsByClassAscending.at(1).find('td').at(3).text();
    class3 = rowsByClassAscending.at(2).find('td').at(3).text();
    expect(class1).toEqual("Deep Space Mobile Battlestation"); 
    expect(class2).toEqual("landing craft");
    expect(class3).toEqual("Star dreadnought"); 

    headers.at(3).simulate('click');
    const rowsByClassDescending = wrapper.find('tbody tr');
    class1 = rowsByClassDescending.at(0).find('td').at(3).text();
    class2 = rowsByClassDescending.at(1).find('td').at(3).text();
    class3 = rowsByClassDescending.at(2).find('td').at(3).text();
    expect(class1).toEqual("Star dreadnought");
    expect(class2).toEqual("landing craft");
    expect(class3).toEqual("Deep Space Mobile Battlestation");
  });
});