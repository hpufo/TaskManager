import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styles from './Task.scss';

/**
  * @description figures out what className this component should get.
  * @param {number} difference - The amount of days between today and the due date.
  * @returns {string} - the className that this component should have
*/
function getStyle(difference){
  if(difference < 0){
    return 'pastDue';
  }
  else if(difference === 0){
    return 'dueToday';
  }
  else if(difference > 0){
    return 'dueLater';
  }
  return 'task';
}

/** 
* @description This component render's the task with a onClick toggle to show the description
* @param {object} props - Props
* @returns JSX - Returns this task
*/
export const DumbTask = (props) => {
  let {completed,name,due,description,difference} = props.task; //Destruct object into those variables
  return (
  <div className={getStyle(difference)}>
    <div className={styles.top}>
      <div className={styles.checkbox}><input type='checkbox' onChange={props.handleCheckBox} checked={completed}/></div>
      <div className={styles.clickable} onClick={props.toggleDescription}>
        <label className={styles.name}>{name}</label>
        <label className={styles.due}>due: {moment(due).format('MM/DD/YYYY')}</label>
      </div>
      <div className={styles.remove} onClick={props.deleteItem}>X</div>
    </div>
    {props.task.showDescription ? <p className={styles.description}>{description}</p>:<p/>}
  </div>
  );
}

/** 
* @description Schema this component is expecting
*/
DumbTask.propTypes = {
  task: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    due: PropTypes.any.isRequired,
    description: PropTypes.string.isRequired,
    difference: PropTypes.number
  }).isRequired,
  deleteItem: PropTypes.func.isRequired,
  toggleDescription: PropTypes.func.isRequired,
  handleCheckBox: PropTypes.func.isRequired
};