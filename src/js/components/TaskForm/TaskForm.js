import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {addTask} from '../../actions/taskActions';
import {DumbTaskForm} from './DumbTaskForm';

//Saving the initial state
const initialState = {
  name: '',
  due: moment(),
  description: ''
};
/**
 * @description form for adding a new task
 */
class TaskForm extends Component {
  /**
   * @description sets the initial state of the form
   * @param {object} props 
   */
  constructor (props) {
    super(props);
    this.state = initialState;
  }
  /**
   * @description sends the action to create a new task
   * @param {object} event event from the form submit
   */
  handleSubmit = (event) => {
    event.preventDefault();                   //Stops the form from reloading
    let {name,due,description} = this.state;  //Destructs the state into these vars
    let data = {                              //Creates the object to send
      completed: false,
      name: name,
      due: due,
      description: description
    };
    
    this.props.addTask(data);                //Dispatches the action to add the task
    this.setState(initialState);              //Clear the form
  }
  /**
   * @description change the due state to match the user input
   * @param {*} date the date
   */
  handleDate = (date) => {
    this.setState({
      due: date
    });
  }
  /**
   * @description change the name state to match the user input
   * @param {object} event the event from the onchange
   */
  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    });
  }
  /**
   * @description change the description to match the user input
   * @param {object} event the event from the onchange
   */
  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value
    });
  }
  /**
   * Passes the props to the Dumb Component to render
   */
  render() {
    return <DumbTaskForm 
              form={this.state}
              handleSubmit={this.handleSubmit}
              handleDate={this.handleDate}
              handleNameChange={this.handleNameChange}
              handleDescriptionChange={this.handleDescriptionChange}
            />;
  }
}
/**
* @description sends an action to delete a task
*/
function mapDispatchToProps(dispatch){
  return{
    addTask: (obj) => {dispatch(addTask(obj))}
  }
}
/**
* @description passes props to the dumb component
*/
function mapStateToProps(state){
  return {
    tasks: state.tasks.data
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);
