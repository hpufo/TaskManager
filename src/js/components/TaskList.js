import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getTasks} from '../actions/taskActions';
import {DumbTaskList} from './DumbTaskList';

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
  componentDidMount(){
    this.props.loadTasks();
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
    return <DumbTaskList 
              filters={this.state}
              data={this.props.tasks}
              dueTodayToggle={this.dueTodayToggle}
              dueLaterToggle={this.dueLaterToggle}
              pastDueToggle={this.pastDueToggle}
              completedToggle={this.completedToggle}
              clearFilters={this.clearFilters}
            />
  }
}
function mapDispatchToProps(dispatch){
  return{
    loadTasks: () => {dispatch(getTasks())}
  }
}
function mapStateToProps(state){
  return {
    tasks: state.tasks.data
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskList);
