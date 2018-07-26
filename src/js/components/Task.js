import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import {url} from '../config';
import styles from '../../scss/Task.scss';

class Task extends Component{
  constructor(props){
    super(props);
    this.state ={
      showDescription: false,
    };
  }
  toggleDescription = () => {
    this.setState({
      showDescription: !this.state.showDescription
    });
  }
  deleteTask = () => {
    console.log(this.props.task._id);
    axios.delete(url+'/'+this.props.task._id)
      .then((response) => console.log('deleted'))       //Todo
      .catch((e) => console.log('problem deleting'));   //Todo
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
          <div className={styles.checkbox}><input type='checkbox' checked={completed}/></div>
          <div className={styles.clickable} onClick={this.toggleDescription}>
            <label className={styles.name}>{name}</label>
            <label className={styles.due}>{moment(due).format('MM/DD/YYYY')}</label>
          </div>
          <div className={styles.remove} onClick={this.deleteTask}>X</div>
        </div>
        {this.state.showDescription ? <p className={styles.description}>{description}</p>:<p/>}
      </div>
    );
  }
}

export default Task;
