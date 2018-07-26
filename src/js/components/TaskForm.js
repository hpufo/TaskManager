import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import {addTask} from '../actions/taskActions';
import styles from '../../scss/TaskForm.scss';

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
    let {name,due,description} = this.state;
    return (
      <form className={styles.taskForm} onSubmit={this.handleSubmit}>
        <div className={styles.taskName}>
          <label className={styles.formLabel}>Task Name:</label>
          <input type='text' className={styles.name} value={name} onChange={this.handleNameChange}/>
        </div>
        <div className={styles.dueDate}>
          <label className={styles.formLabel}>Due Date:</label>
          <DatePicker
            selected={due}
            onChange={this.handleDate}
            className={styles.date}
            dateFormat='MM/DD/YYYY'
          />
        </div>
        <label className={styles.formLabel}>Description:</label>
        <textarea className={styles.description} onChange={this.handleDescriptionChange} value={description}></textarea>
        <input type='submit' className={styles.button} value='Add Task' />
      </form>
    );
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
