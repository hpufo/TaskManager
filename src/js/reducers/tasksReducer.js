import {ACTIONS} from '../actions/actions';

const initialState = {data: []};

export default function tasksReducer(state = initialState, action){
  switch(action.type){
    case ACTIONS.RECIEVE_TASKS:{
      return Object.assign({},state,{
        data: [
          ...state.data,
          ...action.payload
        ]
      });
    }
    case ACTIONS.ADD_TASK:{
      return Object.assign({},state,{
        data: [
          ...state.data,
          action.payload
        ]
      });
    }
    case ACTIONS.COMPLETE_TASK:{
      return Object.assign({},state,{
        data: state.data.map((task) => {
          console.log('her')
          if(task._id === action.payload._id){
            return Object.assign({}, task, {
              completed: action.payload.value
            });
          }
          return task;
        })
      });
    }
    case ACTIONS.DELETE_TASK:{
      return Object.assign({}, state,{
        data: state.data.filter((task) => task._id !== action.payload)
      });
    }
    default:
      return state;
  }
}