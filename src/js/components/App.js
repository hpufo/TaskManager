import React, { Component } from 'react';
import axios from 'axios';
import {url} from '../config';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import styles from '../../scss/App.scss';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {data: []};
  }
  componentDidMount(){
    this.fetchData()
      .then(data => {
        this.setState({data: data});
      })
      .catch(); //Handle error
  }
  fetchData(){
    return axios.get(url)
      .then(res => res.data)
      .catch(); //throw maybe?
  }
  render() {
    return (
      <div className={styles.App}>
        <TaskForm />
        <TaskList data={this.state.data}/>
      </div>
    );
  }
}

export default App;
