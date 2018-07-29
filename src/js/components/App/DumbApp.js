import React from 'react';
import TaskForm from '../TaskForm/TaskForm';
import TaskList from '../TaskList/TaskList';
import PropTypes from 'prop-types';
import styles from './App.scss';

/** 
* @description This component displays whatever message a user should see and renders the rest of the components
* @param {object} props - Props
* @returns {JSX} - returns the entire application.
*/
export const DumbApp = (props) => {
  return (
    <div className={styles.App}>
      <p className={styles.message} onClick={props.clearMessage}>{props.message ? props.message : ''}</p>
      <TaskForm />
      <TaskList />
    </div>
  );
}
/** 
* @description Schema this component is expecting
*/
DumbApp.propTypes = {
  message: PropTypes.string,
  clearMessage: PropTypes.func
};
