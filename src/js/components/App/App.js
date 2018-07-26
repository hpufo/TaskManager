import React from 'react';
import TaskForm from '../TaskForm/TaskForm';
import TaskList from '../TaskList/TaskList';
import styles from './App.scss';

export const App = (props) => {
  return (
    <div className={styles.App}>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
