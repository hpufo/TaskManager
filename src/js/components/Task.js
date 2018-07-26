import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {deleteTask, toggleComplete} from '../actions/taskActions';
import styles from '../../scss/Task.scss';

class Task extends Component{
  constructor(props){
    super(props);
    this.state ={
      showDescription: false,
    };
  }
  handleCheckBox = (event) => {
    //value will be either ture or false
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.props.dispatch(toggleComplete(this.props.task._id, value));
  }
  toggleDescription = () => {
    this.setState({
      showDescription: !this.state.showDescription
    });
  }
  deleteItem = () => {
    this.props.dispatch(deleteTask(this.props.task._id));
  }
  getStyle(){
    if(this.props.task.difference < 0){
      return styles.pastDue;
    }
    else if(this.props.task.difference === 0){
      return styles.dueToday;
    }
    else if(this.props.task.difference > 0){
      return styles.dueLater;
    }
    return styles.task;
  }
  render(){
    let {completed,name,description,due} = this.props.task;
    return (
      <div className={this.getStyle()}>
        <div className={styles.top}>
          <div className={styles.checkbox}><input type='checkbox' onChange={this.handleCheckBox} checked={completed}/></div>
          <div className={styles.clickable} onClick={this.toggleDescription}>
            <label className={styles.name}>{name}</label>
            <label className={styles.due}>{moment(due).format('MM/DD/YYYY')}</label>
          </div>
          <div className={styles.remove} onClick={this.deleteItem}>X</div>
        </div>
        {this.state.showDescription ? <p className={styles.description}>{description}</p>:<p/>}
      </div>
    );
  }
}
/*
function mapStateToProps(state, ownProps){
  return {
    tasks: state.tasks.data.find((task) => task._id === ownProps.task._id)
  };
}//*/
export default connect()(Task);
