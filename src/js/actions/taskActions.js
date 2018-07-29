import axios from 'axios';
import {ACTIONS} from './actions';
import {url} from '../config';

//TODO catches
export function getTasks(){
  return function(dispatch){
    dispatch(setLoading(true));
    axios.get(url)
      .then((res) => {
        dispatch({type: ACTIONS.RECIEVE_TASKS, payload: res.data});
        dispatch(setLoading(false));
        dispatch(setMessage('Something went wrong with the API check the console for a detailed message'));
      })
      .catch((e) => {
        dispatch(setLoading(false));
        dispatch(setMessage('Something went wrong with the API check the console for a detailed message'));
        console.log(e.message);
      })
  }
}
export function addTask(obj){
  return function(dispatch){
    axios.post(url, obj)
      .then((res) => {
        dispatch({type: ACTIONS.ADD_TASK, payload: res.data});
        dispatch(setMessage(''));
      })
      .catch((e) => {
        dispatch(setMessage('Failed to add task'));
        console.log(e.message);
      });
  }
}
export function toggleComplete(_id, value){
  return function(dispatch){
    axios.put(url+'/'+_id, {completed: value})
      .then((res) => {
        dispatch({type: ACTIONS.TOGGLE_COMPLETE, payload: {_id: _id, value: value}});
        dispatch(setMessage(''));
      })
      .catch((e) => {
        dispatch(setMessage('Failed to mark task'));
        console.log(e.message);
      });
  }
}
export function deleteTask(_id){
  return function(dispatch){
    axios.delete(url+'/'+_id)
      .then((res) => {
        dispatch({type: ACTIONS.DELETE_TASK, payload: _id});
        dispatch(setMessage(''));
      })
      .catch((e) => {
        dispatch(setMessage('Failed to delete task'));
        console.log(e.message);
      });
  }
}
export function setLoading(bool){
  return {type: ACTIONS.SET_LOADING, payload: bool}
}
export function setMessage(msg){
  return {type: ACTIONS.SET_MESSAGE, payload: msg}
}