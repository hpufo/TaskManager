import React, { Component } from 'react';
import { connect } from 'react-redux';
import {deleteTask, toggleComplete} from '../../actions/taskActions';
import {DumbTask} from './DumbTask';

/**
 * @description This is a smart component that handles the state and connects the dumb component to redux
 */
class Task extends Component{
  /**
   * @description contructor that sets the initial state
   * @param {object} props 
   */
  constructor(props){
    super(props);
    this.state ={
      showDescription: false,
    };
  }
  /**
   * @description handles the state of the completed checkbox
   * @param {object} event - event's object
   */
  handleCheckBox = (event) => {
    //value will be either ture or false
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.props.dispatch(toggleComplete(this.props.task._id, value));
  }
  /**
   * @description toggle's the state of the description
   */
  toggleDescription = () => {
    this.setState({
      showDescription: !this.state.showDescription
    });
  }
  /**
   * @description sends an action to delete a task
   */
  deleteItem = () => {
    this.props.dispatch(deleteTask(this.props.task._id));
  }
  /**
   * @description passes props to the dumb component
   */
  render(){
    let task = Object.assign({},this.props.task, this.state);
    return <DumbTask
              task={task}
              deleteItem={this.deleteItem}
              toggleDescription={this.toggleDescription}
              handleCheckBox={this.handleCheckBox}
            />;
  }
}

export default connect()(Task);
