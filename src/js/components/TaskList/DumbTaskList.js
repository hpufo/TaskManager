import React from 'react';
import moment from 'moment';
import Task from '../Task/Task';
import styles from './TaskList.scss';

function applyFilters(props){
  return props.data.filter((task) => {
    let {filterDueToday,filterDueLater,filterPastDue,filterCompleted} = props.filters;
    //Gets the difference between the due date and today and adds it to the object for later use
    task.difference = Math.ceil(moment(task.due).diff(moment(), 'days', true));

    if(filterDueToday && filterDueLater){
      return task.difference <= 0;
    }
    else if(filterDueToday){
      return task.difference === 0;
    }
    else if(filterDueLater){
      return task.difference === 1;
    }
    else if(filterCompleted){
      return task.completed;
    }
    else if(filterPastDue){
      return task.difference < 0;
    }
    else{
      return true;
    }
  });
}
function renderTasks(props){
  let filtedData = applyFilters(props);
  return filtedData.length >= 1 ? filtedData.map((task, index) => <Task task={task} index={index} key={index}/>):<p>No tasks</p>;  //May not neeed to pass the index
}

export const DumbTaskList = (props) => {
  let {filterDueToday,filterDueLater,filterPastDue,filterCompleted} = props.filters;
  return (
    <div>
      <div>
        <h2>Filters:</h2>
        <button className={filterDueToday ? styles.activeFilter:styles.filter} onClick={props.dueTodayToggle}>Due Today</button>
        <button className={filterDueLater ? styles.activeFilter:styles.filter} onClick={props.dueLaterToggle}>Due Tomorrow</button>
        <button className={filterPastDue ? styles.activeFilter:styles.filter} onClick={props.pastDueToggle}>Past Due</button>
        <button className={filterCompleted ? styles.activeFilter:styles.filter} onClick={props.completedToggle}>Completed</button>
        <button className={styles.filter} onClick={props.clearFilters}>Clear Filters</button>
      </div>
      <h2>Tasks:</h2>
      {renderTasks(props)}
    </div>
  );
}