import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styles from './Task.scss';

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

export const DumbTask = (props) => {
  let {completed,name,due,description,difference} = props.task;
  return (
  <div className={getStyle(difference)}>
    <div className={styles.top}>
      <div className={styles.checkbox}><input type='checkbox' onChange={props.handleCheckBox} checked={completed}/></div>
      <div className={styles.clickable} onClick={props.toggleDescription}>
        <label className={styles.name}>{name}</label>
        <label className={styles.due}>{moment(due).format('MM/DD/YYYY')}</label>
      </div>
      <div className={styles.remove} onClick={props.deleteItem}>X</div>
    </div>
    {props.task.showDescription ? <p className={styles.description}>{description}</p>:<p/>}
  </div>
  );
}

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