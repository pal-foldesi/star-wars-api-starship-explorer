import React from 'react';
import { shallow } from 'enzyme';
import MoreButton from '../MoreButton/MoreButton';

const fetchShips = (url) => {
  setTimeout(() => {
    return new Promise((resolve, reject) => {
      process.nextTick(() => resolve(new MockResponse(undefined, 200)));
    });
  }, 3000);
}

describe('the component', () => {
  it('renders without crashing', () => {
    shallow(<MoreButton />);
  });

  it('renders a span when a null url prop was passed in', () => {
    const wrapper = shallow(<MoreButton url={null}/>);
    const span = wrapper.find('span');
    expect(span).toHaveLength(1);
    expect(span.text()).toEqual('No more ships available to fetch.');
  });

  it('renders a More... button when an url prop was passed in', () => {
    const wrapper = shallow(<MoreButton url='test' />);
    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual('More...');
  });

  it('calls the proper event handler when the More... button is clicked', () => {
    const func = jest.fn();
    const wrapper = shallow(<MoreButton url='test' fetchShips={func} />);
    let button = wrapper.find('button');
    button.simulate('click');
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('sets the right state when the More... button is clicked', () => {
    const wrapper = shallow(<MoreButton url='test' fetchShips={fetchShips} />);
    let button = wrapper.find('button');

    button.simulate('click');

    expect(wrapper.state()['isLoading']).toBe(true);
  });

  it('turns the More... button into a Loading... button when loading data', () => {
    const wrapper = shallow(<MoreButton url='test' fetchShips={fetchShips} />);
    let button = wrapper.find('button');

    button.simulate('click');

    button = wrapper.find('button');

    expect(button.prop('disabled')).toBe(true);
    expect(button.text()).toEqual('Loading...');
  });
});