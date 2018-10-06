import React from 'react';
import { shallow } from 'enzyme';
import Table from '../Table/Table';
import TableHeader from '../TableHeader/TableHeader';
import Row from '../Row/Row';

import mockShips from '../../mocks/mockShips';
import mapShip from '../../util';

const mappedShips = mockShips['results'].map(mapShip);

describe('the component', () => {
  it('renders without crashing', () => {
    shallow(<Table />);
  });

  it('renders a text when there are no ships', () => {
    const wrapper = shallow(<Table />);
    expect(wrapper.find('div').text()).toEqual('No ships available.');
  });

  it('renders a table when there are ships available', () => {
    const wrapper = shallow(<Table ships={mappedShips}/>);
    expect(wrapper.find('table')).toHaveLength(1);
  });
});

describe('the table', () => {
  it('contains a thead element', () => {
    const wrapper = shallow(<Table ships={mappedShips}/>);
    const table = wrapper.find('table');
    const thead = table.find('thead');
    expect(thead).toHaveLength(1);
  });

  it('contains a tbody element', () => {
    const wrapper = shallow(<Table ships={mappedShips}/>);
    const table = wrapper.find('table');
    const tbody = table.find('tbody');
    expect(tbody).toHaveLength(1);
  });
});

describe('the thead element', () => {
  it('contains a tr element', () => {
    const wrapper = shallow(<Table ships={mappedShips}/>);
    const table = wrapper.find('table');
    const thead = table.find('thead');
    const tr = thead.find('tr');
    expect(tr).toHaveLength(1);
  });

  it('contains a tr element that contains TableHeader components', () => {
    const wrapper = shallow(<Table ships={mappedShips}/>);
    const table = wrapper.find('table');
    const thead = table.find('thead');
    const tr = thead.find('tr');
    const tableHeaders = tr.find(TableHeader);
    expect(tableHeaders).toHaveLength(4);
  });
});

describe('the tbody element', () => {
  it('contains Row components', () => {
    const wrapper = shallow(<Table ships={mappedShips}/>);
    const table = wrapper.find('table');
    const tbody = table.find('tbody');
    const rows = tbody.find(Row);
    expect(rows).toHaveLength(mappedShips.length);
  });
});