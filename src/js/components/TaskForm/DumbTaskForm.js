import React from 'react';
import DatePicker from 'react-datepicker';
import styles from './TaskForm.scss';
//TODO PropTypes
export const DumbTaskForm = (props) => {
  let {name,due,description} = props.form;
    return (
      <form className={styles.taskForm} onSubmit={props.handleSubmit}>
        <div className={styles.taskName}>
          <label className={styles.formLabel}>Task Name:</label>
          <input type='text' className={styles.name} value={name} onChange={props.handleNameChange}/>
        </div>
        <div className={styles.dueDate}>
          <label className={styles.formLabel}>Due Date:</label>
          <DatePicker
            selected={due}
            onChange={props.handleDate}
            className={styles.date}
            dateFormat='MM/DD/YYYY'
          />
        </div>
        <label className={styles.formLabel}>Description:</label>
        <textarea className={styles.description} onChange={props.handleDescriptionChange} value={description}></textarea>
        <input type='submit' className={styles.button} value='Add Task' />
      </form>
    );
}