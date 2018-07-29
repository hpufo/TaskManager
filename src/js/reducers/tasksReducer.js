import {ACTIONS} from '../actions/actions';

const initialState = {
  loading: false,
  message: '',
  data: []
};
/**
 * @description updates the shared state in an immutable fashion
 * @param {object} state the shared state
 * @param {object} action the actions from the dispatchers 
 * @returns the new state
 */
export default function tasksReducer(state = initialState, action){
  switch(action.type){
    case ACTIONS.RECIEVE_TASKS:{
      return Object.assign({},state,{   //updates the state object
        data: [                         //combinds the state array with the actions array
          ...state.data,
          ...action.payload
        ]
      });
    }
    case ACTIONS.ADD_TASK:{
      return Object.assign({},state,{   //updates the state
        data: [                         //add new task to the state array
          ...state.data,
          action.payload
        ]
      });
    }
    case ACTIONS.TOGGLE_COMPLETE:{
      return Object.assign({},state,{           //update the state
        data: state.data.map((task) => {        //loop through the state data array
          if(task._id === action.payload._id){  //find the matching id
            return Object.assign({}, task, {    //update the task with the matching id
              completed: action.payload.value   //updating completed
            });
          }
          return task;                          //returning the tasks not matching the id
        })
      });
    }
    case ACTIONS.DELETE_TASK:{
      return Object.assign({}, state,{                                  //updating the state
        data: state.data.filter((task) => task._id !== action.payload)  //by filtering out the task matching the id
      });
    }
    case ACTIONS.SET_LOADING:{
      return Object.assign({}, state, {loading: action.payload});     //update loading
    }
    case ACTIONS.SET_MESSAGE:{
      return Object.assign({}, state, {message: action.payload});     //update the message
    }
    default:
      return state;
  }
}