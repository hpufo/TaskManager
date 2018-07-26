import React from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import styles from '../../scss/App.scss';

export const App = (props) => {
  return (
    <div className={styles.App}>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
