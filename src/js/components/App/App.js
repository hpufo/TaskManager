import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setMessage } from '../../actions/taskActions';
import DumbApp from './DumbApp';


/**
* @description This class connections the DumbApp component to redux, and handles the message state.
*/
const App = props => <DumbApp message={props.message} clearMessage={props.clearMessage} />;
/**
 * @description maps dispatch functions to props
 * @param {*} dispatch - sends actions
 */
function mapDispatchToProps(dispatch) {
  return {
    clearMessage: () => { dispatch(setMessage('')); },
  };
}
/**
 * @description maps redux's state to this component's props
 * @param {object} state
 */
function mapStateToProps(state) {
  return {
    message: state.tasks.message,
  };
}
App.propTypes = {
  message: PropTypes.string.isRequired,
  clearMessage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
