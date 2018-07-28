import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import {DumbTaskList} from '../components/TaskList/DumbTaskList';
import Task from '../components/Task/Task';

const defaultFilters = {
  filterDueToday: false,
  filterDueLater: false,
  filterPastDue: false,
  filterCompleted: false
};

function setup(filters = defaultFilters){
  const props = {
    filters: filters,
    data: [{
      completed: false,
      name: 'name',
      due: '2017-07-12',
      description: 'description'
    },
    {
      completed: true,
      name: 'name',
      due: moment().startOf('day'),
      description: 'description'
    },
    {
      completed: false,
      name: 'name',
      due: moment().startOf('day').add(1,'days'),
      description: 'description'
    },
    {
      completed: false,
      name: 'name',
      due: moment().startOf('day').add(2,'days'),
      description: 'description'
    }],
    dueTodayToggle: jest.fn(),
    dueLaterToggle: jest.fn(),
    pastDueToggle: jest.fn(),
    completedToggle: jest.fn(),
    clearFilters: jest.fn(),
  }
  const wrapper = shallow(<DumbTaskList {...props}/>);
  return {props, wrapper};
}

describe('TaskList',() => {
  it('renders without crashing',() => {
    const {wrapper} = setup();
    expect(wrapper.length).toBe(1);
    //expect(wrapper.find('.taskList').exists()).toBe(true);
  });
  it('renders all the tasks',() => {
    const {wrapper} = setup();
    expect(wrapper.find(Task).length).toBe(4);
  });
  it('renders completed tasks',() => {
    let filters = Object.assign({},defaultFilters,{filterCompleted: true});
    const {wrapper} = setup(filters);
    expect(wrapper.find(Task).length).toBe(1);
  });
  it('renders past due tasks',() => {
    let filters = Object.assign({},defaultFilters,{filterPastDue: true});
    const {wrapper} = setup(filters);
    expect(wrapper.find(Task).length).toBe(1);
  });
  it('renders today\'s tasks',() => {
    let filters = Object.assign({},defaultFilters,{filterDueToday: true});
    const {wrapper} = setup(filters);
    expect(wrapper.find(Task).length).toBe(1);
  });
  it('renders tomorrow\'s tasks',() => {
    let filters = Object.assign({},defaultFilters,{filterDueLater: true});
    const {wrapper} = setup(filters);
    expect(wrapper.find(Task).length).toBe(1);
  });
  it('renders today\'s and tomorrow\'s tasks',() => {
    let filters = Object.assign({},defaultFilters,{filterDueToday: true, filterDueLater: true});
    const {wrapper} = setup(filters);
    expect(wrapper.find(Task).length).toBe(2);
  });
});