import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Task from '../Task/Task';
import styles from './TaskList.scss';

function applyFilters(props){
  return props.data.filter((task) => {
    let {filterDueToday,filterDueLater,filterPastDue,filterCompleted} = props.filters;
    let today = moment();
    //Gets the difference between the due date and today and adds it to the object for later use
    task.difference = Math.ceil(moment(task.due).startOf('day').diff(today.startOf('day'), 'days', true));
    if(filterDueToday && filterDueLater){
      return task.difference === 0 || task.difference === 1;
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
  return filtedData.length >= 1 ? filtedData.map((task, index) => <Task task={task} index={index} key={index}/>):<p>{props.loading ? 'Loading...' : 'No tasks'}</p>;  //May not neeed to pass the index
}

export const DumbTaskList = (props) => {
  let {filterDueToday,filterDueLater,filterPastDue,filterCompleted} = props.filters;
  return (
    <div className={styles.taskList}>
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

DumbTaskList.propTypes = {
  filters: PropTypes.shape({
    filterDueToday: PropTypes.bool.isRequired,
    filterDueLater: PropTypes.bool.isRequired,
    filterPastDue: PropTypes.bool.isRequired,
    filterCompleted: PropTypes.bool.isRequired
  }).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    due: PropTypes.any.isRequired,
    description: PropTypes.string.isRequired
  })).isRequired,
  loading: PropTypes.bool,
  dueTodayToggle: PropTypes.func.isRequired,
  dueLaterToggle: PropTypes.func.isRequired,
  pastDueToggle: PropTypes.func.isRequired,
  completedToggle: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};