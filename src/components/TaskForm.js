import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import styles from '../scss/TaskForm.scss';
import {url} from '../config';

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
      due: due.format('YYYY-MM-DD'),
      description: description
    };
    
    axios.post(url, data)
      .then((res) => {
        //Todo: output message
        this.setState(initialState);
      })
      .catch(e => console.log(e));
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

export default TaskForm;
