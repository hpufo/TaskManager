import React, { Component } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { connect } from 'react-redux';
import {getTasks} from '../actions/taskActions';
import styles from '../../scss/App.scss';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {data: []};
  }
  componentDidMount(){
    this.props.loadTasks();
  }
  render() {
    return (
      <div className={styles.App}>
        <TaskForm />
        <TaskList data={this.props.tasks}/>
      </div>
    );
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
export default connect(mapStateToProps,mapDispatchToProps)(App);
