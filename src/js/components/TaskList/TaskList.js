import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getTasks} from '../../actions/taskActions';
import DumbTaskList from './DumbTaskList';

//Itial state of the filters
let initialFilterState = {
  filterCompleted: false,
  filterPastDue: false,
  filterDueToday: false,
  filterDueLater: false,
};
/**
 * @description This is a smart component that handles the state and connects the dumb component to redux
 */
class TaskList extends Component {
  /**
   * @description contructor that sets the initial state
   * @param {object} props 
   */
  constructor (props) {
    super(props);
    this.state = initialFilterState;
  }
  /**
   * @description when the component loads dispatch an action to get the tasks from the api
   */
  componentDidMount(){
    this.props.loadTasks();
  }
  /**
   * @description toggles the complete state
   */
  completedToggle = () => {
    this.setState(Object.assign({},initialFilterState,{filterCompleted: !this.state.filterCompleted}));
  }
  /**
   * @description toggles the past due state
   */
  pastDueToggle = () => {
    this.setState(Object.assign({},initialFilterState,{filterPastDue: !this.state.filterPastDue}));
  }
  /**
   * @description toggles the due today state
   */
  dueTodayToggle = () => {
    this.setState(Object.assign({},initialFilterState,{
      filterDueToday: !this.state.filterDueToday,
      filterDueLater: this.state.filterDueLater
    }));
  }
  /**
   * @description toggles the due later state
   */
  dueLaterToggle = () => {
    this.setState(Object.assign({},initialFilterState,{
      filterDueToday: this.state.filterDueToday,
      filterDueLater: !this.state.filterDueLater
    }));
  }
  /**
   * @description resets the state to the inital state
   */
  clearFilters = () => {
    this.setState(initialFilterState);
  }
  /**
   * @description passes props to the dumb component
   */
  render() {
    return <DumbTaskList 
              filters={this.state}
              data={this.props.tasks}
              loading={this.props.loading}
              dueTodayToggle={this.dueTodayToggle}
              dueLaterToggle={this.dueLaterToggle}
              pastDueToggle={this.pastDueToggle}
              completedToggle={this.completedToggle}
              clearFilters={this.clearFilters}
            />
  }
}
/**
* @description sends an action to delete a task
*/
function mapDispatchToProps(dispatch){
  return{
    loadTasks: () => {dispatch(getTasks())}
  }
}
/**
* @description passes props to the dumb component
*/
function mapStateToProps(state){
  return {
    tasks: state.tasks.data,
    loading: state.tasks.loading
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskList);
