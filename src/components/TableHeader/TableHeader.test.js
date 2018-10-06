import React from 'react';
import { shallow } from 'enzyme';
import TableHeader from './TableHeader';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronUp);
library.add(faChevronDown);

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

describe('the component', () => {
  it('renders without crashing', () => {
    shallow(<TableHeader />);
  });

  it('contains a th element', () => {
    const wrapper = shallow(<TableHeader />);
    expect(wrapper.find('th')).toHaveLength(1);
  });

  it('receives its props correctly', () => {
    const wrapper = shallow(<TableHeader text='test1' name='test2' onClick='test3' sortBy='test4' reverse='test5' />);
    expect(wrapper.instance().props).toEqual({
      text: 'test1',
      name: 'test2',
      onClick: 'test3',
      sortBy: 'test4',
      reverse: 'test5'
    });
  });

  it('runs its event handler when a click event is triggered', () => {
    const func = jest.fn();
    const wrapper = shallow(<TableHeader onClick={func} />);
    wrapper.find('th').simulate('click');
    expect(func).toHaveBeenCalled();
  });

  it('renders a chevron-up icon when its sortBy and name props contain the same value and prop reverse is false', () => {
    const wrapper = shallow(<TableHeader sortBy='test' name='test' reverse={false} />);
    expect(wrapper.containsMatchingElement(<FontAwesomeIcon />)).toBe(true);
    const faIconComponent = wrapper.find(FontAwesomeIcon);
    expect(faIconComponent.props()['icon']).toEqual('chevron-up');
  });

  it('renders a chevron-down icon when its sortBy and name props contain the same value and prop reverse is true', () => {
    const wrapper = shallow(<TableHeader sortBy='test' name='test' reverse={true} />);
    expect(wrapper.containsMatchingElement(<FontAwesomeIcon />)).toBe(true);
    const faIconComponent = wrapper.find(FontAwesomeIcon);
    expect(faIconComponent.props()['icon']).toEqual('chevron-down');
  });
});
