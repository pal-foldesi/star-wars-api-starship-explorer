import React from 'react';
import { shallow } from 'enzyme';
import AppHeader from '../AppHeader/AppHeader';

describe('the component', () => {
  it('renders without crashing', () => {
    shallow(<AppHeader />);
  });

  it('renders a wrapping header', () => {
    const wrapper = shallow(<AppHeader />);
    expect(wrapper.find('header.header')).toHaveLength(1);
  });

  it('renders two images', () => {
    const wrapper = shallow(<AppHeader />);
    expect(wrapper.find('img')).toHaveLength(2);
  });

  it('renders one h1 element', () => {
    const wrapper = shallow(<AppHeader />);
    expect(wrapper.find('h1.title')).toHaveLength(1);
  });
});

describe('the wrapping header', () => {
  it('contains the two images', () => {
    const wrapper = shallow(<AppHeader />);
    expect(wrapper.find('img')).toHaveLength(2);
  });

  it('contains the h1 element', () => {
    const wrapper = shallow(<AppHeader />);
    expect(wrapper.find('h1.title')).toHaveLength(1);
  });
});

describe('the rendered h1 element', () => {
  it('has the right innerText', () => {
    const wrapper = shallow(<AppHeader />);
    expect(wrapper.find('.title').text()).toBe('Star Wars Starship Explorer');
  });
});