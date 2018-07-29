import React from 'react';
import TaskForm from '../TaskForm/TaskForm';
import TaskList from '../TaskList/TaskList';
import PropTypes from 'prop-types';
import styles from './App.scss';

export const DumbApp = (props) => {
  return (
    <div className={styles.App}>
      <p className={styles.message} onClick={props.clearMessage}>{props.message ? props.message : ''}</p>
      <TaskForm />
      <TaskList />
    </div>
  );
}

DumbApp.propTypes = {
  message: PropTypes.string,
  clearMessage: PropTypes.func
};
