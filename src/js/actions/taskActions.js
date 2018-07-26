import axios from 'axios';
import {ACTIONS} from './actions';
import {url} from '../config';

//TODO catches
export function getTasks(){
  return function(dispatch){
    axios.get(url)
      .then((res) => {
        dispatch({type: ACTIONS.RECIEVE_TASKS, payload: res.data});
      })
      .catch((e) => {
        console.log(e.message);
      })
  }
}
export function addTask(obj){
  return function(dispatch){
    axios.post(url, obj)
      .then((res) => {
        dispatch({type: ACTIONS.ADD_TASK, payload: res.data});
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
}
export function toggleComplete(_id, value){
  return function(dispatch){
    axios.put(url+'/'+_id, {completed: value})
      .then((res) => {
        dispatch({type: ACTIONS.TOGGLE_COMPLETE, payload: {_id: _id, value: value}});
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
}
export function deleteTask(_id){
  return function(dispatch){
    axios.delete(url+'/'+_id)
      .then((res) => {
        dispatch({type: ACTIONS.DELETE_TASK, payload: _id});
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
}