import axios from 'axios';
import {ACTIONS} from './actions';
import {url} from '../config';

/**
 * @description gets the tasks from the api
 * @returns function making an async call to the db and dispatching actions
 */
export function getTasks(){
  return function(dispatch){
    dispatch(setLoading(true));                                     //Dispatch an action to set loading to true
    axios.get(url)                                                  //Makes a get call to the db
      .then((res) => {                                              //On success
        dispatch({type: ACTIONS.RECIEVE_TASKS, payload: res.data}); //dispatch an action to add the task to the state
        dispatch(setLoading(false));                                //dispatch an action to sel loading to false
      })
      .catch((e) => {                                               //On fail
        dispatch(setLoading(false));                                //dispatch an action to set loading to false
        dispatch(setMessage('Something went wrong with the API check the console for a detailed message')); //Inform the user of the error
        console.log(e.message);                                     //Print the error message to the console
      })
  }
}
/**
 * @description add a task to the db and state
 * @param {object} obj the task to add
 * @returns function making the async call and dispatching actions
 */
export function addTask(obj){
  return function(dispatch){
    axios.post(url, obj)                                            //POST call to the db with the obj to add to it
      .then((res) => {                                              //On success
        dispatch({type: ACTIONS.ADD_TASK, payload: res.data});      //dispatch and action to add the task to the state
        dispatch(setMessage(''));                                   //dispatch action to clear any errors
      })
      .catch((e) => {                                               //on error
        dispatch(setMessage('Failed to add task'));                 //dispatch an action to notify the user of the failure
        console.log(e.message);                                     //print error message to the console
      });
  }
}
/**
 * @description toggle complete
 * @param {string} _id id of the task
 * @param {boolean} value is the task complete?
 * @returns function making the async call and dispatching actions
 */
export function toggleComplete(_id, value){
  return function(dispatch){
    axios.put(url+'/'+_id, {completed: value})                                          //path of the task to edit and the completed value
      .then((res) => {                                                                  //on success
        dispatch({type: ACTIONS.TOGGLE_COMPLETE, payload: {_id: _id, value: value}});   //dispatch an action to update the state
        dispatch(setMessage(''));                                                       //dispatch action to clear any errors
      })
      .catch((e) => {                                                                   //on error
        dispatch(setMessage('Failed to mark task'));                                    //dispatch an action to notify the user of the failure
        console.log(e.message);                                                         //print error message to the console
      });
  }
}
/**
 * @description delete a task
 * @param {string} _id id of the task to delete
 * @returns function making the async call and dispatching actions
 */
export function deleteTask(_id){
  return function(dispatch){
    axios.delete(url+'/'+_id)                                   //path of the task to delete
      .then((res) => {                                          //on success
        dispatch({type: ACTIONS.DELETE_TASK, payload: _id});    //dispatch a task to update the state
        dispatch(setMessage(''));                               //dispatch action to clear any errors
      })
      .catch((e) => {                                           //on error
        dispatch(setMessage('Failed to delete task'));          //dispatch an action to notify the user of the failure
        console.log(e.message);                                 //print error message to the console
      });
  }
}
/**
 * @description sets loading
 * @param {boolean} bool is data loading?
 * @returns action object
 */
export function setLoading(bool){
  return {type: ACTIONS.SET_LOADING, payload: bool}
}
/**
 * @description sets the messages
 * @param {string} msg message for the user
 * @returns action object
 */
export function setMessage(msg){
  return {type: ACTIONS.SET_MESSAGE, payload: msg}
}