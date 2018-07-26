import React, { Component } from 'react';
import { connect } from 'react-redux';
import {deleteTask, toggleComplete} from '../actions/taskActions';
import {DumbTask} from './DumbTask';

class Task extends Component{
  constructor(props){
    super(props);
    this.state ={
      showDescription: false,
    };
  }
  handleCheckBox = (event) => {
    //value will be either ture or false
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.props.dispatch(toggleComplete(this.props.task._id, value));
  }
  toggleDescription = () => {
    this.setState({
      showDescription: !this.state.showDescription
    });
  }
  deleteItem = () => {
    this.props.dispatch(deleteTask(this.props.task._id));
  }
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
/*
function mapStateToProps(state, ownProps){
  return {
    tasks: state.tasks.data.find((task) => task._id === ownProps.task._id)
  };
}//*/
export default connect()(Task);
