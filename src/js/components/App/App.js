import React, { Component } from 'react';
import { connect } from 'react-redux';
import {setMessage} from '../../actions/taskActions';
import {DumbApp} from './DumbApp';

/** 
* @description This class connections the DumbApp component to redux, and handles the message state.
*/
class App extends Component {
  render() {
    return <DumbApp message={this.props.message} clearMessage={this.props.clearMessage}/>
  }
}
/**
 * @description maps dispatch functions to props
 * @param {*} dispatch - sends actions
 */
function mapDispatchToProps(dispatch){
  return{
    clearMessage: () => {dispatch(setMessage(''))}
  }
}
/**
 * @description maps redux's state to this component's props
 * @param {object} state 
 */
function mapStateToProps(state){
  return {
    message: state.tasks.message,
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
