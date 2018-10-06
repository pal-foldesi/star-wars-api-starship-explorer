import React from 'react';
import { shallow } from 'enzyme';
import Row from '../Row/Row';

const ship = { name: 'Bucephalus', manufacturer: 'Cool Shipyards', cost_in_credits: 99999999, starship_class: 'Battle Barge' };

describe('the component', () => {
  it('renders without crashing', () => {
    shallow(<Row ship={ship} />);
  });

  it('receives its props correctly', () => {
    const wrapper = shallow(<Row ship={ship} />);
    expect(wrapper.instance().props['ship']).toEqual(ship);
  });

  it('renders a wrapping tr', () => {
    const wrapper = shallow(<Row ship={ship} />);
    expect(wrapper.find('tr')).toHaveLength(1);
  });

  it('renders four table cells', () => {
    const wrapper = shallow(<Row ship={ship} />);
    expect(wrapper.find('td')).toHaveLength(4);
  });
});

describe('the wrapping tr', () => {
  it('contains the four table cells', () => {
    const wrapper = shallow(<Row ship={ship} />);
    const tr = wrapper.find('tr');
    expect(tr.find('td')).toHaveLength(4);
  });
});