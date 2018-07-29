import reducer from '../reducers/tasksReducer';
import {ACTIONS} from '../actions/actions';

const initialState = {data:[], loading: false, message: ''};
const task = {_id: '2E', completed: false, name: 'name', due: '2018-07-11', description: 'test'};
describe('tasks reducer', () => {
  it('shoud return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({data: [], loading: false, message: ''});
  });

  it('should ADD_TODO', () => {
    expect(reducer(initialState,{type: ACTIONS.ADD_TASK, payload: task}))
    .toEqual({data: [task], loading: false, message: ''});
  });

  it('should RECIEVE_TASKS', () => {
    let task2 = Object.assign({}, task, {name: 'test2'});
    expect(reducer(initialState, {type: ACTIONS.RECIEVE_TASKS, payload: [task,task2]}))
    .toEqual({data: [task,task2], loading: false, message: ''});
  });

  it('should DELETE_TASK', () => {
    expect(reducer({data:[task]}, {type: ACTIONS.DELETE_TASK, payload: task._id}))
    .toEqual({data: []});
  });
  
  it('should TOGGLE_COMPLETE', () => {
    const uncompletedTask = Object.assign({}, task, {completed: true});
    expect(reducer({data:[task]}, {type: ACTIONS.TOGGLE_COMPLETE, payload: {_id: task._id, value: true}}))
    .toEqual({data: [uncompletedTask]});
    expect(reducer({data:[uncompletedTask]}, {type: ACTIONS.TOGGLE_COMPLETE, payload: {_id: task._id, value: false}}))
    .toEqual({data: [task]});
  });
  it('should SET_LOADING', () => {
    expect(reducer(initialState, {type: ACTIONS.SET_LOADING, payload: true})).toEqual({data: [], loading: true, message: ''});
  });
  it('should SET_MESSAGE', () => {
    expect(reducer(initialState, {type: ACTIONS.SET_MESSAGE, payload: 'test'})).toEqual({data: [], loading: false, message: 'test'});
  });
});