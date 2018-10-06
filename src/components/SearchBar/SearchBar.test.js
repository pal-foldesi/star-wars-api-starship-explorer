import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from './SearchBar';

describe('the component', () => {
  it('renders without crashing', () => {
    shallow(<SearchBar />);
  });

  it('receives its props correctly', () => {
    const wrapper = shallow(<SearchBar onChange='prop' />);
    expect(wrapper.instance().props['onChange']).toEqual('prop');
  });

  it('runs its event handler when a Change event is triggered', () => {
    const func = jest.fn();
    const wrapper = shallow(<SearchBar setSearchExpression={func} />);
    wrapper.find('input').simulate('change');
    expect(func).toHaveBeenCalled();
  });
});
