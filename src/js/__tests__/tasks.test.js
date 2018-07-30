import React from 'react'
import { shallow } from 'enzyme'
import {DumbTask} from '../components/Task/DumbTask';

/**
 * @description helper function for tests
 * @param {number} difference the number of days between today and the due date
 * @returns returns an object containing props and the wrapper
 */
function setup(difference = 0){
  const props = {
    deleteItem: jest.fn(),
    toggleDescription: jest.fn(),
    handleCheckBox: jest.fn(),
    task: {
            _id: '2E',
            completed: false,
            name: 'name',
            due: '2018-07-11',
            description: 'test',
            difference: difference,
            showDescription: false
          }
  }
  const wrapper = shallow(<DumbTask {...props}/>);
  return {props, wrapper};
}

describe('Task',() => {
  it('renders without crashing',() => {
    const {wrapper} = setup();
    expect(wrapper.length).toBe(1);
  });
  it('shows the task is past due',() => {
    const {wrapper} = setup(-1);
    expect(wrapper.find('.pastDue').exists()).toBe(true);
  });
  it('shows the task is due today',() => {
    const {wrapper} = setup();
    expect(wrapper.find('.dueToday').exists()).toBe(true);
  });
  it('shows the task is due tomorrow or later',() => {
    const {wrapper} = setup(1);
    expect(wrapper.find('.dueLater').exists()).toBe(true);
  });
});