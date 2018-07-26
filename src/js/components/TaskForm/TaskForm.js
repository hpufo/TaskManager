import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {addTask} from '../../actions/taskActions';
import {DumbTaskForm} from './DumbTaskForm';

const initialState = {
  name: '',
  due: moment(),
  description: ''
};

class TaskForm extends Component {
  constructor (props) {
    super(props);
    this.state = initialState;
  }
  handleSubmit = (event) => {
    event.preventDefault();
    let {name,due,description} = this.state;
    let data = {
      completed: false,
      name: name,
      due: due,
      description: description
    };
    
    this.props.addTask(data);
  }
  handleDate = (date) => {
    this.setState({
      due: date
    });
  }
  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    });
  }
  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value
    });
  }
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
function mapDispatchToProps(dispatch){
  return{
    addTask: (obj) => {dispatch(addTask(obj))}
  }
}
function mapStateToProps(state){
  return {
    tasks: state.tasks.data
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);
