import React from 'react';
import moment from 'moment';
import styles from '../../scss/Task.scss';

function getStyle(difference){
  if(difference < 0){
    return styles.pastDue;
  }
  else if(difference === 0){
    return styles.dueToday;
  }
  else if(difference > 0){
    return styles.dueLater;
  }
  return styles.task;
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