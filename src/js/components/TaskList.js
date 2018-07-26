import React, { Component } from 'react';
import moment from 'moment';
import Task from './Task';
import styles from '../../scss/TaskList.scss';

let initialFilterState = {
  filterCompleted: false,
  filterPastDue: false,
  filterDueToday: false,
  filterDueLater: false,
};

class TaskList extends Component {
  constructor (props) {
    super(props);
    this.state = initialFilterState;
  }
  applyFilters(tasks){
    return tasks.filter((task) => {
      //Gets the difference between the due date and today and adds it to the object for later use
      task.difference = Math.ceil(moment(task.due).diff(moment(), 'days', true));

      if(this.state.filterDueToday && this.state.filterDueLater){
        return task.difference <= 0;
      }
      else if(this.state.filterDueToday){
        return task.difference === 0;
      }
      else if(this.state.filterDueLater){
        return task.difference === 1;
      }
      else if(this.state.filterCompleted){
        return task.completed;
      }
      else if(this.state.filterPastDue){
        return task.difference < 0;
      }
      else{
        return true;
      }
    });
  }
  renderTasks(){
    let filtedData = this.applyFilters(this.props.data)
    return filtedData.map((task, index) => <Task task={task} key={index}/>);
  }
  completedToggle = () => {
    this.setState(Object.assign({},initialFilterState,{filterCompleted: !this.state.filterCompleted}));
  }
  pastDueToggle = () => {
    this.setState(Object.assign({},initialFilterState,{filterPastDue: !this.state.filterPastDue}));
  }
  dueTodayToggle = () => {
    this.setState(Object.assign({},initialFilterState,{
      filterDueToday: !this.state.filterDueToday,
      filterDueLater: this.state.filterDueLater
    }));
  }
  dueLaterToggle = () => {
    this.setState(Object.assign({},initialFilterState,{
      filterDueToday: this.state.filterDueToday,
      filterDueLater: !this.state.filterDueLater
    }));
  }
  clearFilters = () => {
    this.setState(initialFilterState);
  }
  render() {
    let {filterDueToday,filterDueLater,filterPastDue,filterCompleted} = this.state;
    return (
      <div>
        <div>
          <h2>Filter</h2>
          <button className={filterDueToday ? styles.activeFilter:styles.filter} onClick={this.dueTodayToggle}>Due Today</button>
          <button className={filterDueLater ? styles.activeFilter:styles.filter} onClick={this.dueLaterToggle}>Due Tomorrow</button>
          <button className={filterPastDue ? styles.activeFilter:styles.filter} onClick={this.pastDueToggle}>Past Due</button>
          <button className={filterCompleted ? styles.activeFilter:styles.filter} onClick={this.completedToggle}>Completed</button>
          <button className={styles.filter} onClick={this.clearFilters}>Clear Filters</button>
        </div>
        {this.renderTasks()}
      </div>
    );
  }
}

export default TaskList;
