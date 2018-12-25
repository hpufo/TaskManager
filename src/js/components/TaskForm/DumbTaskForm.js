import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import styles from './TaskForm.scss';

/**
 * @description renders the task form. 
 * @param {object} props 
 */
export const DumbTaskForm = (props) => {
  let {name,due,description} = props.form;
    return (
      <form className={styles.taskForm} onSubmit={props.handleSubmit}>
        <div className={styles.taskName}>
          <label className={styles.formLabel}>Task Name:</label>
          <input 
            type='text' 
            name='name'
            className={styles.name}
            value={name} 
            onChange={props.handleChange}
          />
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
        <textarea 
          name='description'
          className={styles.description} 
          onChange={props.handleChange} 
          value={description}
        ></textarea>
        <input type='submit' className={styles.button} value='Add Task' />
      </form>
    );
}
/** 
* @description Schema this component is expecting
*/
DumbTaskForm.propTypes = {
  form: PropTypes.shape({
    name: PropTypes.string.isRequired,
    due: PropTypes.any.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDate: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};